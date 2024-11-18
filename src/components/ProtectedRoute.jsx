import React from "react";
import { Navigate } from "react-router-dom";
import { Authenticated } from "@refinedev/core";

const ProtectedRoute = ({ children }) => {
    return (
        <Authenticated fallback={<Navigate to="/login" replace />}>
            {children}
        </Authenticated>
    );
};

export default ProtectedRoute;
