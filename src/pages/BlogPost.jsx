import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import SEO from '../components/SEO';

const BlogPost = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('slug', slug) // Match by slug
                    .single();

                if (error) throw error;
                setBlog(data);
            } catch (err) {
                console.error("Error fetching blog:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();

        // Enable theme switching
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        }
    }, [slug]);

    if (loading) return <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ minHeight: '100vh', paddingTop: '100px', textAlign: 'center', backgroundColor: '#000', color: '#fff' }}>Loading...</div>;

    if (!blog) return <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ minHeight: '100vh', paddingTop: '100px', textAlign: 'center', backgroundColor: '#000', color: '#fff' }}>Article not found.</div>;

    const formattedDate = new Date(blog.created_at).toLocaleDateString('en-GB');

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ minHeight: '100vh', paddingBottom: '100px', paddingTop: '150px', overflowX: 'hidden' }}>
            <SEO
                title={blog.meta_title || blog.title}
                description={blog.meta_desc || (blog.content ? blog.content.substring(0, 150).replace(/<[^>]*>?/gm, '') : '')}
                image={blog.image_url}
                canonical={`/blog/${slug}`}
                type="article"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": blog.title,
                    "image": blog.image_url,
                    "datePublished": blog.created_at,
                    "dateModified": blog.updated_at || blog.created_at,
                    "author": {
                        "@type": "Organization",
                        "name": "JUJU Films"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "JUJU Films",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://jujufilms.com/JUJU White logo.png"
                        }
                    },
                    "description": blog.meta_desc || (blog.content ? blog.content.substring(0, 150).replace(/<[^>]*>?/gm, '') : '')
                }}
            />

            {/* Full Width Image (1/13) */}
            <div className="grid" style={{ marginBottom: '60px' }}>
                <div pos="1-12" pos-s="row">
                    <img
                        src={blog.image_url || `https://placehold.co/1920x800/222/fff?text=${encodeURIComponent(blog.title)}`}
                        alt={blog.alt_text || blog.title}
                        style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '80vh', objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* Content Area (5/12) */}
            <div className="grid">
                <div pos="5-12" pos-s="row">
                    <div style={{ fontSize: '14px', marginBottom: '20px', opacity: 0.7 }}>
                        {formattedDate} • Blog
                    </div>

                    <h1 style={{ fontSize: '48px', lineHeight: '1.2', fontWeight: '400', marginBottom: '40px', fontFamily: 'serif', wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', maxWidth: '100%' }}>
                        {blog.title}
                    </h1>

                    {/* Meta Description / Intro */}
                    {blog.meta_desc && (
                        <p style={{ fontSize: '24px', lineHeight: '1.5', marginBottom: '60px', opacity: 0.8 }}>
                            {blog.meta_desc}
                        </p>
                    )}

                    {/* Main Content (HTML) */}
                    <div
                        className="blog-content"
                        style={{ fontSize: '18px', lineHeight: '1.6', opacity: 0.85, wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
