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
                        }}
                        resources={[  // Define resources directly in Refine component
                            {
                                name: "dashboard",
                                list: "/dashboard",
                                meta: {
                                  icon: <img src="/home.svg" width={"24px"} alt="dashboard-icon" />,
                                  label: "Dashboard",
                                },
                            },
                        ]}
                    >
                        <PageViewProvider>
                            <Routes>
                                <Route
                                    element={
                                        <Authenticated
                                            key={"authenticated-layout"}
                                            fallback={<CatchAllNavigate to="/login" />}
                                        >
                                            <Layout>
                                                <Outlet />
                                            </Layout>
                                        </Authenticated>
                                    }
                                >
                                    <Route
                                        index
                                        element={<NavigateToResource resource="dashboard" />}
                                    />
                                      <Route path="/dashboard1" element={<Dashboard />}></Route>
                                    <Route path="dashboard" element={<Dashboard />} />
                                </Route>

                                {/* Move LoginPage route outside Authenticated */}
                                <Route path="/login" element={<LoginPage />} />

                                <Route path="*" element={<ErrorComponent />} />
                            </Routes>
                        </PageViewProvider>
                    </Refine>
                </AntdApp>
            </BrowserRouter>
        </ConfigProvider>
    );
}
