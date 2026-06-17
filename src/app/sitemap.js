import { supabase } from '@/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap() {
  const baseUrl = 'https://www.jujuindia.com';

  // 1. Define all static paths with their priorities and frequencies
  const staticRoutes = [
    { url: '', changeFrequency: 'weekly', priority: 1.0 },
    { url: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/juju-commercials', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/juju-storytellers', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/juju-ai-films', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/juju-ecosystem', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/case-studies', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/blog', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/vertical-micro-drama-production-india', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/vertical-micro-drama-production-india/playbook', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/vertical-micro-dramas', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/showreel', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/start-project', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/contact', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
    { url: '/terms-of-use', changeFrequency: 'yearly', priority: 0.3 },
    { url: '/disclaimer', changeFrequency: 'yearly', priority: 0.3 },
  ];

  const staticMaps = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let blogMaps = [];
  let caseStudyMaps = [];

  try {
    // 2. Fetch published blogs from Supabase
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, created_at')
      .eq('published', true);

    if (posts) {
      blogMaps = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.created_at),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    }

    // 3. Fetch case studies from Supabase
    const { data: caseStudies } = await supabase
      .from('influencer_posts')
      .select('slug, id, created_at')
      .eq('published', true);

    if (caseStudies) {
      caseStudyMaps = caseStudies.map((post) => ({
        url: `${baseUrl}/case-studies/${post.slug || post.id}`,
        lastModified: new Date(post.created_at),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap routes:', error);
  }

  return [...staticMaps, ...blogMaps, ...caseStudyMaps];
}
