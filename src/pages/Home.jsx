import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <div className="page-template-homepage">
            <SEO
                title="Home"
                description="JUJU Films is a creator collective making micro-dramas, series, and films—where brands don’t interrupt stories, they enable them."
                canonical="/"
            />
            {/* 1. HERO SECTION */}
            <header className="header-homepage grid">
                <div className="header-content">
                    <h1 className="header-homepage__title">
                        <span>We build stories.</span><br />
                        <span>Brands fund culture.</span>
                    </h1>
                    <p className="p2" style={{ maxWidth: '600px', marginTop: '20px' }}>
                        JUJU Films is a creator collective making micro-dramas, series, and films—where brands don’t interrupt stories, they enable them.
                    </p>
                    <div className="cta-container" style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
                        <Link to="/contact" className="btn-primary">→ Collaborate with JUJU</Link>
                        <Link to="/portfolio" className="btn-secondary">→ See Our Work</Link>
                    </div>
                </div>
                <div className="header-homepage__hero" style={{ opacity: 0.6 }}>
                    <div className="media">
                        {/* Keeping existing video as background/mood */}
                        <video src="/local_assets/wp-content/uploads/2025/10/showreel_grapheine_27_octobre.mp4" width="2280" height="1410" preload="auto" muted autoPlay playsInline loop></video>
                    </div>
                </div>
            </header>
            {/* About */}
            <section className="section-why-choose grid" style={{ padding: '80px 20px', background: '#000', color: '#fff' }}>
                <h2 className="section-title" style={{ borderBottom: '2px solid #E52323', paddingBottom: '20px', display: 'inline-block' }}>About JUJU</h2>

            </section>



            {/* 2. QUICK IDENTITY BLOCK */}
            <section className="section-identity grid" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <h2 className="section-title">Not a production house. A creator collective.</h2>
                <p className="p2" style={{ maxWidth: '800px', margin: '20px auto' }}>
                    JUJU partners with India’s best storytellers to build original IP, funded by brands that believe in culture over clutter.
                </p>
            </section>

            {/* 3. WHAT WE MAKE */}
            <section className="section-what-we-make grid" style={{ padding: '40px 20px' }}>
                <div className="grid subgrid">
                    <div className="card-item">
                        <h3>Micro-Dramas</h3>
                        <p>Short, bingeable emotional stories designed for today’s attention spans.</p>
                    </div>
                    <div className="card-item">
                        <h3>Original Series & Films</h3>
                        <p>Limited series and features with long shelf life and strong cultural recall.</p>
                    </div>
                    <div className="card-item">
                        <h3>Brand-Enabled Content</h3>
                        <p>Stories where the brand lives inside the world—silently, authentically.</p>
                    </div>
                    <div className="card-item">
                        <h3>AI-Powered Storytelling</h3>
                        <p>Faster creation, regional scale, future-ready formats.</p>
                    </div>
                </div>
            </section>

            {/* 4. HOW JUJU WORKS */}
            <section className="section-how-it-works grid" style={{ padding: '60px 20px', background: '#111', color: '#fff' }}>
                <h2 className="section-title">How JUJU Works</h2>
                <div className="grid subgrid steps-container" style={{ marginTop: '40px' }}>
                    <div className="step-item">
                        <h4>Partner, don’t hire</h4>
                        <p>We collaborate with top creators as co-owners.</p>
                    </div>
                    <div className="step-item">
                        <h4>Story comes first</h4>
                        <p>No forced messaging. No logo-first thinking.</p>
                    </div>
                    <div className="step-item">
                        <h4>Brands fund, not control</h4>
                        <p>Creative integrity stays protected.</p>
                    </div>
                    <div className="step-item">
                        <h4>Built to scale</h4>
                        <p>One IP. Multiple formats. Multiple languages.</p>
                    </div>
                </div>
            </section>

            {/* 5. FEATURED IP (Premium Layout) */}
            <section className="section-works-homepage grid" style={{ padding: '60px 20px', background: '#fff' }}>
                <div className="header-content" style={{ gridColumn: '1 / -1', marginBottom: '40px' }}>
                    <h2 className="section-title">Featured IP</h2>
                </div>
                <div className="grid subgrid work-gallery" style={{ gridColumn: '1 / -1', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div className="work-card" style={{ flex: '1', minWidth: '300px', position: 'relative', cursor: 'pointer' }}>
                        <div className="media" style={{ overflow: 'hidden', borderRadius: '8px' }}>
                            <img src="/local_assets/wp-content/uploads/2025/09/01_concarneau-logo-cover-2-1-2560x1583.webp" alt="Featured Work" style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.5s' }} />
                        </div>
                        <div className="work-info" style={{ marginTop: '15px' }}>
                            <span style={{ color: '#E52323', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem' }}>Series</span>
                            <h3 style={{ fontSize: '1.5rem', marginTop: '5px' }}>Concarneau</h3>
                        </div>
                    </div>
                    <div className="work-card" style={{ flex: '1', minWidth: '300px', position: 'relative', cursor: 'pointer' }}>
                        <div className="media" style={{ overflow: 'hidden', borderRadius: '8px' }}>
                            <img src="/local_assets/wp-content/uploads/2025/10/carre-baudouin-case-study-202507162-2560x1312.webp" alt="Featured Work" style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.5s' }} />
                        </div>
                        <div className="work-info" style={{ marginTop: '15px' }}>
                            <span style={{ color: '#E52323', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem' }}>Micro-Drama</span>
                            <h3 style={{ fontSize: '1.5rem', marginTop: '5px' }}>Carré Baudouin</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. WHY BRANDS CHOOSE JUJU (Dark Theme) */}
            <section className="section-why-choose grid" style={{ padding: '80px 20px', background: '#000', color: '#fff' }}>
                <h2 className="section-title" style={{ borderBottom: '2px solid #E52323', paddingBottom: '20px', display: 'inline-block' }}>Why Brands Choose JUJU</h2>
                <ul className="grid subgrid bullet-list" style={{ listStyle: 'none', marginTop: '50px', gap: '30px' }}>
                    <li className="bullet-item" style={{ background: '#1a1a1a', border: '1px solid #333', color: '#fff' }}>
                        <span style={{ color: '#E52323', fontSize: '1.2rem', marginRight: '10px' }}>01.</span>
                        High attention, not high frequency
                    </li>
                    <li className="bullet-item" style={{ background: '#1a1a1a', border: '1px solid #333', color: '#fff' }}>
                        <span style={{ color: '#E52323', fontSize: '1.2rem', marginRight: '10px' }}>02.</span>
                        Cultural presence, not placement
                    </li>
                    <li className="bullet-item" style={{ background: '#1a1a1a', border: '1px solid #333', color: '#fff' }}>
                        <span style={{ color: '#E52323', fontSize: '1.2rem', marginRight: '10px' }}>03.</span>
                        OTT + Shorts + Reels ecosystem
                    </li>
                    <li className="bullet-item" style={{ background: '#1a1a1a', border: '1px solid #333', color: '#fff' }}>
                        <span style={{ color: '#E52323', fontSize: '1.2rem', marginRight: '10px' }}>04.</span>
                        Long-term recall over short-term impressions
                    </li>
                </ul>
                <p className="p2" style={{ marginTop: '50px', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center', color: '#ccc' }}>
                    "If the brand disappears from the story and it still works—that’s success."
                </p>
            </section>

            {/* 7. JUJU AI LAB */}
            <section className="section-ai-lab grid" style={{ padding: '60px 20px', background: '#f5f5f5', color: '#000' }}>
                <h2 className="section-title">JUJU AI Lab</h2>
                <p className="p2">At JUJU, AI doesn’t replace emotion—it removes friction.</p>
                <div className="grid subgrid icons-grid" style={{ marginTop: '30px' }}>
                    <div>Script exploration</div>
                    <div>Pre-visualisation</div>
                    <div>Regional adaptations</div>
                    <div>Speed without soul loss</div>
                </div>
            </section>

            {/* 8. FOR BRANDS / FOR CREATORS (SPLIT) */}
            <section className="section-split grid">
                <div className="split-left" style={{ padding: '60px 20px', background: '#000', color: '#fff' }}>
                    <h3>For Brands</h3>
                    <p>Fund original IP. Become part of culture.</p>
                    <Link to="/contact" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>→ Work with JUJU</Link>
                </div>
                <div className="split-right" style={{ padding: '60px 20px', background: '#E52323', color: '#fff' }}>
                    <h3>For Creators</h3>
                    <p>Partner on stories. Own what you build.</p>
                    <Link to="/contact" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block', background: '#fff', color: '#E52323' }}>→ Become a JUJU Partner</Link>
                </div>
            </section>

            {/* 9. PHILOSOPHY STRIP */}
            <section className="section-philosophy" style={{ padding: '80px 20px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem' }}>If it feels safe, it’s probably wrong.</h2>
            </section>
        </div>
    );
};

export default Home;
