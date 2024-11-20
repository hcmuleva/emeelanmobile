    import React from "react";
    import {
        BrowserRouter,
        Navigate,
        Outlet,
        Route,
        Routes,
    } from "react-router-dom";
    import { Authenticated, Refine } from "@refinedev/core";
    import { ConfigProvider } from "antd";
    import CustomLayout from "./components/CustomLayout";
    import CustomErrorComponent from "./components/CustomErrorComponent";
    import ProtectedRoute from "./components/ProtectedRoute";
    import { axiosInstance } from "./config/axiosInstance";
    import { resourcesConfig } from "./config/resources";
    import { PageViewProvider } from "./contextprovider/PageProvider";
    import LoginPage from "./pages/login/LoginPage";
    import Dashboard from "./pages/dashboard1";
    import { authProvider } from "./config/authProvider";
    import { RegisterPage } from "./pages/register/register";
    import { DataProvider } from "@refinedev/strapi-v4";
    import MyProfile from "./pages/myProfile";
    import MatchesPage from "./pages/matches";
    import ProfileView from "./pages/profileView";
    import PendingPage from "./pages/nocontent/pending"
    //import Dashboard from "./pages/dashboard1/Dashboard";

    export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
    const API_URL = import.meta.env.VITE_SERVER_URL;

    export default function App() {
        //localStorage.clear() //clears everything in localStorage

        return (
            <ConfigProvider>
                <BrowserRouter>
                    <Refine
                        dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
                        authProvider={authProvider}
                        routerProvider={{
                            routes: {
                                login: "/login",
                            },
                        }}
                        

                        resources={resourcesConfig}
                    >
                        <PageViewProvider>
                            <Routes>
                            <Route path="/register" element={<RegisterPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route
                                    element={
                                        <ProtectedRoute>
                                            <CustomLayout>
                                                <Outlet />
                                            </CustomLayout>
                                        </ProtectedRoute>
                                    }
                                >
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/myprofile/:id" element={<MyProfile />} />
                                    <Route path="/matches" element={<MatchesPage />} />
                                    <Route path="/profile/:id" element={<ProfileView />} />
                                    <Route path="/pending" element={<PendingPage />} />
                                </Route>
                                <Route path="*" element={<CustomErrorComponent />} />
                            </Routes>
                        </PageViewProvider>
                    </Refine>
                </BrowserRouter>
            </ConfigProvider>
        );
    }
