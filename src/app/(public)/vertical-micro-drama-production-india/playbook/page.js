import React from 'react';
import VMDPlaybook from '@/views/VMDPlaybook';

export const metadata = {
  title: 'Vertical Micro Drama (VMD) Playbook & Guide | JUJU',
  description: 'The complete Vertical Micro Drama playbook. Learn the storytelling principles, audience psychology, production workflows, and retention metrics driving the mobile-first video format.',
  alternates: {
    canonical: 'https://www.jujuindia.com/vertical-micro-drama-production-india/playbook',
  },
};

export default function VMDPlaybookRoute() {
  return <VMDPlaybook />;
}
