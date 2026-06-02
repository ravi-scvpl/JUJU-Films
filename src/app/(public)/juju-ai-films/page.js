import React from 'react';
import JujuAIFilms from '@/views/JujuAIFilms';

export const metadata = {
  title: 'AI Films & Interactive Experiences | JUJU Films',
  description: 'Exploring the future of cinema through AI. JUJU Films builds cutting-edge, high-craft generative AI cinematic productions.',
  alternates: {
    canonical: 'https://www.jujuindia.com/juju-ai-films',
  },
};

export default function AIFilmsRoute() {
  return <JujuAIFilms />;
}
