import React from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminBlog from '@/views/admin/AdminBlog';

export const metadata = {
  title: 'Manage Blog Posts | JUJU Films',
  robots: 'noindex, nofollow',
};

export default function BlogRoute() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminBlog />
    </ProtectedRoute>
  );
}
