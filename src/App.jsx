import { Refine } from "@refinedev/core";
import { DataProvider } from "@refinedev/strapi-v4";
import { ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
import {
    BrowserRouter,
    Outlet,
    Route,
    Routes,
    useNavigate
} from "react-router-dom";
import CustomErrorComponent from "./components/CustomErrorComponent";
import CustomLayout from "./components/CustomLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { authProvider } from "./config/authProvider";
import { axiosInstance } from "./config/axiosInstance";
import { resourcesConfig } from "./config/resources";
import { PageViewProvider } from "./contextprovider/PageProvider";
import Controller from "./pages/Controller";
import MatchesPage from "./pages/matches";
import { RegisterPage } from "./pages/register/register";
import MyProfile from "./pages/myProfile";
import HelpPage from "./help/HelpPage";
import LoginPage from "./pages/login/Loginpage";
import PrivacyPolicy from "./Policy";

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const API_URL = import.meta.env.VITE_SERVER_URL;

export default function App({ onLoad }) {
    const [isAppReady, setIsAppReady] = useState(false);

    useEffect(() => {
        // Initialize app and handle Cordova specific setup
        const initApp = async () => {
            try {
                // Add Android back button handling
                if (window.cordova) {
                    document.addEventListener('backbutton', handleBackButton, false);
                }

                // Wait for any initial data loading or auth check
                await authProvider.checkAuth();
                setIsAppReady(true);
                
                // Hide loader and splash screen
                if (onLoad) {
                    onLoad();
                }

                // Hide Cordova splash screen
                if (navigator.splashscreen) {
                    navigator.splashscreen.hide();
                }
            } catch (error) {
                console.error('Init error:', error);
                setIsAppReady(true);
                // Still hide loader even if auth fails
                if (onLoad) {
                    onLoad();
                }
            }
        };

        initApp();

        // Cleanup
        return () => {
            if (window.cordova) {
                document.removeEventListener('backbutton', handleBackButton);
            }
        };
    }, [onLoad]);

    // Handle Android back button
    const handleBackButton = (e) => {
        e.preventDefault();
        const path = window.location.pathname;
        
        // Don't exit app on these routes
        if (['/login', '/dashboard', '/'].includes(path)) {
            if (navigator.app) {
                navigator.app.exitApp();
            }
        } else {
            if (window.history.length > 1) {
                window.history.back();
            }
        }
    };

    // Handle network status
    useEffect(() => {
        const handleOnline = () => {
            console.log('Network is available');
            // Optionally refresh data or show notification
        };

        const handleOffline = () => {
            console.log('Network is unavailable');
            // Show offline notification or handle offline state
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!isAppReady) {
        return null; // Or show a loading indicator
    }

    return (
        <ConfigProvider>
            <BrowserRouter basename="/emeelan">
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
                            <Route path="/policy" element={<PrivacyPolicy />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/help" element={<HelpPage />} />
                            <Route
                                element={
                                    <ProtectedRoute>
                                        <CustomLayout>
                                            <Outlet />
                                        </CustomLayout>
                                    </ProtectedRoute>
                                }
                            >
                                <Route path="/dashboard" element={<Controller />} />
                                <Route path="/myprofile/:id" element={<MyProfile />} />
                                <Route path="/matches" element={<MatchesPage />} />
                            </Route>
                            <Route path="*" element={<CustomErrorComponent />} />
                        </Routes>
                    </PageViewProvider>
                </Refine>
            </BrowserRouter>
        </ConfigProvider>
    );
}