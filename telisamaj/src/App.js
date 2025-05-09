import { ConfigProvider, SafeArea } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import "./App.css";
import DeepLinkHandler from "./DeepLinkHandler";
import DonationForm from "./components/admin/DonationForm";
import Search from "./components/common/Search";
import BreakingNewsCreate from "./components/featuretiles/featurepanels/BreakingNewsCreate";
import ViewDonorCard from "./components/featuretiles/featurepanels/ViewDonorCard";
import ViewDonors from "./components/featuretiles/featurepanels/ViewDonors";
import ViewNews from "./components/featuretiles/featurepanels/ViewNews";
import ViewNewsCard from "./components/featuretiles/featurepanels/ViewNewsCard";
import MainLayout from "./components/layout/MainLayout";
import StatusNotification from "./components/layout/StatusNotification";
import SocialSharingCard from "./components/socialsharing/SocialSharingCard";
import ProfileDetailPanel from "./components/users/ProfileDetailPanel";
import { SettingsDialog } from "./components/users/profilesections/settings/SettingsDialog";
import { AdProvider } from "./context/AdContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { useAd } from "./hooks/useAd";
import { locales } from "./locales";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Mail from "./pages/Mail";
import ProfileStatusPage from "./pages/ProfileStatusPage";
import AdminListPage from "./pages/admin/AdminListPage";
import NewUserRegistration from "./pages/admin/NewUserRegistration";
import Donation from "./pages/homepage/shortcuts/DonationPage";
import DynamicUPIPaymentQR from "./pages/payment/QRCodeWithLogo";
import LoginPage from "./pages/public/LoginPage";
import { TermsPage } from "./pages/public/TermsPage";
import SuperAdmin from "./pages/superadmin/SuperAdmin";
import ProfilesPage from "./pages/user/ProfilesPage";
import UserProfile from "./pages/user/UserProfile";
import AdminPanel from "./pages/admin/AdminPanel";

// ✅ Corrected Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};

function AppContent() {
  const isAuthenticated = JSON.parse(localStorage.getItem("authenticated"))
  console.log("AppContent isAuthenticated", isAuthenticated, " mytest")
  return (
    <div>
      <div style={{ background: '#BC0226' }}>
        <SafeArea position="top" />
      </div>
      <AuthProvider>
        <Router>
          <DeepLinkHandler />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Protected Route */}

            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <AdProvider>
                    <MainLayout>
                      <Home />
                    </MainLayout>
                  </AdProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
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
              path="/shareprofile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <SocialSharingCard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/qr-creation"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DynamicUPIPaymentQR />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/donation-collection"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DonationForm />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/donation"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Donation />
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
            />ViewDonors
            <Route
              path="/donors"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ViewDonors />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/donors/:donorid"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ViewDonorCard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/allnews"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ViewNews />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/allnews/:newsid"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ViewNewsCard />
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
              path="/AdminPanel"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <AdminPanel />
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
              path="/create-news"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <BreakingNewsCreate />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
        `}
        </style>
      </AuthProvider >
      <div>
        <SafeArea position="bottom" />
      </div>
    </div>
  );
}

function ExampleComponent() {
  const { triggerAd } = useAd();

  return (
    <div>
      <h1>My App</h1>
      <button
        onClick={triggerAd}
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4 }}
      >
        Show Ad
      </button>
    </div>
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
