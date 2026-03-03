import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/homepage2.css';
import '../styles/juju-overrides.css';
import SEO from '../components/SEO';
import VideoRequestModal from '../components/VideoRequestModal';

const CaseStudiesPage = () => {
    // Influence Typing Animation State
    const [typedText, setTypedText] = useState("");
    const titleRef = useRef(null);
    const targetText = "Case Studies";

    // Data State
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

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
                        image: post.image_url,
                        video_url: post.video_url
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

    // All articles will be shown in the grid now
    const displayArticles = articles;

    const renderClearDescription = (text, className, isLarge = false) => {
        if (!text) return null;

        // Clean special characters and &nbsp;
        const cleanText = text.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

        const keys = ["Category", "Format", "Objective", "Goal", "Target", "Challenge", "Client", "Role", "Brand", "Success", "Strategy", "Distribution", "Impact", "Why It Worked", "Agency"];
        const regex = new RegExp(`(${keys.join("|")}):`, "i");

        if (!regex.test(cleanText)) {
            const truncatedText = isLarge ? cleanText.substring(0, 150) + '...' : cleanText.substring(0, 100) + '...';
            return <p className={className}>{truncatedText}</p>;
        }

        const parts = cleanText.split(new RegExp(`(${keys.join("|")}):`, "gi")).filter(part => part !== undefined && part.length > 0);

        const elements = [];
        let currentPos = 0;

        // The first element might be text BEFORE any key
        const firstPart = parts[0]?.toLowerCase().trim();
        if (!keys.some(k => firstPart === k.toLowerCase())) {
            if (parts[0]?.trim()) {
                elements.push(<p key="lead" style={{ marginBottom: '10px', opacity: 0.8 }}>{parts[0].trim()}</p>);
            }
            currentPos = 1;
        }

        for (let i = currentPos; i < parts.length; i += 2) {
            const key = parts[i];
            const value = parts[i + 1];
            if (key && value) {
                elements.push(
                    <div key={key} style={{ marginBottom: '4px', fontSize: '13px', display: 'flex', gap: '8px', lineHeight: '1.4' }}>
                        <span style={{ color: '#FFFFFF', textTransform: 'uppercase', fontWeight: '600', minWidth: '110px', fontSize: '11px', whiteSpace: 'nowrap' }}>{key}</span>
                        <span style={{ color: '#FFFFFF', whiteSpace: 'pre-wrap', flex: 1 }}>{value.trim()}</span>
                    </div>
                );
            }
        }

        return <div className={className} style={{ marginTop: '15px' }}>{elements}</div>;
    };

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch juju-page-container">
            <SEO
                title="Case Studies"
                description="Explore our latest campaigns and influencer collaborations."
                canonical="/case-studies"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Case Studies - JUJU Films",
                    "description": "Explore our latest campaigns and influencer collaborations.",
                    "url": "https://www.jujuindia.com/case-studies"
                }}
            />

            {/* HERO SECTION */}
            <section className="h2-magazine juju-hero-section">
                <div className="h2-magazine-header">
                    <h1 className="h2-magazine-title-influence" ref={titleRef}>
                        {typedText}
                        <span className="h2-cursor-blink"></span>
                    </h1>
                    <div className="h2-magazine-meta">
                        <span className="h2-mag-clock"></span>
                        <span className="h2-mag-count">JUJU Case Studies</span>
                    </div>
                </div>


            </section>



            {/* GRID SECTION */}
            <div className="juju-grid-section">
                <div className="h2-magazine-grid juju-grid-container">
                    {displayArticles.map((article, index) => {
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

                                    {/* Description removed as requested */}
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
