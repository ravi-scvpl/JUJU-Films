import React from 'react';
import Disclaimer from '@/views/Disclaimer';

export const metadata = {
  title: 'Disclaimer | JUJU Films',
  description: 'Read the official disclaimer for JUJU Films.',
  alternates: {
    canonical: 'https://www.jujuindia.com/disclaimer',
  },
};

export default function DisclaimerRoute() {
  return <Disclaimer />;
}
