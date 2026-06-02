import React from 'react';
import AdminDashboard from '@/views/admin/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard | JUJU Films',
  robots: 'noindex, nofollow',
};

export default function AdminDashboardRoute() {
  return <AdminDashboard />;
}
