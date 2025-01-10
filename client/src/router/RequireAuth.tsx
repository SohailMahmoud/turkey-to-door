import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../context/context";


export default function RequireAuth() {
    const { user } = useUserContext();
    const location = useLocation();

    if (!user) {
        return <Navigate to='/sign-in' state={{from: location}} />
    }

    return <Outlet />
}
