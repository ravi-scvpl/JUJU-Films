import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/homepage2.css';
import '../styles/juju-overrides.css';
import SEO from '../components/SEO';

const CaseStudiesPage = () => {
    // Influence Typing Animation State
    const [typedText, setTypedText] = useState("");
    const titleRef = useRef(null);
    const targetText = "Case Studies";

    // Data State
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        // Fetch Categories
        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .eq('type', 'influence')
                .order('name', { ascending: true });
            if (!error && data) setCategories(data);
        };

        // Fetch Influence Data from Supabase
        const fetchArticles = async () => {
            try {
                let query = supabase
                    .from('influencer_posts')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false });

                if (activeCategory !== 'All') {
                    query = query.eq('category', activeCategory);
                }

                const { data, error } = await query;

                if (error) throw error;

                if (data) {
                    const mappedArticles = data.map(post => ({
                        id: post.id,
                        title: post.title,
                        slug: post.slug || post.id, // Use slug if available
                        intro: post.meta_desc || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
                        date: new Date(post.created_at).getFullYear(), // Just year or full date
                        category: post.category || 'Campaigns',
                        image: post.image_url
                    }));
                    setArticles(mappedArticles);
                }
            } catch (err) {
                console.error("Error fetching influence data:", err);
            }
        };

        fetchCategories();
        fetchArticles();

        document.body.classList.add('switch');

        // Typing Effect
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        setTypedText(targetText.substring(0, i + 1));
                        i++;
                        if (i === targetText.length) {
                            clearInterval(typeInterval);
                        }
                    }, 150); // Typing speed
                    observer.disconnect(); // Play once
                }
            });
        }, { threshold: 0.5 });

        if (titleRef.current) {
            observer.observe(titleRef.current);
        }

        return () => {
            document.body.classList.remove('switch');
            observer.disconnect();
        };
    }, [activeCategory]);

    const featuredArticle = articles[0];
    const remainingArticles = articles.slice(1);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch juju-page-container">
            <SEO
                title="Case Studies"
                description="Explore our latest campaigns and influencer collaborations."
                canonical="/case-studies"
            />

            {/* HERO SECTION */}
            <section className="h2-magazine juju-hero-section">
                <div className="h2-magazine-header">
                    <h2 className="h2-magazine-title-influence" ref={titleRef}>
                        {typedText}
                        <span className="h2-cursor-blink"></span>
                    </h2>
                    <div className="h2-magazine-meta">
                        <span className="h2-mag-clock"></span>
                        <span className="h2-mag-count">JUJU Case Studies</span>
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

            {/* FEATURED SECTION */}
            {featuredArticle && (
                <section className="reveal-on-scroll juju-featured-section">
                    {/* Full Width Image */}
                    <div className="juju-featured-image-container">
                        <Link to={`/case-studies/${featuredArticle.slug}`}>
                            <img
                                src={featuredArticle.image || `https://placehold.co/1200x500/111/fff?text=${encodeURIComponent(featuredArticle.title)}`}
                                alt={featuredArticle.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        </Link>
                    </div>

                    {/* Split Layout */}
                    <div className="juju-featured-content-grid">
                        <div>
                            <Link to={`/case-studies/${featuredArticle.slug}`} style={{ textDecoration: 'none', color: '#fff' }}>
                                <h2 className="juju-featured-title">
                                    {featuredArticle.title}
                                </h2>
                            </Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <p className="juju-featured-intro">
                                {featuredArticle.intro}
                            </p>
                            <Link to={`/case-studies/${featuredArticle.slug}`} className="juju-read-more">
                                View Case Study →
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* GRID SECTION */}
            <div className="juju-grid-section">
                <div className="h2-magazine-grid juju-grid-container">
                    {remainingArticles.map((article, index) => {
                        const patternIndex = index % 4;
                        let gridStyle = {};
                        let aspectRatio = '16/9';
                        let titleFontSize = '32px';
                        let titleClass = 'h2-mag-standard-title';
                        let isLarge = false;

                        const delayClass = `delay-${(index % 3) * 100}`;

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
                            <div key={article.id} style={gridStyle} className={`reveal-on-scroll ${delayClass}`}>
                                <Link to={`/case-studies/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="h2-mag-media-placeholder" style={{ aspectRatio: aspectRatio }}>
                                        <img src={article.image || `https://placehold.co/1200x800/111/fff?text=${encodeURIComponent(article.title)}`}
                                            alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>

                                    {isLarge ? (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '20px' }}>
                                            <h3 className={titleClass} style={{ fontSize: titleFontSize, width: '70%', color: '#FFFFFF' }}>{article.title}</h3>
                                            <div style={{ textAlign: 'right' }}>
                                                <span className="h2-mag-date" style={{ color: '#ccc' }}>{article.date}</span>
                                                <span style={{ display: 'block', color: '#E52323', textTransform: 'uppercase', fontSize: '14px', marginTop: '10px' }}>{article.category}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="h2-mag-date" style={{ marginTop: '20px', display: 'block', color: '#ccc' }}>{article.date}</span>
                                            <h3 className={titleClass} style={{ fontSize: titleFontSize, marginTop: '10px', color: '#FFFFFF' }}>{article.title}</h3>
                                        </>
                                    )}

                                    {isLarge ? (
                                        <p className="h2-mag-desc" style={{ marginTop: '20px', maxWidth: '80%', color: '#ccc' }}>{article.intro.substring(0, 150)}...</p>
                                    ) : (
                                        <p className="h2-mag-desc" style={{ marginTop: '10px', color: '#ccc' }}>{article.intro.substring(0, 100)}...</p>
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

export default CaseStudiesPage;
