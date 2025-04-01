import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from "./pages/Admin";
import SuperAdmin from "./pages/SuperAdmin";
import Donor from "./pages/Donor";
import Matches from "./pages/Matches";
import Mail from "./pages/Mail";
import Chat from "./pages/Chat";
import Search from "./pages/Search";
import MainLayout from "./components/MainLayout";
import { LoginPage, RegisterPage } from './pages/LoginRegisterPage';

// ✅ Corrected Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get user authentication state
  return user ? children : <Navigate to="/" replace />;
};

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <ConfigProvider locale={enUS}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                showRegister ? (
                  <RegisterPage onLogin={() => setShowRegister(false)} />
                ) : (
                  <LoginPage onRegister={() => setShowRegister(true)} />
                )
              }
            />

            {/* Protected Routes - Each wrapped inside <ProtectedRoute> */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <MainLayout><Home /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/matches"
              element={
                <ProtectedRoute>
                  <MainLayout><Matches /></MainLayout>
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

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
