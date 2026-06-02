"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import '../styles/admin.css';

const AdminLayout = ({ children }) => {
    const { logout, role } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/admin/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Prevent search engine indexing for admin pages
    React.useEffect(() => {
        let meta = document.querySelector('meta[name="robots"]');
        const previousContent = meta ? meta.getAttribute('content') : null;

        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'robots';
            document.head.appendChild(meta);
        }

        meta.setAttribute('content', 'noindex, nofollow');

        return () => {
            if (previousContent) {
                meta.setAttribute('content', previousContent);
            } else {
                if (meta && meta.parentNode) {
                    meta.parentNode.removeChild(meta);
                }
            }
        };
    }, []);

    const isActive = (path) => pathname === path;

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
                                href="/admin/dashboard"
                                className={`admin-nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
                            >
                                Dashboard (Leads)
                            </Link>
                        </li>
                        {role !== 'bda' && (
                            <>
                                <li className="admin-nav-item">
                                    <Link
                                        href="/admin/categories"
                                        className={`admin-nav-link ${isActive('/admin/categories') ? 'active' : ''}`}
                                    >
                                        Categories
                                    </Link>
                                </li>
                                <li className="admin-nav-item">
                                    <Link
                                        href="/admin/blog"
                                        className={`admin-nav-link ${isActive('/admin/blog') ? 'active' : ''}`}
                                    >
                                        Blog Posts
                                    </Link>
                                </li>
                                <li className="admin-nav-item">
                                    <Link
                                        href="/admin/influence"
                                        className={`admin-nav-link ${isActive('/admin/influence') ? 'active' : ''}`}
                                    >
                                        Case Studies
                                    </Link>
                                </li>
                            </>
                        )}
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
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
