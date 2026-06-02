import React from 'react';
import PrivacyPolicy from '@/views/PrivacyPolicy';

export const metadata = {
  title: 'Privacy Policy | JUJU Films',
  description: 'Read the privacy policy and data protection terms for JUJU Films.',
  alternates: {
    canonical: 'https://www.jujuindia.com/privacy-policy',
  },
};

export default function PrivacyPolicyRoute() {
  return <PrivacyPolicy />;
}
