
import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/admin.css';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Prevent search engine indexing for admin pages
    React.useEffect(() => {
        // Create or update robots meta tag
        let meta = document.querySelector('meta[name="robots"]');
        const previousContent = meta ? meta.getAttribute('content') : null;

        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'robots';
            document.head.appendChild(meta);
        }

        meta.setAttribute('content', 'noindex, nofollow');

        // Cleanup: restore previous state or remove if it didn't exist
        return () => {
            if (previousContent) {
                meta.setAttribute('content', previousContent);
            } else {
                // If it didn't exist before, maybe we should remove it? 
                // Or set it to index, follow default. removing is safer if site-wide default is index.
                if (meta && meta.parentNode) {
                    meta.parentNode.removeChild(meta);
                }
            }
        };
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    JUJU Admin
                </div>

                <nav className="admin-nav">
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li className="admin-nav-item">
                            <Link
                                to="/admin/dashboard"
                                className={`admin-nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
                            >
                                Dashboard (Leads)
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link
                                to="/admin/blog"
                                className={`admin-nav-link ${isActive('/admin/blog') ? 'active' : ''}`}
                            >
                                Blog Posts
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link
                                to="/admin/influence"
                                className={`admin-nav-link ${isActive('/admin/influence') ? 'active' : ''}`}
                            >
                                Influence Posts
                            </Link>
                        </li>
                    </ul>
                </nav>

                <button
                    onClick={handleLogout}
                    className="admin-logout-btn"
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
