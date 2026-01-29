import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

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
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ minHeight: '100vh', paddingBottom: '100px', paddingTop: '150px', backgroundColor: '#000', color: '#fff' }}>

            {/* Full Width Image (1/13) */}
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', marginBottom: '60px' }}>
                <div style={{ gridColumn: '1 / 13' }}>
                    <img
                        src={blog.image_url || `https://placehold.co/1920x800/222/fff?text=${encodeURIComponent(blog.title)}`}
                        alt={blog.title}
                        style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '80vh', objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* Content Area (5/13) */}
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
                <div style={{ gridColumn: '5 / 13' }}>
                    <div style={{ fontSize: '14px', marginBottom: '20px', color: '#ccc' }}>
                        {formattedDate} • Blog
                    </div>

                    <h1 style={{ fontSize: '48px', lineHeight: '1.2', fontWeight: '400', marginBottom: '40px', fontFamily: 'serif', color: '#fff' }}>
                        {blog.title}
                    </h1>

                    {/* Meta Description / Intro */}
                    {blog.meta_desc && (
                        <p style={{ fontSize: '24px', lineHeight: '1.5', marginBottom: '60px', color: '#ddd' }}>
                            {blog.meta_desc}
                        </p>
                    )}

                    {/* Main Content (HTML) */}
                    <div
                        className="blog-content"
                        style={{ fontSize: '18px', lineHeight: '1.6', color: '#e0e0e0' }}
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
