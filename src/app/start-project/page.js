import React, { Suspense } from 'react';
import MetaAdLanding from '@/views/MetaAdLanding';

export const metadata = {
  title: 'Start Your Project | JUJU Films',
  description: 'Tell us about your next visual project or brand TVC and let\'s build it together with JUJU Films.',
  alternates: {
    canonical: 'https://www.jujuindia.com/start-project',
  },
};

export default function StartProjectRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MetaAdLanding />
    </Suspense>
  );
}
