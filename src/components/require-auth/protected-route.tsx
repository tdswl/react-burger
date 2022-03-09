import React from "react";
import {Outlet, useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {LOGIN_ROUTE} from "../../utils/routes";
import {IRootState} from "../../utils/types";

const ProtectedRoute = () => {
    const {user, getUserRequest} = useSelector((store: IRootState) => store.auth);
    let location = useLocation();

    if (!user && !getUserRequest) {
        return <Navigate to={LOGIN_ROUTE} state={{ from: location }} />;
    }

    return <Outlet />;
}

export default ProtectedRoute;