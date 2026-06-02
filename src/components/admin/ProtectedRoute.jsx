"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.replace('/admin/login');
            } else if (allowedRoles && !allowedRoles.includes(role)) {
                router.replace('/admin/dashboard');
            }
        }
    }, [user, role, loading, allowedRoles, router]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000', color: '#fff' }}>
                Loading...
            </div>
        );
    }

    if (!user || (allowedRoles && !allowedRoles.includes(role))) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000', color: '#fff' }}>
                Redirecting...
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
