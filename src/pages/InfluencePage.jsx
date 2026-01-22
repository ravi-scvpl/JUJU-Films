import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage2.css';

const InfluencePage = () => {
    // Influence Typing Animation State
    const [typedText, setTypedText] = useState("");
    const titleRef = useRef(null);
    const targetText = "Influence";

    // Data State
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Fetch Influence Data
        fetch('/influence/influence_data.json')
            .then(res => res.json())
            .then(data => {
                if (data.articles) {
                    setArticles(data.articles);
                }
            })
            .catch(err => console.error("Error fetching influence data:", err));

        document.body.classList.add('switch');

        // Typing Effect for "Influence"
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
    }, []);

    const featuredArticle = articles[0];
    const remainingArticles = articles.slice(1);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ marginBottom: 0, paddingBottom: 0, paddingTop: '0px', backgroundColor: '#000' }}>

            {/* HERO SECTION */}
            <section className="h2-magazine" style={{ minHeight: 'auto', paddingTop: '150px', paddingBottom: '80px', borderBottom: '1px solid #222', background: '#000', marginTop: '-1px' }}>
                <div className="h2-magazine-header">
                    <h2 className="h2-magazine-title-influence" ref={titleRef}>
                        {typedText}
                        <span className="h2-cursor-blink"></span>
                    </h2>
                    <div className="h2-magazine-meta">
                        <span className="h2-mag-clock"></span>
                        <span className="h2-mag-count">JUJU Influence</span>
                    </div>
                </div>

                <ul className="h2-magazine-nav">
                    <li><button className="h2-magazine-nav-link active" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>All</button></li>
                    <li><span className="h2-magazine-nav-link">Campaigns</span></li>
                    <li><span className="h2-magazine-nav-link">Creators</span></li>
                    <li><span className="h2-magazine-nav-link">ROI</span></li>
                    <li><span className="h2-magazine-nav-link">Strategy</span></li>
                </ul>
            </section>

            {/* FEATURED SECTION */}
            {featuredArticle && (
                <section className="reveal-on-scroll" style={{ padding: '80px 43px 80px 43px', background: '#000', color: '#fff' }}>
                    {/* Full Width Image */}
                    <div style={{ width: '100%', aspectRatio: '21/9', marginBottom: '60px', overflow: 'hidden' }}>
                        <img
                            src={`https://placehold.co/1200x500/111/fff?text=${encodeURIComponent(featuredArticle.title)}`}
                            alt={featuredArticle.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </div>

                    {/* Split Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '80px', alignItems: 'start' }}>
                        <div>
                            <h2 style={{ fontSize: '64px', lineHeight: '1.0', fontFamily: 'serif', fontWeight: '400', margin: 0, color: '#FFFFFF' }}>
                                {featuredArticle.title}
                            </h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <p style={{ fontSize: '20px', lineHeight: '1.5', color: '#ccc', margin: 0 }}>
                                {featuredArticle.intro}
                            </p>
                            <span style={{ marginTop: '30px', color: '#E52323', fontSize: '18px', fontWeight: '500', display: 'inline-block', cursor: 'pointer' }}>
                                View Case Study →
                            </span>
                        </div>
                    </div>
                </section>
            )}

            {/* GRID SECTION */}
            <div style={{ background: '#000', padding: '100px 43px 100px', color: '#fff' }}>
                <div className="h2-magazine-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px', marginTop: 0 }}>
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
                                <div className="h2-mag-media-placeholder" style={{ aspectRatio: aspectRatio }}>
                                    <img src={`https://placehold.co/1200x800/111/fff?text=${encodeURIComponent(article.title)}`}
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default InfluencePage;
