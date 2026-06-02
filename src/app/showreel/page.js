import React from 'react';
import Showreel from '@/views/Showreel';

export const metadata = {
  title: 'Showreel | JUJU Films',
  description: 'Watch the official high craft showreel of JUJU Films.',
  alternates: {
    canonical: 'https://www.jujuindia.com/showreel',
  },
};

export default function ShowreelRoute() {
  return <Showreel />;
}
