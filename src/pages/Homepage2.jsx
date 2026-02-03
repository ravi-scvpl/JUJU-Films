import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/homepage2.css';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import shayarifilms from '../assets/Shayari.mp4';
import outkro from '../assets/outkro.mp4';
import gamebadalde from '../assets/gamebadalde.mp4';
import xpert from '../assets/xpertkisuno.mp4';

const Homepage2 = () => {
    // Dynamic Text State
    const words = ["Story first. Always"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [blogs, setBlogs] = useState([]);

    // Stories Typing Animation State
    const [storiesTypedText, setStoriesTypedText] = useState("");
    const storiesTitleRef = React.useRef(null);
    const storiesTargetText = "Stories";

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

    // Fetch Blogs
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false })
                    .limit(4);

                if (error) throw error;

                if (data) {
                    const mappedBlogs = data.map(post => ({
                        id: post.id,
                        slug: post.slug,
                        title: post.title,
                        intro: post.meta_desc || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
                        date: new Date(post.created_at).toLocaleDateString('en-GB'),
                        category: 'Thought Leadership',
                        image: post.image_url
                    }));
                    setBlogs(mappedBlogs);
                }
            } catch (err) {
                console.error("Error fetching homepage blogs:", err);
            }
        };

        fetchBlogs();
    }, []);

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

    return (
        <div className="page-template-homepage2">

            {/* 1. HERO SECTION */}
            <header className="h2-hero">
                <div className="h2-hero-content">
                    <h1>
                        <span className="h2-static-text">JUJU Films is a creator collective building original stories,
                            under one <span style={{ fontWeight: 'bold', color: '#e52323' }}>J</span><span style={{ fontWeight: 'bold', color: '#E9BC2D' }}>U</span><span style={{ fontWeight: 'bold', color: '#4CBF64' }}>J</span><span style={{ fontWeight: 'bold', color: '#52C3E1' }}>U</span> philosophy.</span>
                        <div className="h2-dynamic-text-wrapper">
                            {words.map((word, index) => (
                                <span
                                    key={index}
                                    className={`h2-dynamic-word ${index === currentWordIndex ? 'active' : ''}`}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    </h1>
                </div>

                {/* Hero Media Block (Below Text) */}
                <div className="h2-hero-media">
                    <video autoPlay muted loop playsInline>
                        <source src="https://grapheine.com/wp-content/uploads/2025/10/showreel_grapheine_27_octobre.mp4" type="video/mp4" />
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
                    <video autoPlay muted loop playsInline src="https://grapheine.com/wp-content/uploads/2025/10/showreel_grapheine_27_octobre.mp4"></video>
                </div>

                {/* Right Side: Scrollable Text */}
                <div className="h2-sectors-list">
                    {["Juju Storyteller", "Juju Commercials", "Juju AI Films", "Collective", "Stories", " ", " ", "Brand Collabration", "Creators Connect", "Internship", "Job"].map((sector, index) => (
                        < div
                            key={index}
                            className="h2-sector-item"
                            id={`sector-${index}`}
                        >
                            {sector}
                        </div>
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
                            <img className="h2-project-img" src={img1} alt="Game Badal de" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
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
                            <img className="h2-project-img" src={img2} alt="Out Karo" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src={outkro} type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Out Karo</h3>
                            <div className="h2-project-category">Commercials</div>
                            {/* <p style={{ fontSize: '18px', marginTop: '10px', color: '#666', lineHeight: '1.4' }}>
                                A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity and animal welfare.
                            </p> */}
                        </div>
                    </div>

                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src={img3} alt="Expert ki Suno" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src={xpert} type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Xpert ki Suno</h3>
                            <div className="h2-project-category">AI Films</div>
                        </div>
                    </div>

                    {/* 6. The Animal Company */}
                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src={img4} alt="Super Shayari" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src={shayarifilms} type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Super Shayari</h3>
                            <div className="h2-project-category">AI Films</div>
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
                            From short-form micro-dramas to original series and films,
                            we create stories designed to travel—across formats, languages, and time.

                            Our work includes brand-enabled content where the brand lives inside the world, silently and authentically, supported by AI-powered storytelling that allows faster creation, regional scale, and future-ready formats.
                        </p>
                        <Link to="/about" className="h2-agency-info-link">Discover the Collective</Link>
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
                    <li><Link to="/blog" className="h2-magazine-nav-link active">All</Link></li>
                    <li><span className="h2-magazine-nav-link">Directors</span></li>
                    <li><span className="h2-magazine-nav-link">Cinematographers</span></li>
                    <li><span className="h2-magazine-nav-link">Music Directors</span></li>
                    <li><span className="h2-magazine-nav-link">Casting Directors</span></li>
                </ul>

                <div className="h2-magazine-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>

                    {/* Row 1, Item 1: 1-8 (7 cols) */}
                    {blogs[0] && (
                        <div style={{ gridColumn: '1 / 8' }}>
                            <Link to={`/blog/${blogs[0].slug || blogs[0].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="h2-mag-media-placeholder" style={{ aspectRatio: '16/9' }}>
                                    <img src={blogs[0].image || `https://placehold.co/1200x800/111/fff?text=${encodeURIComponent(blogs[0].title)}`}
                                        alt={blogs[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                            <Link to={`/blog/${blogs[1].slug || blogs[1].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="h2-mag-media-placeholder" style={{ aspectRatio: '4/3' }}>
                                    <img src={blogs[1].image || `https://placehold.co/800x600/222/fff?text=${encodeURIComponent(blogs[1].title)}`}
                                        alt={blogs[1].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                            <Link to={`/blog/${blogs[2].slug || blogs[2].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="h2-mag-media-placeholder" style={{ aspectRatio: '3/4' }}>
                                    <img src={blogs[2].image || `https://placehold.co/600x800/333/fff?text=${encodeURIComponent(blogs[2].title)}`}
                                        alt={blogs[2].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <span className="h2-mag-date" style={{ marginTop: '20px' }}>{blogs[2].date || '06.01.2026'}</span>
                                <h3 className="h2-mag-standard-title" style={{ fontSize: '28px', marginTop: '10px' }}>{blogs[2].title}</h3>
                            </Link>
                        </div>
                    )}

                    {/* Row 2, Item 4: 5-13 (8 cols) */}
                    {blogs[3] && (
                        <div style={{ gridColumn: '5 / 13', marginTop: '80px' }}>
                            <Link to={`/blog/${blogs[3].slug || blogs[3].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="h2-mag-media-placeholder" style={{ aspectRatio: '21/9' }}>
                                    <img src={blogs[3].image || `https://placehold.co/1200x500/444/fff?text=${encodeURIComponent(blogs[3].title)}`}
                                        alt={blogs[3].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                    <Link to="/about" className="h2-magazine-nav-link" style={{ fontSize: '32px', borderBottom: '2px solid #ff8a8a' }}>View all stories →</Link>
                </div>
            </section>

            {/* 4. FOOTER */}
            {/* < footer className="h2-footer" >
                <nav className="h2-big-nav">
                    <Link to="/juju-commercials" className="h2-nav-link">Projets</Link>
                    <Link to="/magazine" className="h2-nav-link">Magazine</Link>
                    <Link to="/agence" className="h2-nav-link">Agence</Link>
                    <Link to="/contact" className="h2-nav-link">Contact</Link>
                </nav>

                <div className="h2-agency-statement" style={{ fontSize: '24px', maxWidth: '800px', marginBottom: '60px', color: '#888' }}>
                    <p>Graphéine accompagne les marques qui veulent faire du design un levier de transformation sociale et économique, pour relever les défis de demain.</p>
                </div>

                <div className="h2-footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                    <div className="h2-socials">
                        <a href="#" style={{ color: '#fff', marginRight: '20px' }}>Instagram</a>
                        <a href="#" style={{ color: '#fff', marginRight: '20px' }}>LinkedIn</a>
                        <a href="#" style={{ color: '#fff' }}>Behance</a>
                    </div>
                    <div className="h2-meta">
                        <span>© 2002 — 2026</span>
                        <span style={{ marginLeft: '20px' }}>Paris & Lyon</span>
                    </div>
                </div>

                <div className="h2-footer-logo">
                    graphéine
                </div>
            </footer > */}

        </div >
    );
};

export default Homepage2;
