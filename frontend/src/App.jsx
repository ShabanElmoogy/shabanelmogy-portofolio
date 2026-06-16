/* eslint-disable react/prop-types */
import { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "@/pages/Home";
import { Box, CircularProgress } from "@mui/material";

// Lazy-loaded routes
const AdminPanel = lazy(() => import("@/features/admin/components/AdminPanel"));
const AdminPage = lazy(() => import("@/features/admin/components/AdminPage"));
const AdminLoginDialog = lazy(() => import("@/features/admin/components/AdminLoginDialog"));
const ProtectedAdminRoute = lazy(() => import("@/features/admin/components/ProtectedAdminRoute"));
const ProjectDetail = lazy(() => import("@/features/projects/components/ProjectDetails/ProjectDetail"));
const BlogList = lazy(() => import("@/features/blog/components/public/BlogList"));
const BlogDetail = lazy(() => import("@/features/blog/components/public/BlogDetail"));

const FullPageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <CircularProgress />
  </Box>
);

const AdminLoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("adminAuthenticated") === "true";
    const loginTime = localStorage.getItem("adminLoginTime");
    const isSessionValid =
      loginTime && Date.now() - parseInt(loginTime) < 24 * 60 * 60 * 1000;

    if (isAuthenticated && isSessionValid) {
      navigate("/admin/panel", { replace: true });
    }
  }, [navigate]);

  return (
    <Suspense fallback={<FullPageLoader />}>
      <AdminLoginDialog
        open={true}
        onClose={() => navigate("/", { replace: true })}
      />
    </Suspense>
  );
};

const AppContent = () => {
  return (
      <Router>
        <Suspense fallback={<FullPageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/projects"
              element={
                <ProtectedAdminRoute>
                  <AdminPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/panel"
              element={
                <ProtectedAdminRoute>
                  <AdminPanel />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
  );
};

function App() {
  return <AppContent />;
}

export default App;
