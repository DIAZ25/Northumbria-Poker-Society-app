import axios from "../../api/axios";
import useAuth from "../../context/Auth/useAuth";


/**
 * Calls the logout API route to remove
 * the http cookie so that the user
 * is no longer logged into the application
 * 
 * @author Scott Mains
 * 
 */

const useLogout = () => {
    const {setAuth} = useAuth();

    const logout = async () => {

    setAuth({});
        try {
            const response = await axios('api/user/logout', {
                withCredentials: true
            });
        } catch(err) {
            console.log(err);
        }
    }
    return logout;
}

export default useLogout;