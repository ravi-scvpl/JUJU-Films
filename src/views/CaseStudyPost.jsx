"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '../supabaseClient';
import '../styles/homepage2.css';
import SEO from '../components/SEO';
import VideoRequestModal from '../components/VideoRequestModal';

const CaseStudyPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('influencer_posts')
                .select('*')
                .eq('slug', slug)
                .single();

            // Fallback to fetch by ID (handles UUIDs and numeric IDs)
            if (!data) {
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
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ minHeight: '100vh', paddingTop: '150px' }}>
            <SEO
                title={post.meta_title || post.title}
                description={post.seo_description || post.meta_desc || post.intro}
                image={post.image_url}
                canonical={`/case-studies/${slug}`}
                type="article"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": post.title,
                    "image": post.image_url,
                    "datePublished": post.created_at,
                    "author": {
                        "@type": "Organization",
                        "name": "JUJU Films"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "JUJU Films",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://www.jujuindia.com/juju-white-logo.webp"
                        }
                    },
                    "description": post.seo_description || post.meta_desc || post.intro
                }}
            />
            <div className="grid">
                <div pos="3-10" pos-s="row">
                    <Link href="/case-studies" style={{ color: '#E52323', textDecoration: 'none', marginBottom: '30px', display: 'inline-block' }}>← Back to Case Studies</Link>

                    <h1 style={{ fontSize: '48px', fontFamily: 'serif', marginBottom: '20px', wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', maxWidth: '100%' }}>{post.title}</h1>

                    <div style={{ display: 'flex', gap: '20px', opacity: 0.7, marginBottom: '40px', fontSize: '14px' }}>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        <span>{post.category}</span>
                    </div>

                    <img
                        src={post.image_url}
                        alt={post.image_alt || post.title}
                        style={{ width: '100%', height: 'auto', marginBottom: '40px', borderRadius: '4px' }}
                    />

                    <div
                        className="blog-content"
                        style={{ fontSize: '18px', lineHeight: '1.8', opacity: 0.85, wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                </div>
            </div>

            {post.video_url && (
                <div style={{
                    width: '100%',
                    padding: '80px 20px',
                    backgroundColor: '#050505',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center',
                    marginTop: '40px'
                }}>
                    <h2 style={{
                        fontSize: '32px',
                        marginBottom: '15px',
                        fontFamily: 'serif',
                        color: '#fff',
                        textTransform: 'uppercase',
                        letterSpacing: '6px'
                    }}>
                        Interested in this work?
                    </h2>
                    <p style={{
                        opacity: 1,
                        marginBottom: '35px',
                        fontSize: '15px',
                        letterSpacing: '1px',
                        maxWidth: '600px',
                        margin: '0 auto 35px',
                        color: '#ffffff'
                    }}>
                        We can share the high-resolution master and additional behind-the-scenes content directly with your team.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            backgroundColor: '#E52323',
                            color: '#fff',
                            padding: '22px 60px',
                            border: 'none',
                            fontSize: '13px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)'
                        }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    >
                        Request Master Video
                    </button>
                </div>
            )}

            <VideoRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                caseStudyId={post?.id}
                caseStudyTitle={post?.title}
                videoUrl={post?.video_url}
            />
        </div>
    );
};

export default CaseStudyPost;
