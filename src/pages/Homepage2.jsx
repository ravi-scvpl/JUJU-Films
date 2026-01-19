import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage2.css';

const Homepage2 = () => {
    // Dynamic Text State
    const words = ["JUJU Storytellers", "JUJU Commercials", "JUJU AI Filmakers"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isLightTheme, setIsLightTheme] = useState(false);

    // Text Cycle Interval
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000); // Change every 2 seconds matching the fade animation
        return () => clearInterval(interval);
    }, []);

    // Theme Transition on Scro
    useEffect(() => {
        const handleScroll = () => {
            const video = document.querySelector('.h2-hero-media video');
            if (video) {
                const rect = video.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // Trigger transition in the middle of the video
                const videoTop = rect.top;

                if (videoTop < viewportHeight / 2) {
                    setIsLightTheme(true);
                } else {
                    setIsLightTheme(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
        <div className={`page-template-homepage2 ${isLightTheme ? 'theme-light' : ''}`}>

            {/* 1. HERO SECTION */}
            <header className="h2-hero">
                <div className="h2-hero-content">
                    <h1>
                        <span className="h2-static-text">JUJU Films is a creator collective building original stories,
                            under one JUJU philosophy.</span>
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
                <div className="h2-intro-grid">
                    <p className="h2-intro-p">
                        Graphéine accompagne les marques qui veulent faire du design un levier de transformation sociale et économique, pour relever les défis de demain.
                    </p>
                    <p className="h2-intro-p">
                        Nous croyons que la marque est un outil puissant pour inventer de nouveaux récits, fédérer les imaginaires et dessiner des futurs désirables.
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
                    {["Culture", "Territoires", "Éducation", "Technologies", "Conseil & services", "Industries", "Écologie & Environnement", "Sport & santé", "Gastronomie", "Mode & luxe"].map((sector, index) => (
                        <div
                            key={index}
                            className="h2-sector-item"
                            id={`sector-${index}`}
                        >
                            {sector}
                        </div>
                    ))}
                    <div style={{ height: '30vh' }}></div>
                </div>
            </section>



            {/* 3. FILTER / PROJECT GRID */}
            <section className="h2-filter-section">
                <div className="h2-works-grid">
                    {/* 1. Mont Saint-Michel */}
                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src="https://grapheine.com/wp-content/uploads/2026/01/00-branding-logo-mont-saint-michel-monument-france-cover-2560x1583.jpg" alt="Mont Saint-Michel" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src="https://grapheine.com/wp-content/uploads/2025/09/intro_case_logo-low-1.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Mont Saint-Michel</h3>
                            <div className="h2-project-category">Territories</div>
                        </div>
                    </div>

                    {/* 2. City of Concarneau */}
                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src="https://grapheine.com/wp-content/uploads/2025/09/01_concarneau-logo-cover-2-1-2560x1583.webp" alt="City of Concarneau" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src="https://grapheine.com/wp-content/uploads/2025/09/intro_case_logo-low-1.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">City of Concarneau</h3>
                            <div className="h2-project-category">Territories</div>
                        </div>
                    </div>

                    {/* 3. Caramba: Live Culture */}
                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src="https://grapheine.com/wp-content/uploads/2025/07/01-caramba-culturel-logotype-4-2560x1583.webp" alt="Caramba: Live Culture" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src="https://grapheine.com/wp-content/uploads/2025/09/intro_case_logo-low-1.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Caramba: Live Culture</h3>
                            <div className="h2-project-category">Culture</div>
                        </div>
                    </div>

                    {/* 4. Elegy */}
                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src="https://grapheine.com/wp-content/uploads/2025/09/cs_elegy-gallimard-jeunesse-2560x1313.webp" alt="Elegy" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src="https://grapheine.com/wp-content/uploads/2025/09/intro_case_logo-low-1.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Elegy</h3>
                            <div className="h2-project-category">Culture</div>
                        </div>
                    </div>

                    {/* 5. Baudouin Square */}
                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src="https://grapheine.com/wp-content/uploads/2025/10/carre-baudouin-case-study-202507162-2560x1312.webp" alt="Baudouin Square" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src="https://grapheine.com/wp-content/uploads/2025/09/intro_case_logo-low-1.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Baudouin Square</h3>
                            <div className="h2-project-category">Culture</div>
                        </div>
                    </div>

                    {/* 6. The Animal Company */}
                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src="https://grapheine.com/wp-content/uploads/2025/09/00-compagne-animaux-logo-vignette-2560x1575.webp" alt="The Animal Company" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src="https://grapheine.com/wp-content/uploads/2025/09/intro_case_logo-low-1.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">The Animal Company</h3>
                            <div className="h2-project-category">Advice & services</div>
                            <p style={{ fontSize: '18px', marginTop: '10px', color: '#666', lineHeight: '1.4' }}>
                                A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity and animal welfare.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3.5 AGENCY INFO SECTION */}
            <section className="h2-agency-info-section">
                <div className="h2-agency-info-header">
                    <h2>
                        <span className="h2-statement-line-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Making brand design a lever for</span>
                        <br />
                        <span className="h2-statement-line-2">
                            <span className="highlight-red">social and economic transformation</span>, to meet the challenges of tomorrow.
                        </span>
                    </h2>
                </div>
                <div className="h2-agency-info-grid">
                    <div className="h2-agency-info-col-1">
                        <p className="h2-agency-info-p">
                            For 25 years, in Paris and Lyon, our designers, coming from vibrant training programs, diverse professional backgrounds and a shared passion for imagery, have been supporting you in the creation of brand strategies and designs.
                        </p>
                    </div>
                    <div className="h2-agency-info-col-2">
                        <p className="h2-agency-info-p">
                            The goal is to make your brand visible, understandable, and desirable. To achieve this, we enjoy understanding complexity, developing simple strategies, and designing original, agile, and sustainable solutions.
                        </p>
                        <Link to="/agence" className="h2-agency-info-link">Discover the agency</Link>
                    </div>
                </div>
            </section>

            {/* 3. MAGAZINE (NEWS) - High Fidelity */}
            <section className="h2-magazine">
                <div className="h2-magazine-header">
                    <h2 className="h2-magazine-title">Magazine</h2>
                    <div className="h2-magazine-meta">
                        <span className="h2-mag-clock">10:45:22 UTC+01:00</span>
                        <span className="h2-mag-count">340 ARTICLES</span>
                    </div>
                </div>

                <ul className="h2-magazine-nav">
                    <li><a href="#" className="h2-magazine-nav-link active">All</a></li>
                    <li><a href="#" className="h2-magazine-nav-link">Graphic perspectives</a></li>
                    <li><a href="#" className="h2-magazine-nav-link">History of graphic design</a></li>
                    <li><a href="#" className="h2-magazine-nav-link">Brand culture</a></li>
                    <li><a href="#" className="h2-magazine-nav-link">The most popular</a></li>
                </ul>

                <div className="h2-magazine-grid">
                    {/* Featured Row 1 */}
                    <div className="h2-mag-featured-row">
                        <div className="article-first">
                            <div className="h2-mag-media-placeholder"></div>
                            <div className="article-content">
                                <div className="h2-mag-article">

                                    <h3 className="h2-mag-luxury-title">Luxury brand magazines are putting up resistance</h3>
                                </div>
                                <div className="h2-mag-article" style={{ justifyContent: 'flex-end', paddingBottom: '20px' }}>
                                    <p className="h2-mag-desc">
                                        An overview of luxury brand magazines that seek to stand out and resist the temporal acceleration of current events.
                                    </p>
                                    <span className="h2-mag-date">06.01.2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Michel Quarez Row (on the right in screenshot, let's stack or grid it) */}
                    <div className="h2-mag-article" style={{ gridColumn: '2' }}>
                        <div className="h2-mag-media-placeholder" style={{ aspectRatio: '4/3' }}></div>
                        <span className="h2-mag-date">16.12.2025</span>
                        <h3 className="h2-mag-standard-title">Michel Quarez, an artist/graphic designer eager to live in color</h3>
                        <p className="h2-mag-desc">
                            Michel Quarez was a graphic designer, painter, and poster artist. In truth, he made no distinction between these different categories...
                        </p>
                    </div>

                    {/* Row 2 */}
                    <div className="h2-mag-second-row">
                        <div className="h2-mag-article">
                            <div className="h2-mag-media-placeholder"></div>
                            <span className="h2-mag-date">09.12.2025</span>
                            <h3 className="h2-mag-standard-title">Gen Z brandishes the One Piece flag to sabotage governments</h3>
                            <p className="h2-mag-desc">
                                Why the One Piece symbol became the banner of Generation Z, brandished to sabotage governments.
                            </p>
                        </div>
                        <div className="h2-mag-article">
                            <div className="h2-mag-media-placeholder"></div>
                            <h3 className="h2-mag-standard-title" style={{ fontSize: '64px' }}>Maison Nicolas, a new logo for a new strategy</h3>
                            <div style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
                                <p className="h2-mag-desc">
                                    Maison Nicolas has unveiled a new logo and a new identity, unfortunately without drawing on its rich graphic heritage.
                                </p>
                                <span className="h2-mag-date">02.12.2025</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '100px', textAlign: 'right' }}>
                    <Link to="/magazine" className="h2-magazine-nav-link" style={{ fontSize: '32px', borderBottom: '2px solid #ff8a8a' }}>View the portfolio →</Link>
                </div>
            </section>

            {/* 4. FOOTER */}
            <footer className="h2-footer">
                <nav className="h2-big-nav">
                    <Link to="/portfolio" className="h2-nav-link">Projets</Link>
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
            </footer>

        </div>
    );
};

export default Homepage2;
