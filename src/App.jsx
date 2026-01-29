import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import JujuCommercial from './pages/JujuCommercial';
import Homepage2 from './pages/Homepage2';
import JujuStorytellers from './pages/JujuStorytellers';
import JujuAIFilms from './pages/JujuAIFilms';
import About from './pages/About';
import CollectivePage from './pages/CollectivePage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import InfluencePage from './pages/InfluencePage';

// Import Styles
import './styles/home-style.css';
import './styles/home-style-2.css';
import './styles/style.css';
import './styles/style2.css';
import './styles/theme.css';

import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/admin/Login';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlog from './pages/admin/AdminBlog';
import AdminInfluence from './pages/admin/AdminInfluence';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes with Main Layout */}
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/" element={<Homepage2 />} />
            <Route path="/homepage-2" element={<Homepage2 />} />
            <Route path="/juju-storytellers" element={<JujuStorytellers />} />
            <Route path="/juju-ai-films" element={<JujuAIFilms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/juju-commercials" element={<JujuCommercial />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<CollectivePage />} />
            <Route path="/influence" element={<InfluencePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="influence" element={<AdminInfluence />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
