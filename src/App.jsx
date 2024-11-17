import React from 'react';
import {
    AuthPage,
    ErrorComponent,
    Layout,
    useNotificationProvider
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { Authenticated, Refine } from "@refinedev/core";
import routerProvider, {
    CatchAllNavigate,
    DocumentTitleHandler,
    NavigateToResource,
    
    useDocumentTitle
} from "@refinedev/react-router-v6";
import { DataProvider } from "@refinedev/strapi-v4";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes
} from "react-router-dom";
import { LoginPage } from "./pages/login/Loginpage";
import { App as AntdApp, ConfigProvider } from "antd";
import axios from "axios";
import { PageViewProvider } from './contextprovider/PageProvider';

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const API_URL = import.meta.env.VITE_SERVER_URL;
import { authProvider, axiosInstance } from "./authProvider";
import Dashboard from './pages/dashboard1';
import HomePage from "./pages/home/homepage";
import ProfileView from "./pages/profileView";
import MyProfile from "./pages/myProfile";
import MatchesPage from "./pages/matches";
import NoContent from "./pages/nocontent/pending";
import { RegisterPage } from "./pages/register/register";
import PendingPage from "./pages/nocontent/pending";
import BlockedPage from "./pages/nocontent/blocked";
import RejectedPage from "./pages/nocontent/rejected";
import UnauthorizedPage from "./pages/nocontent/unauthorized";

// Custom layout component without sidebar
const CustomLayout = ({ children }) => (
    <div style={{ padding: "16px" }}>
        {children}
    </div>
);
const CustomErrorComponent = () => {
    const isAuthenticated = authProvider.check(); // You might need to adjust this based on your auth implementation
    
    return (
        <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
    );
};
export default function App() {
    return (
        <ConfigProvider>
            <BrowserRouter>
                <AntdApp>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
                        authProvider={authProvider}
                        notificationProvider={useNotificationProvider}
                        options={{
                            warnWhenUnsavedChanges: true,
                            syncWithLocation: true,
                            liveMode: "auto",
                            disableTelemetry:true
                        }}
                        resources={[
                            {
                                name: "dashboard",
                                list: "/dashboard",
                                meta: {
                                    icon: <img src="/home.svg" width={"24px"} alt="dashboard-icon" />,
                                    label: "Dashboard",
                                    canonical:true
                                },
                            },
                        ]}
                    >
                        <PageViewProvider>
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />

                                {/* Authenticated Routes */}
                                <Route
                                    element={
                                        <Authenticated
                                            fallback={<CatchAllNavigate to="/login" />}
                                        >                           
                                            <CustomLayout>
                                                <Outlet />
                                            </CustomLayout>
                                        </Authenticated>
                                    }
                                >
                                     <Route path="/" element={<Navigate to="/dashboard" replace />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/home" element={<HomePage />} />
                                    <Route path="/matches" element={<MatchesPage />} />
                                    <Route path="/profile/:id" element={<ProfileView />} />
                                    <Route path="/myprofile/:id" element={<MyProfile />} />
                                    <Route path="/pending" element={<PendingPage />} />
                                    <Route path="/blocked" element={<BlockedPage />} />
                                    <Route path="/rejected" element={<RejectedPage />} />
                                    <Route path="/unauthorized" element={<UnauthorizedPage />} />
                                </Route>

                                {/* Fallback for Undefined Routes */}
                                <Route path="*" element={<CustomErrorComponent />} />
                            </Routes>
                        </PageViewProvider>
                    </Refine>
                </AntdApp>
            </BrowserRouter>
        </ConfigProvider>
    );
}