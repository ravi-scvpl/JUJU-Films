"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../supabaseClient';
import SEO from '../components/SEO';
import '../styles/homepage2.css';
import img1 from '../assets/1.webp';
import img2 from '../assets/2.webp';
import img3 from '../assets/3.webp';
import img4 from '../assets/4.webp';
const shayarifilms = '/assets/Shayari.mp4';
const outkro = '/assets/outkro.mp4';
const gamebadalde = '/assets/gamebadalde.mp4';
const xpert = '/assets/xpertkisuno.mp4';
const jujuFilms = '/assets/juju-showreel.mp4';
const jujuFilms2 = '/assets/JujuFilms.mp4';
import VideoModal from '../components/VideoModal';

const Homepage2 = () => {
    // Dynamic Text State
    const words = ["GOOD JUJU, GREAT FILMS"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");

    // Stories Typing Animation State
    const [storiesTypedText, setStoriesTypedText] = useState("");
    const storiesTitleRef = React.useRef(null);
    const storiesTargetText = "Stories";

    // Video Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000); // Change every 2 seconds matching the fade animation
        return () => clearInterval(interval);
    }, []);

    // Typing Effect for "Stories"
    useEffect(() => {
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

        return () => observer.disconnect();
    }, []);

    // Fetch Categories (Run once)
    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .eq('type', 'blog')
                .order('name', { ascending: true });
            if (!error && data) setCategories(data);
        };
        fetchCategories();
    }, []);

    // Fetch Blogs (Run on category change)
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                let query = supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false })
                    .limit(4);

                if (activeCategory !== 'All') {
                    query = query.eq('category', activeCategory);
                }

                const { data, error } = await query;

                if (error) throw error;

                if (data) {
                    const mappedBlogs = data.map(post => ({
                        id: post.id,
                        slug: post.slug,
                        title: post.title,
                        intro: post.meta_desc || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
                        date: new Date(post.created_at).toLocaleDateString('en-GB'),
                        category: post.category || 'Thought Leadership',
                        image: post.image_url
                    }));
                    setBlogs(mappedBlogs);
                }
            } catch (err) {
                console.error("Error fetching homepage blogs:", err);
            }
        };

        fetchBlogs();
    }, [activeCategory]);

    // Observer for Sectors (Active Red Text)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all
                    document.querySelectorAll('.h2-sector-item').forEach(el => el.classList.remove('active'));
                    // Add to current
                    entry.target.classList.add('active');
                }
            });
        }, { rootMargin: "-40% 0px -40% 0px" }); // Trigger at center (20% zone)

        document.querySelectorAll('.h2-sector-item').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Intersection Observer for Scroll Reveals
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.h2-project-card').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleOpenShowreel = (e) => {
        if (e) e.preventDefault();
        setSelectedVideo({
            type: 'local',
            src: jujuFilms,
            title: 'JUJU Films Showreel'
        });
        setIsModalOpen(true);
    };

    return (
        <div className="page-template-homepage2">
            <SEO
                title="Home"
                description="JUJU Films is a creator collective building original stories, under one JUJU philosophy."
                canonical="/"
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "JUJU Films",
                        "url": "https://www.jujuindia.com",
                        "logo": "https://www.jujuindia.com/juju-white-logo.webp",
                        "sameAs": [
                            "https://www.instagram.com/jujufilmsindia",
                            "https://www.facebook.com/share/17xYvGRBGJ/",
                            "https://x.com/JujuFilmsIndia",
                            "https://in.pinterest.com/JujuFilmsIndia/"
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "JUJU Films",
                        "url": "https://www.jujuindia.com",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://www.jujuindia.com/search?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    }
                ]}
            />

            {/* 1. HERO SECTION */}
            <header className="h2-hero">
                <div className="h2-hero-content">
                    <h1>
                        <span className="h2-static-text">From 10 seconds to full universes —
                            we craft what people remember,
                            under one <span style={{ fontWeight: 'bold', color: '#e52323' }}>J</span><span style={{ fontWeight: 'bold', color: '#E9BC2D' }}>U</span><span style={{ fontWeight: 'bold', color: '#4CBF64' }}>J</span><span style={{ fontWeight: 'bold', color: '#52C3E1' }}>U</span> philosophy.</span> <span><span style={{ fontWeight: 'bold', color: '#e52323' }}>GOOD </span><span style={{ fontWeight: 'bold', color: '#E9BC2D' }}>JUJU. </span><span style={{ fontWeight: 'bold', color: '#4CBF64' }}>GREAT </span><span style={{ fontWeight: 'bold', color: '#52C3E1' }}>FILMS.</span></span>
                        {/* <div className="h2-dynamic-text-wrapper">
                            {words.map((word, index) => (
                                <span
                                    key={index}
                                    className={`h2-dynamic-word ${index === currentWordIndex ? 'active' : ''}`}
                                >
                                    {word}
                                </span>
                            ))}
                        </div> */}
                    </h1>
                    <a
                        href="#"
                        className="h2-magazine-nav-link"
                        style={{ fontSize: '32px', borderBottom: '2px solid #ff8a8a', cursor: 'pointer' }}
                        onClick={handleOpenShowreel}
                    >
                        Watch Showreel
                    </a>
                </div>

                {/* Hero Media Block (Below Text) */}
                <div className="h2-hero-media">
                    <video autoPlay muted loop playsInline onContextMenu={(e) => e.preventDefault()} controlsList="nodownload">
                        <source src={jujuFilms} type="video/mp4" />
                    </video>
                </div>

                {/* <div className="h2-filter-bar">
                    <span className="h2-filter-item">Culture</span>
                    <span className="h2-filter-item">Territoires</span>
                    <span className="h2-filter-item">Institutions</span>
                    <span className="h2-filter-item">Gastronomie</span>
                    <span className="h2-filter-item">Mode & Luxe</span>
                    <span className="h2-filter-item">Sport</span>
                </div> */}
            </header>

            {/* Divider Section */}
            <section>
                <div className="section-devider">
                    <div className="section-devider-line"></div>
                </div>
            </section>

            {/* 1.5 INTRO TEXT SECTION */}
            <section className="h2-intro-section">
                <div className="h2-intro-heading">
                    <h2>Culture Compounds. Campaigns Expire.</h2>
                </div>
                <div className="h2-intro-grid">
                    <p className="h2-intro-p">
                        JUJU Films is designed for brands that want more than impressions.
                        Not a production house. Not an agency. But a creator collective that builds original stories brands can credibly belong to—moving ideas from concept to culture without the usual friction.
                    </p>
                    <p className="h2-intro-p">
                        At JUJU, creators build the narrative, brands fund it with restraint, and OTT platforms deliver scale. No forced placements. No short-term campaigns. Just brand-enabled storytelling with long shelf life, cultural relevance, and measurable recall—built for CMOs who think in years, not weeks.
                    </p>
                </div>
            </section>

            {/* 2. SECTORS SECTION */}
            <section className="h2-sectors-container">
                {/* Left Side: Static/Sticky Video */}
                <div className="h2-sectors-media">
                    <video autoPlay muted loop playsInline src={jujuFilms2} onContextMenu={(e) => e.preventDefault()} controlsList="nodownload"></video>
                    <a
                        href="#"
                        className="h2-magazine-nav-link"
                        style={{ fontSize: '32px', borderBottom: '2px solid #ff8a8a', cursor: 'pointer' }}
                        onClick={handleOpenShowreel}
                    >
                        Watch Showreel
                    </a>
                </div>


                {/* Right Side: Scrollable Text */}
                <div className="h2-sectors-list">
                    {[
                        { name: "Juju Storyteller", path: "/juju-storytellers" },
                        { name: "Juju Commercials", path: "/juju-commercials" },
                        { name: "Juju AI Films", path: "/juju-ai-films" },
                        // { name: "Collective", path: "/team" },
                        { name: "Stories", path: "/blog" },
                        { name: "Case Studies", path: "/case-studies" },
                        { name: " ", path: null },
                        { name: " ", path: null },
                        { name: "Brand Collabration", path: "/contact", state: { activeTab: 'brand' } },
                        { name: "Creators Connect", path: "/contact", state: { activeTab: 'creators' } },
                        { name: "Internship", path: "/contact", state: { activeTab: 'internships' } },
                        { name: "Job", path: "/contact", state: { activeTab: 'jobs' } }
                    ].map((item, index) => (
                        item.path ? (
                            <Link
                                key={index}
                                href={item.path}
                                state={item.state}
                                className="h2-sector-item"
                                id={`sector-${index}`}
                                style={{ textDecoration: 'none', display: 'block' }}
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <div
                                key={index}
                                className="h2-sector-item"
                                id={`sector-${index}`}
                                style={{ pointerEvents: 'none' }}
                            >
                                {item.name}
                            </div>
                        )
                    ))}
                    <div className="spacerForPc"></div>
                </div>
            </section >



            {/* 3. FILTER / PROJECT GRID */}
            < section className="h2-filter-section" >
                <div className="h2-works-grid">
                    {/* 3. Caramba: Live Culture */}
                    {/* <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src="https://grapheine.com/wp-content/uploads/2025/07/01-caramba-culturel-logotype-4-2560x1583.webp" alt="Caramba: Live Culture" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src="https://grapheine.com/wp-content/uploads/2025/09/intro_case_logo-low-1.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Tera Ghar Mera Ghar</h3>
                            <div className="h2-project-category">Storyteller</div>
                        </div>
                    </div> */}

                    {/* 4. Elegy */}
                    {/* <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src="https://grapheine.com/wp-content/uploads/2025/09/cs_elegy-gallimard-jeunesse-2560x1313.webp" alt="Elegy" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src="https://grapheine.com/wp-content/uploads/2025/09/intro_case_logo-low-1.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Chalti ka Namm Ghadi</h3>
                            <div className="h2-project-category">Storyteller</div>
                        </div>
                    </div> */}

                    {/* 5. Baudouin Square */}
                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src={img1} alt="Game Badal de" loading="lazy" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} preload="none" onContextMenu={(e) => e.preventDefault()} controlsList="nodownload">
                                <source src={gamebadalde} type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Game Badal de</h3>
                            <div className="h2-project-category">Commercials</div>
                        </div>
                    </div>

                    {/* 6. The Animal Company */}
                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src={img2} alt="Out Karo" loading="lazy" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} preload="none" onContextMenu={(e) => e.preventDefault()} controlsList="nodownload">
                                <source src={outkro} type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Out Karo</h3>
                            <div className="h2-project-category">Music Video</div>
                            {/* <p style={{ fontSize: '18px', marginTop: '10px', color: '#666', lineHeight: '1.4' }}>
                                A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity and animal welfare.
                            </p> */}
                        </div>
                    </div>

                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src={img3} alt="Expert ki Suno" loading="lazy" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} preload="none" onContextMenu={(e) => e.preventDefault()} controlsList="nodownload">
                                <source src={xpert} type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Xpert ki Suno</h3>
                            <div className="h2-project-category">Brand IP</div>
                        </div>
                    </div>

                    {/* 6. The Animal Company */}
                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src={img4} alt="Super Shayari" loading="lazy" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} preload="none" onContextMenu={(e) => e.preventDefault()} controlsList="nodownload">
                                <source src={shayarifilms} type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Super Shayari</h3>
                            <div className="h2-project-category">AI Series</div>
                            {/* <p style={{ fontSize: '18px', marginTop: '10px', color: '#666', lineHeight: '1.4' }}>
                                A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity and animal welfare.
                            </p> */}
                        </div>
                    </div>
                </div>
            </section >

            {/* 3.5 AGENCY INFO SECTION */}
            < section className="h2-agency-info-section" >
                <div className="h2-agency-info-header">
                    <h2>
                        <span className="h2-statement-line-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JUJU Films is a creator collective making
                        </span>
                        <br />
                        <span className="h2-statement-line-2">
                            <span className="highlight-red">micro-dramas, series, and films—

                            </span>where brands don’t interrupt stories, they enable them.
                        </span>
                    </h2>
                </div>
                <div className="h2-agency-info-grid">
                    <div className="h2-agency-info-col-1">
                        <p className="h2-agency-info-p">
                            JUJU Films is not a production house.
                            It’s a collective of India’s best storytellers, partnering on IP—not hired on payroll.

                            We bring creators, brands, and platforms together to build original narratives for OTTs, digital platforms, and emerging formats—funded by brands who believe in culture over clutter.
                        </p>
                    </div>
                    <div className="h2-agency-info-col-2">
                        <p className="h2-agency-info-p">
                            From short-form micro-dramas to original series and ad films,
                            we create stories designed to travel—across formats, languages, and time.

                            Our work includes brand-enabled content where the brand lives inside the world, silently and authentically, supported by AI-powered storytelling that allows faster creation, regional scale, and future-ready formats.
                        </p>
                        <Link href="/about" className="h2-agency-info-link">Discover the Collective</Link>
                    </div>
                </div>
            </section >

            {/* 3. MAGAZINE (NEWS) - Dynamic */}
            <section className="h2-magazine">
                <div className="h2-magazine-header">
                    <h2 className="h2-magazine-title" ref={storiesTitleRef}>
                        {storiesTypedText}
                        <span className="h2-cursor-blink"></span>
                    </h2>
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

                <div className="h2-magazine-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>

                    {/* Row 1, Item 1: 1-8 (7 cols) */}
                    {blogs[0] && (
                        <div style={{ gridColumn: '1 / 8' }}>
                            <Link href={`/blog/${blogs[0].slug || blogs[0].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="h2-mag-media-placeholder" style={{ aspectRatio: '16/9' }}>
                                    <img src={blogs[0].image || `https://placehold.co/1200x800/111/fff?text=${encodeURIComponent(blogs[0].title)}`}
                                        alt={blogs[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '20px' }}>
                                    <h3 className="h2-mag-luxury-title" style={{ fontSize: '36px', width: '70%' }}>{blogs[0].title}</h3>
                                    <div style={{ textAlign: 'right' }}>
                                        <span className="h2-mag-date">{blogs[0].date || '06.01.2026'}</span>
                                        <span style={{ display: 'block', color: '#E52323', textTransform: 'uppercase', fontSize: '14px', marginTop: '10px' }}>{blogs[0].category || 'Thought Leadership'}</span>
                                    </div>
                                </div>
                                <p className="h2-mag-desc" style={{ marginTop: '20px', maxWidth: '80%' }}>{blogs[0].intro.substring(0, 150)}...</p>
                            </Link>
                        </div>
                    )}

                    {/* Row 1, Item 2: 8-13 (5 cols) */}
                    {blogs[1] && (
                        <div style={{ gridColumn: '8 / 13' }}>
                            <Link href={`/blog/${blogs[1].slug || blogs[1].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="h2-mag-media-placeholder" style={{ aspectRatio: '4/3' }}>
                                    <img src={blogs[1].image || `https://placehold.co/800x600/222/fff?text=${encodeURIComponent(blogs[1].title)}`}
                                        alt={blogs[1].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                                </div>
                                <span className="h2-mag-date" style={{ marginTop: '20px' }}>{blogs[1].date || '06.01.2026'}</span>
                                <h3 className="h2-mag-standard-title" style={{ fontSize: '32px', marginTop: '10px' }}>{blogs[1].title}</h3>
                                <p className="h2-mag-desc" style={{ marginTop: '10px' }}>{blogs[1].intro.substring(0, 100)}...</p>
                            </Link>
                        </div>
                    )}

                    {/* Row 2, Item 3: 1-5 (4 cols) */}
                    {blogs[2] && (
                        <div style={{ gridColumn: '1 / 5', marginTop: '80px' }}>
                            <Link href={`/blog/${blogs[2].slug || blogs[2].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="h2-mag-media-placeholder" style={{ aspectRatio: '3/4' }}>
                                    <img src={blogs[2].image || `https://placehold.co/600x800/333/fff?text=${encodeURIComponent(blogs[2].title)}`}
                                        alt={blogs[2].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                                </div>
                                <span className="h2-mag-date" style={{ marginTop: '20px' }}>{blogs[2].date || '06.01.2026'}</span>
                                <h3 className="h2-mag-standard-title" style={{ fontSize: '28px', marginTop: '10px' }}>{blogs[2].title}</h3>
                            </Link>
                        </div>
                    )}

                    {/* Row 2, Item 4: 5-13 (8 cols) */}
                    {blogs[3] && (
                        <div style={{ gridColumn: '5 / 13', marginTop: '80px' }}>
                            <Link href={`/blog/${blogs[3].slug || blogs[3].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="h2-mag-media-placeholder" style={{ aspectRatio: '21/9' }}>
                                    <img src={blogs[3].image || `https://placehold.co/1200x500/444/fff?text=${encodeURIComponent(blogs[3].title)}`}
                                        alt={blogs[3].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                    <h3 className="h2-mag-standard-title" style={{ fontSize: '48px', width: '70%' }}>{blogs[3].title}</h3>
                                    <div style={{ textAlign: 'right' }}>
                                        <span className="h2-mag-date">{blogs[3].date || '06.01.2026'}</span>
                                        <p className="h2-mag-desc" style={{ marginTop: '10px', maxWidth: '300px' }}>{blogs[3].intro.substring(0, 120)}...</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                </div>

                <div style={{ marginTop: '100px', textAlign: 'right' }}>
                    <Link href="/about" className="h2-magazine-nav-link" style={{ fontSize: '32px', borderBottom: '2px solid #ff8a8a' }}>View all stories →</Link>
                </div>
            </section>

            <VideoModal
                isOpen={isModalOpen}
                video={selectedVideo}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Homepage2;
