import React from 'react';
import BlogPage from '@/views/BlogPage';

export const metadata = {
  title: 'Thinkspace | JUJU Films Blog',
  description: 'Read our latest industry insights, production diaries, and creative thoughts on film, tech, AI, and original storytelling.',
  alternates: {
    canonical: 'https://www.jujuindia.com/blog',
  },
};

export default function BlogRoute() {
  return <BlogPage />;
}
