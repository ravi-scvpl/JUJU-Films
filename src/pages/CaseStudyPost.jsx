import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/homepage2.css';
import SEO from '../components/SEO';

const CaseStudyPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('influencer_posts')
                .select('*')
                .eq('slug', slug)
                .single();

            // Fallback to fetch by ID
            if (!data && !isNaN(slug)) {
                const { data: dataId } = await supabase
                    .from('influencer_posts')
                    .select('*')
                    .eq('id', slug)
                    .single();
                if (dataId) { setPost(dataId); setLoading(false); return; }
            }

            if (error) console.error("Error fetching post:", error);
            else setPost(data);
            setLoading(false);
        };

        fetchPost();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return <div style={{ background: '#000', height: '100vh', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
    if (!post) return <div style={{ background: '#000', height: '100vh', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Case study not found</div>;

    return (
        <div style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingTop: '150px' }}>
            <SEO
                title={post.meta_title || post.title}
                description={post.meta_desc || post.intro}
                image={post.image_url}
                canonical={`/case-studies/${slug}`}
            />
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                <Link to="/case-studies" style={{ color: '#E52323', textDecoration: 'none', marginBottom: '30px', display: 'inline-block' }}>← Back to Case Studies</Link>

                <h1 style={{ fontSize: '48px', fontFamily: 'serif', marginBottom: '20px' }}>{post.title}</h1>

                <div style={{ display: 'flex', gap: '20px', color: '#888', marginBottom: '40px', fontSize: '14px' }}>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <span>{post.category}</span>
                </div>

                {post.image_url && (
                    <img
                        src={post.image_url}
                        alt={post.title}
                        style={{ width: '100%', height: 'auto', marginBottom: '40px', borderRadius: '4px' }}
                    />
                )}

                <div
                    className="blog-content"
                    style={{ fontSize: '18px', lineHeight: '1.8', color: '#ccc' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </div>
    );
};

export default CaseStudyPost;
