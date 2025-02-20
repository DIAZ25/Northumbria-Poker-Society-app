import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "../../context/Auth/useAuth";


/**
 * Persist login function.
 * 
 * Verifies the refresh token using
 * the auth context and verifyRefreshToken
 * function then sets whether the user 
 * should be logged in or not.
 * 
 * @author Scott Mains
 * 
 */

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();
 
    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } 
            catch (err) {
                console.log(err);
            } 
            finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, [])

    useEffect(() => {
        
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
       
        
    }, [isLoading])

    return (
        <>
       
         
            {isLoading
            ?<p>Loading...</p>
            : <Outlet />
            }
        
        </>
    )
}

export default PersistLogin