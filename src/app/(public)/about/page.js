import React from 'react';
import About from '@/views/About';

export const metadata = {
  title: 'About Us | JUJU Films',
  description: 'JUJU Films is a creator collective building original stories under one JUJU philosophy. Learn about our vision, leadership, and team.',
  alternates: {
    canonical: 'https://www.jujuindia.com/about',
  },
};

export default function AboutRoute() {
  return <About />;
}
