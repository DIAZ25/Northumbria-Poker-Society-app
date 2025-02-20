import { createContext, useState } from "react";

const AuthContext = createContext({});

/**
 * Sets the auth context of the application
 * 
 * This context is wrapped round every component
 * in the application.
 * 
 * The auth details are set in login and refresh
 * token functions.
 * 
 * @author Scott Mains
 * 
 */

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
  //  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    const [userDetails, setUserDetails] = useState('');
    
    return (
        <AuthContext.Provider value={{ auth, setAuth, userDetails, setUserDetails }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
