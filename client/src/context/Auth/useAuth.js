import { useContext, useDebugValue } from "react";
import AuthContext from "./AuthProvider";

/**
* Uses the context set in AuthProvider

 * @author Scott Mains
 * 
 */

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;