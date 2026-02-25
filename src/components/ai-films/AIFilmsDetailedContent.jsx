import React from 'react';
import { Link } from 'react-router-dom';

import aboutvideo from '../../assets/juju-about.mp4';

const AIFilmsDetailedContent = () => {

    const pillars = [
        {
            title: "AI-Powered Ad Film Production",
            desc: "As a next-generation AI video production company, JUJU builds high-quality films at controlled budgets — delivered faster. We blend AI technology with human craft to ensure consistency and creative excellence.",
            points: [
                "AI-generated commercials",
                "AI brand ads",
                "AI performance creatives",
                "AI-powered product films",
                "AI corporate videos"
            ]
        },
        {
            title: "AI Brand Ambassadors & Digital Spokespersons",
            desc: "Human ambassadors are powerful. Digital ones are scalable. We create digital brand characters and virtual influencers that allow brands to communicate consistently across regions and languages with full message control.",
            points: [
                "AI brand ambassadors",
                "AI spokesperson videos",
                "Digital brand characters",
                "Virtual influencers",
                "AI-powered leadership avatars"
            ]
        },
        {
            title: "AI Music, Voice & Multilingual Scale",
            desc: "Through AI-assisted tools, JUJU enables brands to deploy multiple ad variants without multiplying budgets. From voice-overs to real-time localisation, scale becomes practical and efficient.",
            points: [
                "AI voice-over generation",
                "Multi-language ad adaptation",
                "AI-generated background scores",
                "Real-time localisation",
                "Dynamic performance ad variations"
            ]
        },
        {
            title: "AI-Driven Brand IP Creation",
            desc: "AI isn’t just for ads. It’s for building worlds. We help brands create recurring digital assets and narrative universes that compound over time, building long-term value beyond single campaigns.",
            points: [
                "AI-powered web IP",
                "Digital characters",
                "Virtual storytelling universes",
                "Episodic AI content formats",
                "AI-based content engines"
            ]
        }
    ];

    const benefits = [
        { title: "Cost-controlled production", desc: "Reduce overheads without compromising on cinematic quality or brand standards." },
        { title: "Faster turnaround cycles", desc: "Go from concept to delivery in record time using AI-accelerated workflows." },
        { title: "Scalable regional deployment", desc: "Adapt and localise content across multiple languages and markets instantly." },
        { title: "Data-backed creative optimisation", desc: "Use AI to refine messaging and visual hooks for maximum performance." }
    ];

    return (
        <div className="ai-films-detailed-content" style={{ marginTop: 0, paddingBottom: '80px' }}>

            {/* Intro Section */}
            <section className="section grid reveal-on-scroll intro-section" style={{ display: 'grid', marginBottom: '100px' }}>
                <div className="intro-text-column" style={{ gridColumn: '5 / 13' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: '400', color: '#FF2B2B' }}>
                        The future of filmmaking isn’t human vs AI.
                    </h2>
                    <p style={{ fontSize: '24px', lineHeight: '1.6', fontWeight: '300', marginBottom: '40px', color: '#333' }}>
                        It’s human + AI. JUJU AI Films combines world-class creative talent with advanced AI tools and models.
                    </p>
                    <p style={{ fontSize: '24px', lineHeight: '1.6', fontWeight: '300', marginBottom: '40px', color: '#333' }}>
                        We produce AI-powered ads, brand films, and scalable brand IP — faster, smarter, and more cost-efficient. We don’t replace craft with technology. We multiply it.
                    </p>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="section reveal-on-scroll pillars-section" style={{ marginBottom: '100px' }}>
                <div className="grid">
                    <div className="pillars-container" style={{ gridColumn: '1 / 13' }}>
                        {pillars.map((pillar, index) => (
                            <div className="pillar-item" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(12, 1fr)',
                                gap: '20px',
                                padding: '60px 0',
                                borderTop: '1px solid #333',
                                color: '#fff'
                            }}>
                                <div className="pillar-title-col" style={{ gridColumn: '1 / 5' }}>
                                    <h3 style={{ fontSize: '32px', fontWeight: '300', lineHeight: '1.2', color: '#111' }}>{pillar.title}</h3>
                                </div>
                                <div className="pillar-content-col" style={{ gridColumn: '6 / 13' }}>
                                    <p style={{ fontSize: '18px', color: '#444', marginBottom: '30px' }}>{pillar.desc}</p>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        {pillar.points.map((point, idx) => (
                                            <li key={idx} style={{
                                                fontSize: '14px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                color: '#333'
                                            }}>
                                                <span style={{ width: '6px', height: '6px', backgroundColor: '#FF2B2B', borderRadius: '50%' }}></span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Logic Section */}
            <section className="section reveal-on-scroll logic-section" style={{ backgroundColor: '#111', padding: '100px 0', marginBottom: '100px' }}>
                <div className="grid">
                    <div className="logic-title-col" style={{ gridColumn: '1 / 5' }}>
                        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FF2B2B' }}>Why AI Films Work</h2>
                        <h3 style={{ fontSize: '42px', fontWeight: '300', marginTop: '20px', color: '#fff' }}>Strategic Advantage for Modern Brands</h3>
                    </div>
                    <div className="logic-content-col" style={{ gridColumn: '6 / 13', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 20px' }}>
                        {benefits.map((benefit, index) => (
                            <div key={index}>
                                <h4 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '10px', color: '#FF2B2B' }}>{benefit.title}</h4>
                                <p style={{ fontSize: '16px', color: '#ccc' }}>{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who It Is For */}
            <section className="section grid reveal-on-scroll who-built-section" style={{ marginBottom: '100px' }}>
                <div style={{ gridColumn: '1 / 13', paddingTop: '20px' }}>
                    <div className="who-built-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>
                        <div className="who-built-title-col" style={{ gridColumn: '1 / 5' }}>
                            <h2 style={{ fontSize: '48px', fontWeight: '300', lineHeight: '1.1' }}>Who this is built for.</h2>
                        </div>
                        <div className="who-built-content-col" style={{ gridColumn: '6 / 13' }}>
                            <div style={{ display: 'grid', gap: '15px' }}>
                                {[
                                    { title: "Growth-stage Brands", desc: "Scaling digital presence with performance-ready creative." },
                                    { title: "CMOs", desc: "Seeking cost-efficient production and faster turnaround cycles." },
                                    { title: "Companies", desc: "Building digital-first identities with advanced AI tools." },
                                    { title: "Brands", desc: "Wanting scalable AI spokesperson and digital ambassador solutions." },
                                    { title: "Enterprises", desc: "Expanding across regional and multilingual global markets." }
                                ].map((item, idx) => (
                                    <div key={idx} className="hover-scale" style={{
                                        padding: '30px',
                                        backgroundColor: 'rgba(0,0,0,0.02)',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                        cursor: 'default',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <span style={{ color: '#FF2B2B', fontWeight: '700', fontSize: '14px' }}>0{idx + 1}</span>
                                            <h4 style={{ fontSize: '20px', fontWeight: '400', color: '#111', margin: 0, textTransform: 'none' }}>{item.title}</h4>
                                        </div>
                                        <p style={{ fontSize: '16px', color: '#444', margin: 0, paddingLeft: '33px' }}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section reveal-on-scroll cta-section" style={{}}>
                <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', alignItems: 'center', gap: '40px' }}>
                    <div className="cta-image-col" style={{ gridColumn: '1 / 7' }}>
                        <div className="office-image-container" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                            <video
                                loop
                                muted
                                playsInline
                                autoPlay
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            >
                                <source src={aboutvideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                    <div className="cta-text-col" style={{ gridColumn: '8 / 13' }}>
                        <h2 style={{ fontSize: '56px', fontWeight: '300', marginBottom: '20px', lineHeight: '1.1' }}>
                            Ready to Build <br />
                            <span style={{ color: '#FF2B2B' }}>with AI?</span>
                        </h2>
                        <p style={{ fontSize: '18px', color: '#444', marginBottom: '30px', fontWeight: '500' }}>
                            JUJU AI Films is built to collaborate.
                        </p>
                        <Link
                            to="/start-project?src=organic"
                            className="hover-scale"
                            style={{
                                display: 'inline-block',
                                padding: '20px 50px',
                                backgroundColor: '#FF2B2B',
                                color: '#fff',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontSize: '16px',
                                fontWeight: '600'
                            }}
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AIFilmsDetailedContent;
