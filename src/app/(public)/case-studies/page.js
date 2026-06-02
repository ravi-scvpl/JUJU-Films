import React from 'react';
import CaseStudiesPage from '@/views/CaseStudiesPage';

export const metadata = {
  title: 'Case Studies & Brand Impact | JUJU Films',
  description: 'Explore our portfolio of successful brand collaborations, creative campaigns, and video production case studies.',
  alternates: {
    canonical: 'https://www.jujuindia.com/case-studies',
  },
};

export default function CaseStudiesRoute() {
  return <CaseStudiesPage />;
}
