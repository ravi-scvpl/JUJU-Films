import React from 'react';
import BlogPost from '@/views/BlogPost';
import { supabase } from '@/supabaseClient';
import { STATIC_BLOGS } from '@/data/staticBlogs';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    let blog = null;
    const { data } = await supabase
      .from('blog_posts')
      .select('title, meta_title, meta_desc, image_url')
      .eq('slug', slug)
      .maybeSingle();

    if (data) {
      blog = data;
    } else if (STATIC_BLOGS[slug]) {
      blog = STATIC_BLOGS[slug];
    }

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

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  
  let blog = null;
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (data) {
      blog = data;
    } else if (STATIC_BLOGS[slug]) {
      blog = STATIC_BLOGS[slug];
    }
  } catch (error) {
    console.error('Error fetching blog on server:', error);
    if (STATIC_BLOGS[slug]) {
      blog = STATIC_BLOGS[slug];
    }
  }

  // Pre-serialize any created_at/updated_at fields if they exist
  const serializedBlog = blog ? {
    ...blog,
    created_at: blog.created_at ? new Date(blog.created_at).toISOString() : null,
    updated_at: blog.updated_at ? new Date(blog.updated_at).toISOString() : null,
  } : null;

  return <BlogPost blog={serializedBlog} />;
}
