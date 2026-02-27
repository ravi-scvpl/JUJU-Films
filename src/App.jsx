import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Import Styles
import './styles/home-style.css';
import './styles/home-style-2.css';
import './styles/style.css';
import './styles/style2.css';
import './styles/theme.css';
import './styles/detailed-pages.css';

// Lazy Load Pages
const Homepage2 = lazy(() => import('./pages/Homepage2'));
const About = lazy(() => import('./pages/About'));
const CollectivePage = lazy(() => import('./pages/CollectivePage'));
const JujuStorytellers = lazy(() => import('./pages/JujuStorytellers'));
const JujuCommercial = lazy(() => import('./pages/JujuCommercial'));
const JujuAIFilms = lazy(() => import('./pages/JujuAIFilms'));
const JujuEcosystem = lazy(() => import('./pages/JujuEcosystem'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyPost = lazy(() => import('./pages/CaseStudyPost'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));


const MetaAdLanding = lazy(() => import('./pages/MetaAdLanding'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin Pages (Lazy Loaded)
const Login = lazy(() => import('./pages/admin/Login'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'));
const AdminInfluence = lazy(() => import('./pages/admin/AdminInfluence'));

// Loading Fallback Component
const PageLoader = () => (
  <div style={{
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    zIndex: 9999
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes with Main Layout */}
            <Route element={<Layout><Outlet /></Layout>}>
              <Route path="/" element={<Homepage2 />} />
              <Route path="/homepage-2" element={<Homepage2 />} />
              <Route path="/juju-storytellers" element={<JujuStorytellers />} />
              <Route path="/juju-ai-films" element={<JujuAIFilms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/juju-commercials" element={<JujuCommercial />} />
              <Route path="/juju-ecosystem" element={<JujuEcosystem />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/team" element={<CollectivePage />} /> */}
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/case-studies/:slug" element={<CaseStudyPost />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/disclaimer" element={<Disclaimer />} />

            </Route>



            {/* Standalone Landing Page (No Header/Footer) */}
            <Route path="/start-project" element={<MetaAdLanding />} />

            <Route path="*" element={<NotFound />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="categories" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminCategories />
                </ProtectedRoute>
              } />
              <Route path="blog" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminBlog />
                </ProtectedRoute>
              } />
              <Route path="influence" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminInfluence />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter >
  );
}

export default App;
