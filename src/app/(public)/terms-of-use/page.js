import React from 'react';
import TermsOfUse from '@/views/TermsOfUse';

export const metadata = {
  title: 'Terms of Use | JUJU Films',
  description: 'Read the terms of use for JUJU Films website.',
  alternates: {
    canonical: 'https://www.jujuindia.com/terms-of-use',
  },
};

export default function TermsOfUseRoute() {
  return <TermsOfUse />;
}
