import React from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminInfluence from '@/views/admin/AdminInfluence';

export const metadata = {
  title: 'Manage Case Studies | JUJU Films',
  robots: 'noindex, nofollow',
};

export default function InfluenceRoute() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminInfluence />
    </ProtectedRoute>
  );
}
