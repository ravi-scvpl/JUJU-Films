
import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5', color: '#333' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: '#111', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>JUJU Admin</h2>
                </div>

                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <li>
                            <Link
                                to="/admin/dashboard"
                                style={{
                                    textDecoration: 'none',
                                    color: isActive('/admin/dashboard') ? '#E52323' : '#fff',
                                    fontWeight: isActive('/admin/dashboard') ? 'bold' : 'normal',
                                    display: 'block',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    backgroundColor: isActive('/admin/dashboard') ? 'rgba(255,255,255,0.1)' : 'transparent'
                                }}
                            >
                                Dashboard (Leads)
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/blog"
                                style={{
                                    textDecoration: 'none',
                                    color: isActive('/admin/blog') ? '#E52323' : '#fff',
                                    fontWeight: isActive('/admin/blog') ? 'bold' : 'normal',
                                    display: 'block',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    backgroundColor: isActive('/admin/blog') ? 'rgba(255,255,255,0.1)' : 'transparent'
                                }}
                            >
                                Blog Posts
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/influence"
                                style={{
                                    textDecoration: 'none',
                                    color: isActive('/admin/influence') ? '#E52323' : '#fff',
                                    fontWeight: isActive('/admin/influence') ? 'bold' : 'normal',
                                    display: 'block',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    backgroundColor: isActive('/admin/influence') ? 'rgba(255,255,255,0.1)' : 'transparent'
                                }}
                            >
                                Influence Posts
                            </Link>
                        </li>
                    </ul>
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: 'auto',
                        padding: '10px',
                        backgroundColor: '#E52323',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
