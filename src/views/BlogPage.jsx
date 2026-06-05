"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '../supabaseClient';
import '../styles/homepage2.css';
import '../styles/juju-overrides.css';
import SEO from '../components/SEO';
import { STATIC_BLOGS } from '../data/staticBlogs';

const BlogPage = () => {
    // Stories Typing Animation State
    const [storiesTypedText, setStoriesTypedText] = useState("");
    const storiesTitleRef = useRef(null);
    const storiesTargetText = "Stories";

    // Blogs Data State
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        // Fetch Categories
        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .eq('type', 'blog')
                .order('name', { ascending: true });
            if (!error && data) setCategories(data);
        };

        // Fetch Blogs
        const fetchBlogs = async () => {
            try {
                let query = supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false });

                if (activeCategory !== 'All') {
                    query = query.eq('category', activeCategory);
                }

                const { data, error } = await query;

                if (error) {
                    throw error;
                }

                let mappedBlogs = [];
                if (data) {
                    mappedBlogs = data.map(post => ({
                        id: post.id,
                        slug: post.slug,
                        title: post.title,
                        intro: post.meta_desc || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
                        date: new Date(post.created_at).toLocaleDateString('en-GB'),
                        category: post.category || 'Thought Leadership',
                        image: post.image_url,
                        altText: post.alt_text
                    }));
                }

                // Inject static blogs if they are not already returned by DB
                const combinedBlogs = [...mappedBlogs];
                Object.values(STATIC_BLOGS).forEach(staticBlog => {
                    const exists = mappedBlogs.some(b => b.slug === staticBlog.slug);
                    if (!exists && (activeCategory === 'All' || activeCategory === staticBlog.category)) {
                        combinedBlogs.unshift({
                            id: staticBlog.id,
                            slug: staticBlog.slug,
                            title: staticBlog.title,
                            intro: staticBlog.intro,
                            date: staticBlog.date,
                            category: staticBlog.category,
                            image: staticBlog.image_url,
                            altText: staticBlog.altText || staticBlog.title
                        });
                    }
                });

                setBlogs(combinedBlogs);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                // Fallback to static blogs in case of error
                const staticOnly = Object.values(STATIC_BLOGS)
                    .filter(staticBlog => activeCategory === 'All' || activeCategory === staticBlog.category)
                    .map(staticBlog => ({
                        id: staticBlog.id,
                        slug: staticBlog.slug,
                        title: staticBlog.title,
                        intro: staticBlog.intro,
                        date: staticBlog.date,
                        category: staticBlog.category,
                        image: staticBlog.image_url,
                        altText: staticBlog.altText || staticBlog.title
                    }));
                setBlogs(staticOnly);
            }
        };

        fetchCategories();
        fetchBlogs();

        document.body.classList.add('switch');

        // Typing Effect for "Stories"
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        setStoriesTypedText(storiesTargetText.substring(0, i + 1));
                        i++;
                        if (i === storiesTargetText.length) {
                            clearInterval(typeInterval);
                        }
                    }, 150); // Typing speed
                    observer.disconnect(); // Play once
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% visible

        if (storiesTitleRef.current) {
            observer.observe(storiesTitleRef.current);
        }

        return () => {
            document.body.classList.remove('switch');
            observer.disconnect();
        };
    }, [activeCategory]);

    const featuredBlog = blogs[0];
    const remainingBlogs = blogs.slice(1);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch juju-page-container">
            <SEO
                title="Stories & Insights"
                description="Insights on brand funded content, AI filmmaking, and modern storytelling."
                canonical="/blog"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Blog",
                    "name": "JUJU Films Stories",
                    "description": "Insights on brand funded content, AI filmmaking, and modern storytelling.",
                    "url": "https://www.jujuindia.com/blog",
                    "publisher": {
                        "@type": "Organization",
                        "name": "JUJU Films",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://www.jujuindia.com/juju-white-logo.webp"
                        }
                    }
                }}
            />

            {/* HEREO SECTION - Matches Homepage2 Stories Section */}
            <section className="h2-magazine juju-hero-section">
                <div className="h2-magazine-header">
                    <h1 className="h2-magazine-title" ref={storiesTitleRef}>
                        {storiesTypedText}
                        <span className="h2-cursor-blink"></span>
                    </h1>
                    <div className="h2-magazine-meta">
                        <span className="h2-mag-clock"></span>
                        <span className="h2-mag-count">JUJU Films</span>
                    </div>
                </div>

                <ul className="h2-magazine-nav">
                    <li>
                        <button
                            className={`h2-magazine-nav-link ${activeCategory === 'All' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('All')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}
                        >
                            All
                        </button>
                    </li>
                    {categories.map(cat => (
                        <li key={cat.id}>
                            <button
                                className={`h2-magazine-nav-link ${activeCategory === cat.name ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.name)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}
                            >
                                {cat.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* FEATURED BLOG SECTION */}
            {featuredBlog && (
                <section className="reveal-on-scroll juju-featured-section">

                    {/* Full Width Image */}
                    <div className="juju-featured-image-container">
                        <Link href={`/blog/${featuredBlog.slug || featuredBlog.id}`}>
                            <img
                                src={featuredBlog.image || `https://placehold.co/1200x500/222/fff?text=${encodeURIComponent(featuredBlog.title)}`}
                                alt={featuredBlog.altText || featuredBlog.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        </Link>
                    </div>

                    {/* Split Layout: Heading Left, Intro Right */}
                    <div className="juju-featured-content-grid">
                        <div>
                            <Link href={`/blog/${featuredBlog.slug || featuredBlog.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                                <h2 className="juju-featured-title">
                                    {featuredBlog.title}
                                </h2>
                            </Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <p className="juju-featured-intro">
                                {featuredBlog.intro}
                            </p>
                            <Link href={`/blog/${featuredBlog.slug || featuredBlog.id}`} className="juju-read-more">
                                Read Story →
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* MAGAZINE GRID SECTION */}
            <div className="juju-grid-section">
                <div className="h2-magazine-grid juju-grid-container">
                    {remainingBlogs.map((blog, index) => {
                        const patternIndex = index % 4;
                        let gridStyle = {};
                        let aspectRatio = '16/9';
                        let titleFontSize = '32px';
                        let titleClass = 'h2-mag-standard-title';
                        let isLarge = false;

                        // Calculate delay based on index (0, 100ms, 200ms, etc.)
                        // Reset every row or so to avoid huge delays
                        const delayClass = `delay-${(index % 3) * 100}`;

                        // Pattern: 
                        // 0: Large Left (1-8)
                        // 1: Small Right (8-13)
                        // 2: Small Left (1-5)
                        // 3: Large Right (5-13)

                        if (patternIndex === 0) {
                            gridStyle = { gridColumn: '1 / 8' };
                            aspectRatio = '16/9';
                            titleFontSize = '48px';
                            titleClass = 'h2-mag-luxury-title';
                            isLarge = true;
                        } else if (patternIndex === 1) {
                            gridStyle = { gridColumn: '8 / 13' };
                            aspectRatio = '4/3';
                        } else if (patternIndex === 2) {
                            gridStyle = { gridColumn: '1 / 5', marginTop: '80px' };
                            aspectRatio = '3/4';
                            titleFontSize = '28px';
                        } else if (patternIndex === 3) {
                            gridStyle = { gridColumn: '5 / 13', marginTop: '80px' };
                            aspectRatio = '21/9';
                            titleFontSize = '48px';
                            isLarge = true;
                        }

                        return (
                            <div key={blog.id} style={gridStyle} className={`reveal-on-scroll ${delayClass}`}>
                                <Link href={`/blog/${blog.slug || blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="h2-mag-media-placeholder" style={{ aspectRatio: aspectRatio }}>
                                        <img src={blog.image || `https://placehold.co/1200x800/222/fff?text=${encodeURIComponent(blog.title)}`}
                                            alt={blog.altText || blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>

                                    {isLarge ? (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '20px' }}>
                                            <h3 className={titleClass} style={{ fontSize: titleFontSize, width: '70%', color: '#FFFFFF' }}>{blog.title}</h3>
                                            <div style={{ textAlign: 'right' }}>
                                                <span className="h2-mag-date" style={{ color: '#ccc' }}>{blog.date || '06.01.2026'}</span>
                                                <span style={{ display: 'block', color: '#E52323', textTransform: 'uppercase', fontSize: '14px', marginTop: '10px' }}>{blog.category || 'Thought Leadership'}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="h2-mag-date" style={{ marginTop: '20px', display: 'block', color: '#ccc' }}>{blog.date || '06.01.2026'}</span>
                                            <h3 className={titleClass} style={{ fontSize: titleFontSize, marginTop: '10px', color: '#FFFFFF' }}>{blog.title}</h3>
                                        </>
                                    )}

                                    {isLarge ? (
                                        <p className="h2-mag-desc" style={{ marginTop: '20px', maxWidth: '80%', color: '#ccc' }}>{blog.intro.substring(0, 150)}...</p>
                                    ) : (
                                        <p className="h2-mag-desc" style={{ marginTop: '10px', color: '#ccc' }}>{blog.intro.substring(0, 100)}...</p>
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
