import React from 'react';
import BlogPost from '@/views/BlogPost';
import { supabase } from '@/supabaseClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const { data: blog } = await supabase
      .from('blog_posts')
      .select('title, meta_title, meta_desc, image_url')
      .eq('slug', slug)
      .single();

    if (!blog) {
      return {
        title: 'Article Not Found | JUJU Films',
        description: 'The requested blog post could not be found.',
      };
    }

    const domain = 'https://www.jujuindia.com';
    const title = blog.meta_title || blog.title;
    const description = blog.meta_desc || 'JUJU Films original stories thinkspace.';
    const imageUrl = blog.image_url || `${domain}/juju-white-logo.webp`;

    return {
      title: `${title} | JUJU Films`,
      description,
      alternates: {
        canonical: `${domain}/blog/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `${domain}/blog/${slug}`,
        type: 'article',
        images: [
          {
            url: imageUrl,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  } catch (error) {
    console.error('Error generating blog metadata:', error);
    return {
      title: 'JUJU Films Blog',
    };
  }
}

export default function BlogPostPage() {
  return <BlogPost />;
}
