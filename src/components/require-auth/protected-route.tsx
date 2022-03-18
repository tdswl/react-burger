import React from "react";
import {Outlet, useLocation, Navigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/routes";
import {useAppSelector} from "../../services/hooks/hooks";

const ProtectedRoute = () => {
    const {user, getUserRequest} = useAppSelector(store => store.auth);
    let location = useLocation();

    if (!user && !getUserRequest) {
        return <Navigate to={LOGIN_ROUTE} state={{ from: location }} />;
    }

    return <Outlet />;
}

export default ProtectedRoute;