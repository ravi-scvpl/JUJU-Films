import React from 'react';
import Contact from '@/views/Contact';

export const metadata = {
  title: 'Contact Us | JUJU Films',
  description: 'Reach out to JUJU Films for brand campaigns, creators connect, internships, or job opportunities. Let\'s build stories that last.',
  alternates: {
    canonical: 'https://www.jujuindia.com/contact',
  },
};

export default function ContactRoute() {
  return <Contact />;
}
