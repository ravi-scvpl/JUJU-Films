import React from 'react';
import { Link } from 'react-router-dom';
import ImageTicker from '../common/ImageTicker';
import { commercialsImages as tickerImages } from '../../assets/imageTiker';
import juju_commercials from '../../assets/juju-commercials.mp4';
import juju_about from '../../assets/juju-about.mp4';

const CommercialsDetailedContent = () => {

    const pillars = [
        {
            title: "Brand TVC Production",
            desc: "As a full-service TVC production company, JUJU creates brand positioning films, product launch TVCs, emotional storytelling ads, and corporate campaigns. We blend cinematic storytelling with brand strategy — ensuring your TVC builds long-term equity, not just short-term visibility.",
            points: [
                "Brand positioning films",
                "Product launch TVCs",
                "Emotional storytelling ads",
                "Corporate brand campaigns",
                "National & regional television commercials"
            ]
        },
        {
            title: "Digital Video Commercials (DVC)",
            desc: "Digital audiences behave differently. Your DVC should too. We create digital-first ad films optimised for YouTube, Meta, OTT platforms, and performance marketing funnels. Each DVC is built around clear brand recall architecture and platform-native pacing.",
            points: [
                "First 3-second hook strategy",
                "Silent-mode optimisation",
                "Platform-native pacing",
                "Clear brand recall architecture"
            ]
        },
        {
            title: "10-Second & 6-Second Bumper Ads",
            desc: "In high-frequency ecosystems, speed wins. JUJU specialises in 10-second high-impact ads and 6-second YouTube bumper ads. These formats are engineered for immediate brand recall and high retention in short attention windows.",
            points: [
                "10-second high-impact ads",
                "6-second YouTube bumper ads",
                "Non-skippable pre-roll formats",
                "Performance-first micro films"
            ]
        },
        {
            title: "Non-Skippable YouTube & Meta Performance Ads",
            desc: "Performance advertising is not just about targeting. It’s about creative intelligence. We build conversion-focused vertical video creatives and funnel-based creative testing frameworks where creative drives conversion.",
            points: [
                "Non-skippable YouTube ads",
                "Meta lead generation video ads",
                "Conversion-focused vertical video",
                "Hook → Message → Emotion → CTA"
            ]
        }
    ];

    const differences = [
        { title: "World-class production craft", desc: "Most ad films are built for approval. Ours are built for impact, combining high-end production with strategic intent." },
        { title: "Strategic brand positioning", desc: "We don't just film; we position. Every frame is designed to align with your brand's long-term equity." },
        { title: "Performance ad architecture", desc: "Designed for the funnel. We understand how to move users from attention to action." },
        { title: "Platform-native optimisation", desc: "Whether it's the first 3 seconds or silent-mode viewing, we build for where your audience lives." }
    ];

    return (
        <div className="commercials-detailed-content" style={{ marginTop: 0, paddingBottom: '80px' }}>

            {/* Intro Section */}
            <section className="section grid reveal-on-scroll intro-section" style={{ display: 'grid', marginBottom: '100px' }}>
                <div className="intro-text-column" style={{ gridColumn: '5 / 13' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: '400', color: '#FF2B2B' }}>
                        High-Impact Brand Films Built to Perform.
                    </h2>
                    <p style={{ fontSize: '24px', lineHeight: '1.6', fontWeight: '300', marginBottom: '40px', color: '#333' }}>
                        Attention is rented. Memory is earned. JUJU Commercials is a modern TVC and digital ad film production unit built for brands that want impact — not interruption.
                    </p>
                    <p style={{ fontSize: '24px', lineHeight: '1.6', fontWeight: '300', marginBottom: '40px', color: '#333' }}>
                        From cinematic brand TVCs to high-performance digital video commercials (DVCs), we design films that command attention across television, YouTube, Meta, OTT, and performance ecosystems.
                    </p>
                </div>
            </section>
            <ImageTicker images={tickerImages} speed={0.8} />

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

            {/* Difference Section */}
            <section className="section reveal-on-scroll difference-section" style={{ backgroundColor: '#111', padding: '100px 0', marginBottom: '100px' }}>
                <div className="grid">
                    <div className="difference-title-col" style={{ gridColumn: '1 / 5' }}>
                        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FF2B2B' }}>What Makes Us Different</h2>
                        <h3 style={{ fontSize: '42px', fontWeight: '300', marginTop: '20px', color: '#fff' }}>Built for Impact, Not Just Approval</h3>
                    </div>
                    <div className="difference-content-col" style={{ gridColumn: '6 / 13', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 20px' }}>
                        {differences.map((diff, index) => (
                            <div key={index}>
                                <h4 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '10px', color: '#FF2B2B' }}>{diff.title}</h4>
                                <p style={{ fontSize: '16px', color: '#ccc' }}>{diff.desc}</p>
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
                                    { title: "CMOs", desc: "Launching new campaigns across TV and digital ecosystems." },
                                    { title: "Brands", desc: "Seeking high-end TVC production partners with strategic depth." },
                                    { title: "Digital-first Companies", desc: "Needing high-performance DVCs and performance marketing assets." },
                                    { title: "Growth-stage Brands", desc: "Scaling Meta and YouTube ads with conversion-focused creative." },
                                    { title: "Corporates", desc: "Requiring high-impact brand films that command authority." }
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
                                onContextMenu={(e) => e.preventDefault()}
                                controlsList="nodownload"
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            >
                                <source src={juju_about} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                    <div className="cta-text-col" style={{ gridColumn: '8 / 13' }}>
                        <h2 style={{ fontSize: '56px', fontWeight: '300', marginBottom: '20px', lineHeight: '1.1' }}>
                            Ready to Build <br />
                            <span style={{ color: '#FF2B2B' }}>Your Next Commercial?</span>
                        </h2>
                        <p style={{ fontSize: '18px', color: '#444', marginBottom: '30px', fontWeight: '500' }}>
                            JUJU Commercials is built for scale and craft.
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

export default CommercialsDetailedContent;

