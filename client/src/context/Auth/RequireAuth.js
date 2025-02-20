import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";


/**
 * Used to check through the role the user has
 * to see if they have access to that specific
 * component.
 * 
 * @author Scott Mains
 * 
 */
const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;