import React from 'react';
import JujuCommercial from '@/views/JujuCommercial';

export const metadata = {
  title: 'Brand Commercials & Ad Film Production | JUJU Films',
  description: 'View premium, high-impact brand commercials and advertising campaigns conceptualized and produced by JUJU Films.',
  alternates: {
    canonical: 'https://www.jujuindia.com/juju-commercials',
  },
};

export default function CommercialsRoute() {
  return <JujuCommercial />;
}
