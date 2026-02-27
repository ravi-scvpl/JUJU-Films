import React from 'react';
import { Link } from 'react-router-dom';
import ImageTicker from '../common/ImageTicker';
import { ecosystemImages as tickerImages } from '../../assets/imageTiker';
import juju_about from '../../assets/juju-about.mp4';
import growth_content from '../../assets/growth_content.aep.mp4';

const EcosystemDetailedContent = () => {

    const pillars = [
        {
            title: "UGC Content Creation (Human + AI Powered)",
            desc: "User-generated content works because it feels real. But scale requires structure. JUJU designs UGC content systems that combine real creators with AI-assisted production and vertical-first storytelling.",
            points: [
                "Real creators",
                "AI-assisted production",
                "Vertical-first storytelling",
                "Performance ad optimisation",
                "Scalable content pipelines"
            ]
        },
        {
            title: "Influencer Marketing (Narrative-Driven)",
            desc: "Influence without narrative is noise. Instead of one-off posts, we build creator-led brand arcs that feel integrated, not transactional. We focus on strategic selection and format-specific storytelling.",
            points: [
                "Strategic creator selection",
                "Format-specific storytelling",
                "Multi-platform deployment",
                "Brand-message alignment",
                "Performance tracking"
            ]
        },
        {
            title: "Brand IP Creation",
            desc: "Campaigns end. IP stays. We help brands shift from advertiser to content producer by building recurring digital characters, signature storytelling formats, and owned digital universes.",
            points: [
                "Recurring digital characters",
                "Branded content series",
                "Signature storytelling formats",
                "Franchise-style episodic properties",
                "Owned digital universes"
            ]
        },
        {
            title: "Knowledge Series & Thought Leadership",
            desc: "Authority builds trust. We produce knowledge-based video series for founders, corporate leaders, and industry experts — designed for YouTube, LinkedIn, OTT, and digital ecosystems.",
            points: [
                "Interview formats",
                "Educational content series",
                "Leadership storytelling",
                "Industry insight episodes",
                "Learning-based branded content"
            ]
        },
        {
            title: "Edutainment & Entertainment Series",
            desc: "Modern audiences learn through stories. JUJU develops edutainment formats that combine value, entertainment, and brand philosophy to create deeper emotional engagement.",
            points: [
                "Edutainment video series",
                "Cultural storytelling formats",
                "Youth-focused narrative shows",
                "Branded entertainment properties",
                "Hybrid knowledge-entertainment"
            ]
        }
    ];

    const benefits = [
        { title: "Consistent Brand Voice", desc: "Align UGC, influencers, and IP to maintain a unified and powerful brand narrative." },
        { title: "Scalable Narratives", desc: "Build structured content engines that grow with your brand without increasing friction." },
        { title: "Reduced Media Dependency", desc: "Shift from paid visibility to earned attention through owned IP and organic reach." },
        { title: "Compounding Recall", desc: "Long-form properties and recurring characters build deeper memory structures over time." }
    ];

    return (
        <div className="ecosystem-detailed-content" style={{ marginTop: 0, paddingBottom: '80px' }}>

            {/* Intro Section */}
            <section className="section grid reveal-on-scroll intro-section" style={{ display: 'grid', marginBottom: '100px' }}>
                <div className="intro-text-column" style={{ gridColumn: '5 / 13' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: '400', color: '#FF2B2B' }}>
                        Brands today don’t need more posts. They need properties.
                    </h2>
                    <p style={{ fontSize: '24px', lineHeight: '1.6', fontWeight: '300', marginBottom: '40px', color: '#333' }}>
                        JUJU builds scalable brand ecosystems through UGC content, influencer collaborations, original IP creation, and narrative-led knowledge series — designed to compound attention over time.
                    </p>
                    <p style={{ fontSize: '24px', lineHeight: '1.6', fontWeight: '300', marginBottom: '40px', color: '#333' }}>
                        Beyond ads. Beyond campaigns. Built for cultural scale. We help brands move from rented visibility to owned authority.
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

            {/* Logic Section */}
            <section className="section reveal-on-scroll logic-section" style={{ backgroundColor: '#111', padding: '100px 0', marginBottom: '100px' }}>
                <div className="grid">
                    <div className="logic-title-col" style={{ gridColumn: '1 / 5' }}>
                        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FF2B2B' }}>Why This Works</h2>
                        <h3 style={{ fontSize: '42px', fontWeight: '300', marginTop: '20px', color: '#fff' }}>A Structured Content Engine</h3>
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
                                    { title: "Digital-first Brands", desc: "Building scalable content ecosystems for modern audiences." },
                                    { title: "CMOs", desc: "Seeking long-term cultural positioning over fragmented posts." },
                                    { title: "D2C Brands", desc: "Scaling content operations with structured UGC and IP." },
                                    { title: "B2B Companies", desc: "Building authority through thought leadership and knowledge series." },
                                    { title: "Founders", desc: "Investing in narrative equity and scalable brand arcs." }
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
                                <source src={juju_about} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                    <div className="cta-text-col" style={{ gridColumn: '8 / 13' }}>
                        <h2 style={{ fontSize: '56px', fontWeight: '300', marginBottom: '20px', lineHeight: '1.1' }}>
                            Build More Than <br />
                            <span style={{ color: '#FF2B2B' }}>Campaigns.</span>
                        </h2>
                        <p style={{ fontSize: '18px', color: '#444', marginBottom: '30px', fontWeight: '500' }}>
                            JUJU’s ecosystem is built to scale with you.
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

export default EcosystemDetailedContent;

