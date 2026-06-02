import React from 'react';
import CaseStudyPost from '@/views/CaseStudyPost';
import { supabase } from '@/supabaseClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    // Attempt to select from influencer_posts (where case studies reside)
    let { data: post } = await supabase
      .from('influencer_posts')
      .select('title, meta_title, meta_desc, seo_description, intro, image_url')
      .eq('slug', slug)
      .single();

    // Fallback to fetch by ID (handles UUIDs and numeric IDs)
    if (!post) {
      const { data: fallbackPost } = await supabase
        .from('influencer_posts')
        .select('title, meta_title, meta_desc, seo_description, intro, image_url')
        .eq('id', slug)
        .single();
      post = fallbackPost;
    }

    if (!post) {
      return {
        title: 'Case Study Not Found | JUJU Films',
        description: 'The requested case study could not be found.',
      };
    }

    const domain = 'https://www.jujuindia.com';
    const title = post.meta_title || post.title;
    const description = post.seo_description || post.meta_desc || post.intro || 'JUJU Films Case Study';
    const imageUrl = post.image_url || `${domain}/juju-white-logo.webp`;

    return {
      title: `${title} | JUJU Films`,
      description,
      alternates: {
        canonical: `${domain}/case-studies/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `${domain}/case-studies/${slug}`,
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
    console.error('Error generating case study metadata:', error);
    return {
      title: 'JUJU Films Case Study',
    };
  }
}

export default function CaseStudyPage() {
  return <CaseStudyPost />;
}
