const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const verify = require('../middleware/verifyToken.js');
const Joi = require('@hapi/joi');
const crypto = require("crypto");

/**
 * 
 * All routes in regards to authentication
 * of the user.
 * 
 * These will be called in the front end.
 * 
 * @author Scott Mains
 * 
 */

// ALL CODE RELATING TO REGISTER API END POINT
router.post('/register', async (req,res) => {

    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //CHECK IF STUDENT ID AND EMAIL EXISTS
    const studentIdExist = await User.findOne({studentid: req.body.studentid});
    if(studentIdExist) return res.status(418).send('This Student ID has arleady been registered.')

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(419).send('Email already exists.')

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //CREATES A NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        studentid: req.body.studentid,
        password:hashedPassword,
       
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch(err) {
        res.status(400).send(err);
    }
});



router.post('/login', async (req,res) => {

    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //CHECK IF STUDENT ID EXISTS
    const user = await User.findOne({studentid: req.body.studentid});
    if(!user) return res.status(418).send('This Student ID has not been registered')

    //CHECK IF PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(419).send('Invalid Password');
    
    if (user){
        const roles = Object.values(user.roles);
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "studentid": user.studentid,
                "name": user.name,
                "email": user.email,
                "wins": user.wins,
                "losses": user.losses,
                "roles": roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '3000s' }
    );
    const refreshToken = jwt.sign(
        { "studentid": user.studentid},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);
        

    res.cookie('jwt', refreshToken, { httpOnly: true, secure:true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //secure: true, 
    res.json({accessToken, roles, studentid: user.studentid, name: user.name, email: user.email, wins: user.wins, losses: user.losses});
    } else res.sendStatus(401);
});



router.get('/refresh', async (req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.studentid !== decoded.studentid) return res.sendStatus(403);
            const roles = Object.values(user.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "studentid": decoded.studentid,
                        "name": decoded.name,
                        "email": decoded.email,
                        "wins": decoded.wins,
                        "losses": decoded.losses,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken, studentid: user.studentid, name: user.name, email: user.email, wins: user.wins, losses: user.losses, roles: roles})
        }
    );
})


router.get('/logout', async (req,res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const user = await User.findOne({ refreshToken }).exec();
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    user.refreshToken = '';
    const result = await user.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
});

/*
router.post("/forgotpassword", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `/api/user/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("/password-reset/:userId/:token", async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});
*/ 

module.exports = router;