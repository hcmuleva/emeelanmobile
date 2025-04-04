import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from "./components/MainLayout";
import Profiles from './components/users/Profiles';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { locales } from './locales';
import Chat from "./pages/Chat";
import Home from './pages/Home';
import Mail from "./pages/Mail";
import ProfileStatusPage from './pages/ProfileStatusPage';
import Search from "./pages/Search";
import  LoginPage  from './pages/LoginPage';

// ✅ Corrected Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};

function AppContent() {
  const [showRegister, setShowRegister] = useState(false);
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              
              
                <LoginPage/>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <MainLayout><Home /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/status"
            element={
              <ProtectedRoute>
                <MainLayout><ProfileStatusPage /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mailbox"
            element={
              <ProtectedRoute>
                <MainLayout><Mail /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <MainLayout><Chat /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <MainLayout><Search /></MainLayout>
              </ProtectedRoute>
            }
          />
            <Route
            path="/profiles"
            element={
              <ProtectedRoute>
                <MainLayout><Profiles /></MainLayout>
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