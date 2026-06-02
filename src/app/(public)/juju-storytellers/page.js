import React from 'react';
import JujuStorytellers from '@/views/JujuStorytellers';

export const metadata = {
  title: 'Storytellers | JUJU Films',
  description: 'Discover the directory of original storytellers, filmmakers, and content creators at JUJU Films.',
  alternates: {
    canonical: 'https://www.jujuindia.com/juju-storytellers',
  },
};

export default function StorytellersRoute() {
  return <JujuStorytellers />;
}
