# TeamProject
Team Project

https://github.com/streetjohn/TeamProject - Our github
https://gonative.io/share/ymxedd?fbclid=IwAR3klLm8_AjAF50KirZaFYQKGxh1TheaWqX0pfoY1e2a59pF6Y231V7Kxa8 - Link to download APK for android phones

### Setup:

 "react": "^17.0.2",
 "node": "16.13.0"

Install Node on your local pc before starting to run the app code

To run the project go to client and server folders and run ```npm install```. Run the same command in the root folder, as well.

Next, in server directory run ```npm start```

Next, in client directory run ```npm start```

Then, go to ```localhost:3000``` to test the app (in website format)

### Sample account:

Student ID: ```w3000000```

Password: ```@Admin123```

#### Database for group chat:

Firebase is used on a separate account under Zaid Jaria. For running it from scratch you might want to make new firebase account - enable sign in with email/password in the authentication section - then change the api key in the register.jsx file.

#### Setting up Server and Database from scratch.

Currently the project is linked to the api hosted on heroku. If the user wanted to host it all on localhost they would need to follow these steps:

Skip to step 5 if you want to skip database set up and launch just the server.

1) Create a MongoDB account.
2) https://cloud.mongodb.com/ You should be able to see your database presumably called Cluster0. Click connect-> connect your application -> Node.js 4.0 or later and then copy the link it gives you.
3) Paste the link in the .env file next to "DB_CONNECT". You will have to replace "password" in the link to the password you have chosen.
4) You should now be able to connect locally with localhost. We now need to change the client-side code so that it connects to the localhost api rather than heroku.
5) go to client/src/api/axios.js and replace the BASE_URL with http://localhost:5000/.
6) We have provided you with admin account above but if you wanted to make your own then add Admin: 5150 to your roles on the account you created in signup process. Being an admin is necessary to see the admin only pages.

It should now run okay
