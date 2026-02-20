
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase credentials in .env');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const baseUrl = 'https://www.jujuindia.com';

    console.log('Fetching dynamic routes...');

    // Fetch Blog Posts
    const { data: blogs, error: blogError } = await supabase
        .from('blog_posts')
        .select('slug, created_at')
        .eq('published', true);

    if (blogError) console.error('Error fetching blogs:', blogError);

    // Fetch Case Studies (from influencer_posts as seen in CaseStudyPost.jsx)
    // Note: CaseStudyPost.jsx uses 'influencer_posts' table
    const { data: caseStudies, error: caseError } = await supabase
        .from('influencer_posts')
        .select('slug, created_at') // Assuming influencer_posts has these fields
        .eq('published', true);

    if (caseError) console.error('Error fetching case studies:', caseError);

    const staticPages = [
        '',
        '/about',
        '/team',
        '/juju-storytellers',
        '/juju-commercials',
        '/juju-ai-films',
        '/case-studies',
        '/blog',
        '/contact'
    ];

    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add Static Pages
    staticPages.forEach(route => {
        sitemapContent += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // Add Blog Posts
    if (blogs) {
        blogs.forEach(post => {
            sitemapContent += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.created_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
        });
    }

    // Add Case Studies
    if (caseStudies) {
        caseStudies.forEach(post => {
            sitemapContent += `
  <url>
    <loc>${baseUrl}/case-studies/${post.slug}</loc>
    <lastmod>${new Date(post.created_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
        });
    }

    sitemapContent += `
</urlset>`;

    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
    console.log('✅ Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();
