import React, { useState } from 'react';
import Link from 'next/link';
import ImageTicker from '../common/ImageTicker';
import { storytellersImages as tickerImages } from '../../assets/imageTiker';
const juju_about = '/assets/juju-about.mp4';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '24px 0' }}>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                style={{ 
                    width: '100%', 
                    background: 'none', 
                    border: 'none', 
                    textAlign: 'left', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    cursor: 'pointer', 
                    padding: 0 
                }}
            >
                <h4 style={{ fontSize: '20px', fontWeight: '400', margin: 0, color: '#111', fontFamily: 'inherit', pr: '20px' }}>{question}</h4>
                <span style={{ 
                    fontSize: '24px', 
                    color: '#FF2B2B', 
                    transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)', 
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' 
                }}>+</span>
            </button>
            <div style={{ 
                maxHeight: isOpen ? '300px' : '0', 
                overflow: 'hidden', 
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                marginTop: isOpen ? '16px' : '0',
                opacity: isOpen ? 1 : 0
            }}>
                <p style={{ fontSize: '16px', color: '#555', margin: 0, lineHeight: '1.6', fontFamily: 'Georgia, serif' }}>{answer}</p>
            </div>
        </div>
    );
};

const VMDRichContent = () => {
    const corePillars = [
        {
            title: "Characters worth following",
            desc: "Relatable, flawed, and compelling protagonists who grab focus immediately."
        },
        {
            title: "Tension that keeps building",
            desc: "Escalating stakes and emotional friction in every episode."
        },
        {
            title: "Questions that remain unanswered",
            desc: "Carefully calibrated curiosity gaps that drive viewers to click the next episode."
        },
        {
            title: "Emotional momentum",
            desc: "Climax and cliffhanger logic designed to make continuation feel impossible to ignore."
        }
    ];

    const narrativeWorks = [
        {
            title: "Hawa Badlo",
            desc: "A large-scale storytelling initiative built around behaviour change, public participation, and emotional engagement.",
            insight: "This kind of work strengthens understanding of how stories can shift behaviour, not just generate visibility."
        },
        {
            title: "Air Seller",
            desc: "A narrative-led social experiment that transformed awareness into conversation through a simple but powerful story.",
            insight: "It demonstrates how a strong narrative premise can create public attention and discussion without relying on heavy messaging."
        },
        {
            title: "Time Bomb",
            desc: "A campaign built around anticipation, tension, and emotional payoff.",
            insight: "This is the same structural logic that powers successful VMD cliffhangers and episode-to-episode continuation."
        },
        {
            title: "Fikar Not",
            desc: "A character-led branded entertainment property that used recurring storytelling to build brand recall.",
            insight: "It shows how recurring characters and familiarity can make branded storytelling more memorable than one-off campaigns."
        },
        {
            title: "Yeh Pucca Hai",
            desc: "A narrative campaign demonstrating how character-first communication can outperform product-first messaging.",
            insight: "It reinforces the idea that audiences respond more deeply to stories than to direct explanation."
        },
        {
            title: "World's Strongest Kitchens",
            desc: "A storytelling-led campaign built around aspiration, emotion, and audience connection.",
            insight: "It highlights how narrative framing can elevate a campaign beyond utility and into emotional association."
        }
    ];

    const audiences = [
        { title: "Brands", desc: "Build stronger audience relationships through story-driven content rather than traditional advertising." },
        { title: "OTT Platforms", desc: "Expand content libraries with highly consumable episodic formats designed for mobile audiences." },
        { title: "Publishers & Media", desc: "Increase repeat visits and audience retention through serialised storytelling." },
        { title: "Startups", desc: "Explain products, behaviours, and complex ideas through narrative instead of direct promotion." },
        { title: "Creators & IP Owners", desc: "Develop original story worlds and monetisable content properties across multiple platforms." },
        { title: "Social Impact Groups", desc: "Drive awareness and behaviour change using storytelling rather than awareness campaigns alone." }
    ];

    const services = [
        {
            title: "Concept Development",
            desc: "Original concepts, story worlds, character journeys, and season architecture. This is where the narrative logic of the series is built, including what makes the audience curious enough to return.",
            subText: "A strong concept does more than sound interesting. It creates a story system capable of sustaining multiple episodes without losing momentum."
        },
        {
            title: "Scriptwriting",
            desc: "Episode design, narrative pacing, cliffhanger construction, and retention-focused storytelling. Scriptwriting for VMD is not simply shorter writing. It is a different narrative discipline shaped by mobile behaviour and continuation logic.",
            subText: "Every episode has to do precise work: deepen character, escalate stakes, and create a reason to keep watching."
        },
        {
            title: "Casting & Pre-Production",
            desc: "Talent discovery, character styling, locations, production planning, and scheduling. In VMD, casting and preparation influence retention as much as visual quality because character believability and clarity matter immediately.",
            subText: "The pre-production process is where narrative ambition is aligned with practical production realities."
        },
        {
            title: "Vertical Production (9:16)",
            desc: "Purpose-built 9:16 production designed specifically for mobile consumption. Framing, pacing, performance, and visual composition are all approached with mobile viewing behaviour in mind rather than adapted from traditional horizontal formats.",
            subText: "We frame specifically for vertical displays, creating a natural and immersive experience for mobile users."
        },
        {
            title: "Post-Production",
            desc: "Editing, sound design, subtitles, motion graphics, pacing optimisation, and platform delivery. The post-production phase is where retention rhythm is sharpened and platform-specific viewing behaviour is accounted for.",
            subText: "Rhythm and pacing are optimized for mobile viewers' rapid evaluation loops."
        },
        {
            title: "Launch Support",
            desc: "Episode sequencing, release planning, and future-season recommendations. This helps the series move beyond production delivery into a smarter audience and distribution strategy.",
            subText: "Every service is designed to support one larger goal: creating a Vertical Micro Drama people choose to return to, not just content they happen to scroll past."
        }
    ];

    const faqs = [
        {
            question: "What is a Vertical Micro Drama?",
            answer: "A Vertical Micro Drama is a short-form episodic story designed specifically for mobile-first viewing, usually in a 9:16 format, with episodes structured around emotional hooks, cliffhangers, and audience retention. Unlike traditional short videos, it focuses on an ongoing narrative that encourages viewers to return for future episodes."
        },
        {
            question: "How long is a typical VMD episode?",
            answer: "Most episodes range from one to five minutes depending on platform, genre, and audience behaviour. Shorter runtimes often work well for discovery-led platforms, while longer episodes may suit more immersive mobile drama ecosystems."
        },
        {
            question: "How many episodes should a season have?",
            answer: "Most series launch between 8 and 30 episodes, although requirements vary significantly by objective and platform. A shorter season is ideal for testing character response and narrative momentum, while longer seasons build repeat-viewing habits."
        },
        {
            question: "Why are Vertical Micro Dramas growing so fast?",
            answer: "The growth is driven by changing content discovery habits. Audiences increasingly discover stories through platforms such as Instagram Reels, YouTube Shorts, and dedicated drama apps. They combine the accessibility of short-form content with the emotional engagement of long-form storytelling."
        },
        {
            question: "Can brands create their own VMD series?",
            answer: "Yes. Many brands now use Vertical Micro Dramas to create deeper engagement than conventional advertising. Instead of interrupting audiences with promotional messages, brands become part of stories people actively choose to follow, building stronger recall."
        },
        {
            question: "Can VMDs be produced in regional languages?",
            answer: "Absolutely. VMDs can be created across multiple Indian languages and multilingual formats. This makes the format especially relevant in India, where language can significantly shape audience connection and retention."
        },
        {
            question: "Can JUJU handle the entire production process?",
            answer: "Yes. JUJU provides end-to-end services, including concept development, scripting, casting, production, post-production, and launch support. This keeps the storytelling intent completely consistent throughout the entire process."
        }
    ];

    const relatedFormats = [
        "Vertical web series",
        "Short-form episodic storytelling",
        "Branded entertainment",
        "Mobile-first drama series",
        "Micro-series production",
        "Episodic branded content",
        "Social-first storytelling formats"
    ];

    const platforms = [
        "Instagram Reels",
        "YouTube Shorts",
        "Mobile entertainment platforms",
        "Emerging micro-drama applications",
        "OTT short-form experiences",
        "Creator-led networks",
        "Brand-owned channels"
    ];

    return (
        <div className="vmd-detailed-content" style={{ marginTop: 0, paddingBottom: '80px' }}>
            
            {/* Intro Section (Light) */}
            <section className="section grid reveal-on-scroll intro-section" style={{ display: 'grid', marginBottom: '100px' }}>
                <div className="intro-text-column" style={{ gridColumn: '5 / 13' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: '400', color: '#FF2B2B', lineHeight: '1.2', marginBottom: '24px' }}>
                        The rise of Vertical Micro Dramas is not just a content trend. It is a behaviour trend.
                    </h2>
                    <p style={{ fontSize: '22px', lineHeight: '1.6', fontWeight: '300', marginBottom: '30px', color: '#333', fontFamily: 'Georgia, serif' }}>
                        Audiences increasingly discover stories through platforms built around short-form viewing. Instagram Reels, YouTube Shorts, mobile entertainment platforms, and emerging drama apps have changed how stories begin and how quickly they must earn attention.
                    </p>
                    <p style={{ fontSize: '20px', lineHeight: '1.6', fontWeight: '300', marginBottom: '30px', color: '#555', fontFamily: 'Georgia, serif' }}>
                        The creators who succeed are not necessarily producing shorter content. They are producing stories that make people curious enough to continue. VMDs combine the accessibility of short-form content with the emotional engagement of episodic entertainment.
                    </p>
                    <p style={{ fontSize: '20px', lineHeight: '1.6', fontWeight: '300', color: '#555', fontFamily: 'Georgia, serif' }}>
                        For brands, platforms, publishers, and creators, that creates a rare opportunity to build audience loyalty through narrative rather than interruption.
                    </p>
                </div>
            </section>

            {/* Why JUJU (Light Grid) */}
            <section className="section reveal-on-scroll pillars-section" style={{ marginBottom: '100px' }}>
                <div className="grid pillars-grid-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', borderTop: '1px solid #333', paddingTop: '60px', paddingBottom: '60px' }}>
                    <div className="pillar-title-col" style={{ gridColumn: '1 / 5' }}>
                        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FF2B2B', margin: 0 }}>The Discipline</h2>
                        <h3 style={{ fontSize: '42px', fontWeight: '300', marginTop: '20px', lineHeight: '1.1', color: '#111' }}>Why JUJU for Vertical Micro Dramas?</h3>
                    </div>
                    <div className="pillar-content-col" style={{ gridColumn: '6 / 13' }}>
                        <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#333', marginBottom: '30px', fontFamily: 'Georgia, serif', fontWeight: '300' }}>
                            JUJU approaches Vertical Micro Dramas as a storytelling discipline, not just a production format. 
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '24px', fontFamily: 'Georgia, serif' }}>
                            Many VMD projects fail before production begins because of weak story architecture. At JUJU, narrative design comes first. Character investment, escalation, cliffhanger logic, emotional payoff, and continuation behaviour are built before production scales up.
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', fontFamily: 'Georgia, serif' }}>
                            For brands and platforms, this creates a more commercially useful outcome: a Vertical Micro Drama designed not only to launch, but to retain attention, support recall, and justify future expansion.
                        </p>
                    </div>
                </div>
            </section>

            {/* Ticker */}
            <ImageTicker images={tickerImages} speed={0.8} />

            {/* Core Principles (Dark Background) */}
            <section className="section reveal-on-scroll logic-section" style={{ backgroundColor: '#111', padding: '100px 0', marginBottom: '100px', color: '#fff' }}>
                <div className="grid">
                    <div className="logic-title-col" style={{ gridColumn: '1 / 5' }}>
                        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FF2B2B' }}>Story Architecture</h2>
                        <h3 style={{ fontSize: '42px', fontWeight: '300', marginTop: '20px', color: '#fff', lineHeight: '1.1' }}>Most VMDs Fail Before the Camera Starts Rolling</h3>
                        <p style={{ fontSize: '16px', color: '#aaa', marginTop: '30px', lineHeight: '1.6', fontFamily: 'Georgia, serif' }}>
                            A common misconception is that successful VMDs are created during production. They are not. Beautifully shot projects can still struggle to retain audiences. Relatively simple productions can generate remarkable engagement.
                        </p>
                    </div>
                    <div className="logic-content-col" style={{ gridColumn: '6 / 13' }}>
                        <h4 style={{ fontSize: '20px', fontWeight: '400', color: '#fff', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                            The strongest VMDs usually share four core fundamentals:
                        </h4>
                        <div className="principles-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 20px' }}>
                            {corePillars.map((pillar, index) => (
                                <div key={index}>
                                    <h5 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '10px', color: '#FF2B2B', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '600' }}>0{index + 1}.</span>
                                        {pillar.title}
                                    </h5>
                                    <p style={{ fontSize: '15px', color: '#ccc', lineHeight: '1.6', margin: 0, fontFamily: 'Georgia, serif' }}>{pillar.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p style={{ fontSize: '15px', color: '#aaa', marginTop: '40px', borderTop: '1px solid #333', paddingTop: '30px', fontFamily: 'Georgia, serif' }}>
                            Most retention problems begin long before filming starts. That is why the process begins with story design before cameras, locations, or production schedules enter the conversation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Storytelling Matters (Light) */}
            <section className="section grid reveal-on-scroll intro-section" style={{ display: 'grid', marginBottom: '100px' }}>
                <div className="intro-text-column" style={{ gridColumn: '5 / 13', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: '300', color: '#111', marginBottom: '24px' }}>
                        Why Storytelling Matters More Than Production
                    </h2>
                    <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#333', fontFamily: 'Georgia, serif', marginBottom: '20px' }}>
                        Production quality can attract attention. Storytelling creates loyalty. 
                    </p>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', fontFamily: 'Georgia, serif', marginBottom: '20px' }}>
                        By the time a project reaches the edit suite, many audience retention decisions have already been made. They were made during concept development, character creation, scriptwriting, and the decision about what question remains unanswered at the end of every episode.
                    </p>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', fontFamily: 'Georgia, serif' }}>
                        This is where many VMD projects succeed or fail. The strongest series are engineered for audience retention long before they are filmed. At JUJU, narrative architecture comes first. Everything else supports it.
                    </p>
                </div>
            </section>

            {/* Ad vs Storytelling Highlight */}
            <section className="section grid reveal-on-scroll intro-section" style={{ display: 'grid', marginBottom: '100px' }}>
                <div className="intro-text-column" style={{ gridColumn: '5 / 13', padding: '40px', backgroundColor: 'rgba(229, 35, 35, 0.03)', borderLeft: '4px solid #FF2B2B' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: '400', color: '#FF2B2B', margin: '0 0 15px 0' }}>
                        A Vertical Micro Drama Is Not A Short Advertisement
                    </h3>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', fontFamily: 'Georgia, serif', margin: '0 0 15px 0' }}>
                        One of the biggest mistakes brands make when entering the VMD space is treating the format like a shorter version of traditional advertising. Audiences don't experience Vertical Micro Dramas as ads. They experience them as stories.
                    </p>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', fontFamily: 'Georgia, serif', margin: 0 }}>
                        The moment the message becomes more important than the narrative, retention usually starts to fall. The strongest branded VMDs don't interrupt the story to communicate a message. They allow the message to emerge naturally through character, conflict, and emotional payoff.
                    </p>
                </div>
            </section>

            {/* Narrative Heritage / Projects */}
            <section className="section reveal-on-scroll pillars-section" style={{ marginBottom: '100px' }}>
                <div className="grid">
                    <div className="pillar-title-col" style={{ gridColumn: '1 / 5' }}>
                        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FF2B2B' }}>Narrative Heritage</h2>
                        <h3 style={{ fontSize: '42px', fontWeight: '300', marginTop: '20px', lineHeight: '1.1', color: '#111' }}>Narrative Work That Prepared JUJU for VMDs</h3>
                        <p style={{ fontSize: '16px', color: '#555', marginTop: '30px', lineHeight: '1.6', fontFamily: 'Georgia, serif' }}>
                            Long before Vertical Micro Dramas became a recognised category, JUJU was already solving the same underlying challenge: how do you make people care enough to stay? Our experience across advertising, branded entertainment, and episodic storytelling has built a deep understanding of what keeps audiences emotionally engaged.
                        </p>
                    </div>
                    <div className="pillar-content-col narrative-heritage-grid" style={{ gridColumn: '6 / 13', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        {narrativeWorks.map((work, idx) => (
                            <div key={idx} style={{ 
                                padding: '30px', 
                                border: '1px solid rgba(0,0,0,0.06)', 
                                backgroundColor: 'rgba(0,0,0,0.01)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px'
                            }}>
                                <h4 style={{ fontSize: '20px', fontWeight: '500', color: '#111', margin: 0 }}>{work.title}</h4>
                                <p style={{ fontSize: '15px', color: '#555', margin: 0, fontFamily: 'Georgia, serif', lineHeight: '1.5' }}>{work.desc}</p>
                                <p style={{ fontSize: '13px', color: '#FF2B2B', margin: 0, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Insight: <span style={{ color: '#555', textTransform: 'none', fontWeight: 'normal', fontFamily: 'Georgia, serif' }}>{work.insight}</span>
                                </p>
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
                            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FF2B2B', marginBottom: '20px' }}>Target Scope</h2>
                            <h3 style={{ fontSize: '48px', fontWeight: '300', lineHeight: '1.1' }}>Who should consider VMD Production?</h3>
                        </div>
                        <div className="who-built-content-col" style={{ gridColumn: '6 / 13' }}>
                            <div style={{ display: 'grid', gap: '15px' }}>
                                {audiences.map((item, idx) => (
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
                                        <p style={{ fontSize: '16px', color: '#555', margin: 0, paddingLeft: '33px', fontFamily: 'Georgia, serif' }}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services (Pillars) */}
            <section className="section reveal-on-scroll pillars-section" style={{ marginBottom: '100px' }}>
                <div className="grid">
                    <div style={{ gridColumn: '1 / 13', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FF2B2B', marginBottom: '20px' }}>Production Pipeline</h2>
                        <h3 style={{ fontSize: '48px', fontWeight: '300', lineHeight: '1.1', color: '#111' }}>Vertical Micro Drama Production Services</h3>
                    </div>
                    <div className="pillars-container" style={{ gridColumn: '1 / 13' }}>
                        {services.map((pillar, index) => (
                            <div className="pillar-item" key={index} style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(12, 1fr)',
                                gap: '20px',
                                padding: '60px 0',
                                borderTop: '1px solid #e0e0e0',
                                color: '#111'
                            }}>
                                <div className="pillar-title-col" style={{ gridColumn: '1 / 5' }}>
                                    <h3 style={{ fontSize: '28px', fontWeight: '400', lineHeight: '1.2', color: '#111' }}>{pillar.title}</h3>
                                </div>
                                <div className="pillar-content-col" style={{ gridColumn: '6 / 13' }}>
                                    <p style={{ fontSize: '17px', color: '#333', marginBottom: '20px', fontFamily: 'Georgia, serif', lineHeight: '1.6' }}>{pillar.desc}</p>
                                    <p style={{ fontSize: '14px', color: '#666', margin: 0, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{pillar.subText}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Costs & Budgets (Dark) */}
            <section className="section reveal-on-scroll logic-section" style={{ backgroundColor: '#111', padding: '100px 0', marginBottom: '100px', color: '#fff' }}>
                <div className="grid">
                    <div className="logic-title-col" style={{ gridColumn: '1 / 5' }}>
                        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FF2B2B' }}>Budgets & Costing</h2>
                        <h3 style={{ fontSize: '42px', fontWeight: '300', marginTop: '20px', color: '#fff', lineHeight: '1.1' }}>How Much Does VMD Production Cost?</h3>
                        <p style={{ fontSize: '16px', color: '#ccc', marginTop: '30px', lineHeight: '1.6', fontFamily: 'Georgia, serif' }}>
                            The answer depends less on the format and more on the ambition of the story. Most projects do not begin with a full-scale season. Pilot formats are often used first to validate audience response before larger investments are made.
                        </p>
                    </div>
                    <div className="logic-content-col" style={{ gridColumn: '6 / 13' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '20px', color: '#FF2B2B' }}>Production budgets are influenced by:</h4>
                        <ul className="costs-points-list" style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 30px', marginBottom: '40px' }}>
                            {["Number of episodes", "Episode duration", "Cast size & talent requirements", "Number of shoot locations", "Production complexity", "Language adaptations", "Visual effects & post-production"].map((point, idx) => (
                                <li key={idx} style={{
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    color: '#eee'
                                }}>
                                    <span style={{ width: '6px', height: '6px', backgroundColor: '#FF2B2B', borderRadius: '50%' }}></span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <p style={{ fontSize: '16px', color: '#ccc', fontFamily: 'Georgia, serif', lineHeight: '1.6', borderTop: '1px solid #333', paddingTop: '30px' }}>
                            A simple pilot season built around a strong story can often outperform a much larger production budget. That is why narrative strategy comes first and production scale comes second. Most successful Vertical Micro Drama projects begin with a pilot season, audience validation, and then expansion into larger episodic properties.
                        </p>
                    </div>
                </div>
            </section>

            {/* Related Formats & Platforms (Light) */}
            <section className="section reveal-on-scroll pillars-section" style={{ marginBottom: '100px' }}>
                <div className="grid">
                    <div className="pillar-title-col related-formats-col" style={{ gridColumn: '1 / 6', borderRight: '1px solid #e0e0e0', paddingRight: '40px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '400', color: '#111', marginBottom: '20px' }}>Related Storytelling Formats</h3>
                        <p style={{ fontSize: '15px', color: '#555', fontFamily: 'Georgia, serif', lineHeight: '1.6', marginBottom: '30px' }}>
                            Vertical Micro Dramas often sit alongside related storytelling formats. These formats are not identical, but they overlap in audience behaviour, retention strategy, and platform logic:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
                            {relatedFormats.map((item, idx) => (
                                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#333' }}>
                                    <span style={{ width: '5px', height: '5px', backgroundColor: '#FF2B2B', borderRadius: '50%' }}></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="pillar-content-col related-platforms-col" style={{ gridColumn: '7 / 13', paddingLeft: '20px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '400', color: '#111', marginBottom: '20px' }}>Platforms We Create For</h3>
                        <p style={{ fontSize: '15px', color: '#555', fontFamily: 'Georgia, serif', lineHeight: '1.6', marginBottom: '30px' }}>
                            Vertical storytelling now exists across a wide range of ecosystems. Every platform rewards slightly different audience behaviour, which is why adaptation matters almost as much as production quality:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
                            {platforms.map((item, idx) => (
                                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#333' }}>
                                    <span style={{ width: '5px', height: '5px', backgroundColor: '#FF2B2B', borderRadius: '50%' }}></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Production Process (Light) */}
            <section className="section reveal-on-scroll pillars-section" style={{ marginBottom: '100px' }}>
                <div className="grid">
                    <div className="pillar-title-col" style={{ gridColumn: '1 / 13', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FF2B2B', marginBottom: '20px' }}>Work Workflow</h2>
                        <h3 style={{ fontSize: '48px', fontWeight: '300', lineHeight: '1.1', color: '#111' }}>Our Production Process</h3>
                    </div>
                    <div className="pillar-content-col process-steps-grid" style={{ gridColumn: '1 / 13', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px' }}>
                        {[
                            { name: "Discovery", desc: "Understanding audiences, objectives, platforms, and creative opportunities." },
                            { name: "Story Development", desc: "Building concepts, characters, episode structures, and season frameworks." },
                            { name: "Pre-Production", desc: "Casting, locations, planning, logistics, and approvals." },
                            { name: "Production", desc: "Capturing content specifically designed for vertical viewing." },
                            { name: "Post-Production", desc: "Editing, optimisation, delivery, and platform preparation." },
                            { name: "Launch Planning", desc: "Publishing recommendations and future-season strategy." }
                        ].map((step, idx) => (
                            <div key={idx} style={{ borderTop: '2px solid #FF2B2B', paddingTop: '20px' }}>
                                <span style={{ color: '#FF2B2B', fontWeight: '700', fontSize: '12px' }}>STEP 0{idx + 1}</span>
                                <h4 style={{ fontSize: '18px', fontWeight: '400', color: '#111', margin: '10px 0 10px 0' }}>{step.name}</h4>
                                <p style={{ fontSize: '13px', color: '#555', margin: 0, fontFamily: 'Georgia, serif', lineHeight: '1.5' }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs Accordion */}
            <section className="section reveal-on-scroll pillars-section" style={{ marginBottom: '100px' }}>
                <div className="grid">
                    <div className="pillar-title-col" style={{ gridColumn: '1 / 5' }}>
                        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FF2B2B' }}>Answers</h2>
                        <h3 style={{ fontSize: '42px', fontWeight: '300', marginTop: '20px', lineHeight: '1.1', color: '#111' }}>Frequently Asked Questions</h3>
                    </div>
                    <div className="pillar-content-col" style={{ gridColumn: '6 / 13' }}>
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Office & CTA Section (Dark) */}
            <section className="section reveal-on-scroll cta-section" style={{ borderTop: '1px solid #eee', paddingTop: '80px' }}>
                <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', alignItems: 'center', gap: '40px' }}>
                    <div className="cta-image-col" style={{ gridColumn: '1 / 7' }}>
                        <div className="office-image-container" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
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
                        <h2 style={{ fontSize: '56px', fontWeight: '300', marginBottom: '20px', lineHeight: '1.1', color: '#111' }}>
                            Let's Build <br />
                            <span style={{ color: '#FF2B2B' }}>Something Real.</span>
                        </h2>
                        <p style={{ fontSize: '18px', color: '#444', marginBottom: '30px', fontWeight: '500', fontFamily: 'Georgia, serif' }}>
                            Ready to develop a habit-forming storytelling format for your brand? JUJU is a Delhi NCR and Mumbai-based Vertical Micro Drama Production House in India. Let's collaborate.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'flex-start' }}>
                            <Link
                                href="/contact?tab=organic_website"
                                className="hover-scale"
                                style={{
                                    display: 'inline-block',
                                    padding: '18px 40px',
                                    backgroundColor: '#FF2B2B',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontSize: '15px',
                                    fontWeight: '600'
                                }}
                            >
                                Book a Discovery Call
                            </Link>
                            <Link
                                href="/start-project"
                                style={{
                                    display: 'inline-block',
                                    color: '#FF2B2B',
                                    textDecoration: 'none',
                                    borderBottom: '1.5px solid #FF2B2B',
                                    fontSize: '15px',
                                    fontWeight: '500',
                                    marginTop: '5px'
                                }}
                            >
                                Request Costing and Timelines →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VMDRichContent;
