import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authProvider } from "../config/authProvider";

const CustomErrorComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        authProvider.check().then(setIsAuthenticated);
    }, []);

    return isAuthenticated ? (
        <Navigate to="/dashboard" replace />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default CustomErrorComponent;
