import React from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminCategories from '@/views/admin/AdminCategories';

export const metadata = {
  title: 'Manage Categories | JUJU Films',
  robots: 'noindex, nofollow',
};

export default function CategoriesRoute() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminCategories />
    </ProtectedRoute>
  );
}
