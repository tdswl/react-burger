import React from "react";
import {Outlet, useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = () => {
    const {user} = useSelector(store => store.auth);
    let location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet />;
}

export default ProtectedRoute;