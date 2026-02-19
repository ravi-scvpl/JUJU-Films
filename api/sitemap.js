import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.VITE_SUPABASE_ANON_KEY
    );

    // Fetch all published blog posts
    const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('slug, created_at')
        .eq('published', true);

    if (error) {
        console.error('Supabase error:', error);
        return res.status(500).send('Error generating sitemap');
    }

    const baseUrl = 'https://www.jujuindia.com'; // Replace with your actual domain

    // Static routes
    const staticPages = [
        '',
        '/about',
        '/portfolio',
        '/juju-commercials',
        '/juju-storytellers',
        '/juju-ai-films',
        '/blog',
        '/contact'
    ];

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
            .map((route) => {
                return `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
            })
            .join('')}
  ${posts
            .map((post) => {
                return `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.created_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
            })
            .join('')}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
}
