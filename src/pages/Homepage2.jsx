import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage2.css';

const Homepage2 = () => {
    // Dynamic Text State
    const words = ["public", "culturel", "digital", "stratégique", "durable", "mémorable"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    // Text Cycle Interval
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000); // Change every 2 seconds matching the fade animation
        return () => clearInterval(interval);
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
                        <span className="h2-static-text">Brand design</span>
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

                <div className="h2-filter-bar">
                    <span className="h2-filter-item">Culture</span>
                    <span className="h2-filter-item">Territoires</span>
                    <span className="h2-filter-item">Institutions</span>
                    <span className="h2-filter-item">Gastronomie</span>
                    <span className="h2-filter-item">Mode & Luxe</span>
                    <span className="h2-filter-item">Sport</span>
                </div>
            </header>

            {/* 2. SELECTED WORKS (2-Col Grid) */}
            <section className="h2-works">
                <div className="h2-works-grid">
                    {/* Project 1 */}
                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src="/local_assets/wp-content/uploads/2025/09/01_concarneau-logo-cover-2-1-2560x1583.webp" alt="Concarneau" />
                            {/* Hover Video */}
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src="https://grapheine.com/wp-content/uploads/2025/09/intro_case_logo-low-1.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Concarneau</h3>
                            <div className="h2-project-category">Territoires</div>
                        </div>
                    </div>

                    {/* Project 2 (Staggered by margin in Grid if needed, or naturally flowing) */}
                    <div className="h2-project-card" style={{ marginTop: '150px' }}>
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src="/local_assets/wp-content/uploads/2025/10/carre-baudouin-case-study-202507162-2560x1312.webp" alt="Pavillon Carré de Baudouin" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src="https://grapheine.com/wp-content/uploads/2025/09/intro_case_logo-low-1.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Pavillon Carré de Baudouin</h3>
                            <div className="h2-project-category">Culture / Architecture</div>
                        </div>
                    </div>

                    {/* Project 3 */}
                    <div className="h2-project-card">
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src="https://grapheine.com/wp-content/uploads/2024/02/vivre-lessentiel-couv.jpg" alt="Vivre l'Essentiel" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src="https://grapheine.com/wp-content/uploads/2025/09/intro_case_logo-low-1.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Vivre l'Essentiel</h3>
                            <div className="h2-project-category">Gastronomy</div>
                        </div>
                    </div>

                    {/* Project 4 */}
                    <div className="h2-project-card" style={{ marginTop: '150px' }}>
                        <div className="h2-project-media-container">
                            <img className="h2-project-img" src="/local_assets/wp-content/uploads/2025/10/showreel_grapheine_27_octobre.mp4" alt="Showreel" />
                            <video className="h2-project-video-hover" muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}>
                                <source src="https://grapheine.com/wp-content/uploads/2025/09/intro_case_logo-low-1.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h2-project-info">
                            <h3 className="h2-project-title">Showreel 2025</h3>
                            <div className="h2-project-category">Motion Design</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. MAGAZINE (NEWS) */}
            <section className="h2-magazine">
                <h2 className="h2-section-title">Le Magazine</h2>
                <div className="h2-article-list">
                    <article className="h2-article">
                        <span className="h2-article-date">14 Jan 2025</span>
                        <h3 className="h2-article-title">La gen Z brandit le drapeau One Piece pour saboter les gouvernements.</h3>
                    </article>
                    <article className="h2-article">
                        <span className="h2-article-date">02 Dec 2024</span>
                        <h3 className="h2-article-title">Pourquoi le logo de votre boulanger est (probablement) moche ?</h3>
                    </article>
                    <article className="h2-article">
                        <span className="h2-article-date">15 Nov 2024</span>
                        <h3 className="h2-article-title">L'identité visuelle de Paris 2024 décryptée par nos designers.</h3>
                    </article>
                </div>
                <div style={{ marginTop: '60px' }}>
                    <Link to="/magazine" className="h2-filter-item" style={{ fontSize: '1.5rem', borderBottom: '2px solid #E52323' }}>Lire le magazine →</Link>
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
