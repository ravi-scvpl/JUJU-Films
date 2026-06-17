import React from 'react';
import Link from 'next/link';
import ImageTicker from '../common/ImageTicker';
import { storytellersImages as tickerImages } from '../../assets/imageTiker';
const juju_storytelling = '/assets/juju_storytelling.mp4';
const juju_about = '/assets/juju-about.mp4';

const StorytellersDetailedContent = () => {
    const pillars = [
        {
            title: "Web Series Production for Brands & Platforms",
            desc: "As a new-age web series production company, JUJU develops and produces original scripted and branded web series that prioritise strong narrative arcs, cultural relevance, and audience retention with Brand integration without interruption. ",
            desc2: "Brands don’t appear as sponsors. They act as enablers of the story.",
            points: [
                "Strong narrative arcs",
                "Cultural relevance",
                "Audience retention",
                "Organic distribution",

            ]

        },
        {
            title: "Vertical Micro Drama Series (Built for Mobile First)",
            desc: "The future of storytelling is vertical. We specialise in vertical format micro drama series — short episodic narratives designed for Instagram Reels, YouTube Shorts, and OTT short-form platforms. These aren’t “ads disguised as reels.” They’re bingeable emotional arcs that subtly carry brand presence.From 3-minute storytelling films to episodic digital narratives, we design content that audiences choose to watch — not scroll past.",
            points: [
                "High completion rates",
                "Repeat engagement",
                "Shareability",
                "Cultural stickiness"
            ]
        },
        {
            title: "Long-Form Social Media Videos",
            desc: "Beyond short attention spans lies deeper engagement. JUJU creates long-form social media video content that builds thought leadership, develops brand personality, and extends narrative universes.",
            points: [
                "Builds thought leadership",
                "Develops brand personality",
                "Extends narrative universes",
                "Supports brand-funded web IP"
            ]
        }
    ];

    const benefits = [
        { title: "Media becomes organic, not forced", desc: "Traditional campaigns expire. Cultural stories compound. When brands fund original stories, the media weight shifts from paid to earned." },
        { title: "Audiences accept the brand naturally", desc: "No more ad-blocking. When the brand is the enabler of the story, audiences welcome it into their digital ecosystem." },
        { title: "Recall builds subconsciously", desc: "Narrative immersion creates deeper memory structures than 30-second interruptive spots." },
        { title: "IP lives beyond campaign timelines", desc: "Your content stays relevant and discoverable long after the initial media push ends." }
    ];

    return (
        <div className="storytellers-detailed-content" style={{ marginTop: 0, paddingBottom: '80px' }}>

            {/* Intro Section */}
            <section className="section grid reveal-on-scroll intro-section" style={{ display: 'grid', marginBottom: '100px' }}>
                <div className="intro-text-column" style={{ gridColumn: '5 / 13' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: '400', color: '#FF2B2B' }}>
                        We build original stories brands can belong to.

                    </h2>
                    <p style={{ fontSize: '24px', lineHeight: '1.6', fontWeight: '300', marginBottom: '40px', color: '#333' }}>
                        JUJU Storytellers is a creator-led production collective specialising in <strong> web series production, vertical micro drama series, and long-form social media video content designed </strong> for modern audiences.
                    </p>
                    <p style={{ fontSize: '24px', lineHeight: '1.6', fontWeight: '300', marginBottom: '40px', color: '#333' }}>
                        We believe great web series and micro dramas don’t begin with a logo. They begin with human truth. We don’t create “content pieces.”
                        We build narrative IP that travels across OTT platforms, digital ecosystems, and social distribution.

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

            {/* Why Brand-Funded Section */}
            <section className="section reveal-on-scroll logic-section" style={{ backgroundColor: '#111', padding: '100px 0', marginBottom: '100px' }}>
                <div className="grid">
                    <div className="logic-title-col" style={{ gridColumn: '1 / 5' }}>
                        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FF2B2B' }}>The Logic</h2>
                        <h3 style={{ fontSize: '42px', fontWeight: '300', marginTop: '20px', color: '#fff' }}>Why Brand-Funded storytelling works</h3>
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

            {/* Video Section */}
            <section className="section reveal-on-scroll" style={{ marginBottom: '100px' }}>

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
                                    { title: "Brands", desc: "Looking to produce original web series and cultural IP." },
                                    { title: "Companies", desc: "Exploring vertical micro drama formats for mobile-first audiences." },
                                    { title: "OTT Platforms", desc: "Seeking branded original content with built-in distribution." },
                                    { title: "CMOs", desc: "Focused on long-term cultural equity over short-term clutter." },
                                    { title: "Founders", desc: "Wanting narrative-led brand positioning that compounds over time." }
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

            {/* Philosophy Placeholder */}


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
                            <span style={{ color: '#FF2B2B' }}>Your Story?</span>
                        </h2>
                        <p style={{ fontSize: '18px', color: '#444', marginBottom: '30px', fontWeight: '500' }}>
                            Explore Storytelling with JUJU.
                        </p>
                        <Link
                            href="/start-project?src=organic"
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
                            Start a Project
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default StorytellersDetailedContent;
