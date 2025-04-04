import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/style.css";

// Wait for both DOM content and Cordova to be ready
const startApp = () => {
    const container = document.getElementById("root");
    const root = createRoot(container);

    // Add loading state management
    const hideLoader = () => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                loader.style.display = 'none';
                // Hide splash screen after loader is gone
                if (navigator.splashscreen) {
                    navigator.splashscreen.hide();
                }
            }, 300);
        }
    };

    // Hide splash screen if no loader is present
    const initializeSplashScreen = () => {
        const loader = document.getElementById('loader');
        if (!loader && navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    };

    root.render(
        <React.StrictMode>
            <App onLoad={() => {
                hideLoader();
                initializeSplashScreen();
            }} />
        </React.StrictMode>
    );
};

// Check if running in Cordova environment
if (window.cordova) {
    document.addEventListener('deviceready', startApp, false);
} else {
    // Web browser environment
    document.addEventListener('DOMContentLoaded', startApp);
}

// Handle potential errors
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};