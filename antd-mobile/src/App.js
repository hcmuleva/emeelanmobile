import { ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";
import React, { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Search from "./components/common/Search";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { locales } from "./locales";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Mail from "./pages/Mail";
import ProfileStatusPage from "./pages/ProfileStatusPage";
import LoginPage from "./pages/public/LoginPage";
import ProfilesPage from "./pages/user/ProfilesPage";
import UserProfile from "./pages/user/UserProfile";
import StatusNotification from "./components/layout/StatusNotification";
import ProfileDetailPanel from "./components/users/ProfileDetailPanel";
import Admin from "./pages/admin/Admin";
import SuperAdmin from "./pages/superadmin/SuperAdmin";
import { SettingsDialog } from "./components/users/profilesections/settings/SettingsDialog";
import AdminListPage from "./pages/admin/AdminListPage";
import NewUserRegistration from "./pages/admin/NewUserRegistration";
import SocialSharingCard from "./components/socialsharing/SocialSharingCard";
import { TermsPage } from "./pages/public/TermsPage";
import Pageflip from "./components/cards/Pageflip";

// ✅ Corrected Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};

function AppContent() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/status"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProfileStatusPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mailbox"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Mail />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Chat />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminlist"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <AdminListPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Search />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profiles"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProfilesPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/userprofile"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <UserProfile />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/newuserregister"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <NewUserRegistration />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SettingsDialog />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/social-sharing"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SocialSharingCard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile-view/:profileid"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProfileDetailPanel />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification-tab"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <StatusNotification />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Admin"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Admin />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/SuperAdmin"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SuperAdmin />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/page-flip"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Pageflip />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      {({ locale }) => (
        <ConfigProvider locale={locales[locale] || enUS}>
          <AppContent />
        </ConfigProvider>
      )}
    </LanguageProvider>
  );
}
export default App;
