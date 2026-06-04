"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SEO from '../components/SEO';
import playbookData from '../assets/playbook_chapters.json';

const VMDPlaybook = () => {
    // Accordion State
    const [openFaq, setOpenFaq] = useState(null);
    const [activeSection, setActiveSection] = useState("overview-introduction");

    const toggleFaq = (index) => {
        if (openFaq === index) {
            setOpenFaq(null);
        } else {
            setOpenFaq(index);
        }
    };

    const chapters = playbookData.chapters;

    useEffect(() => {
        document.body.classList.add('switch');

        // Scroll reveal animation and active section highlighting
        const handleScroll = () => {
            const scrollPos = window.scrollY + 200;
            
            // Highlight active section in Table of Contents
            for (const ch of chapters) {
                const element = document.getElementById(ch.id);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        setActiveSection(ch.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            document.body.classList.remove('switch');
            window.removeEventListener('scroll', handleScroll);
        };
    }, [chapters]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    const faqItems = [
        {
            category: "Brand & Strategy",
            question: "When should a brand choose a Vertical Micro Drama instead of traditional advertising?",
            answer: "A Vertical Micro Drama is most effective when the goal is to build deeper engagement and repeat viewership rather than deliver a single, fast message. Traditional ads work best for quick, explicit communication; VMDs work best when a brand wants audiences to spend time with characters and return to a story over multiple episodes."
        },
        {
            category: "Brand & Strategy",
            question: "How is a Vertical Micro Drama different from branded content?",
            answer: "Most branded content is built around a message or a product, while a Vertical Micro Drama is built around a story. In a VMD, characters, relationships, and narrative progression come first, and the brand is woven into that world instead of dominating every scene."
        },
        {
            category: "Brand & Strategy",
            question: "Can Vertical Micro Dramas work in regional Indian languages?",
            answer: "Yes. Some of the strongest storytelling traditions in India exist in regional languages, and VMDs adapt naturally to those contexts. The format travels well across languages because the core drivers of engagement—curiosity, emotion, conflict, and character—are universal."
        },
        {
            category: "Brand & Strategy",
            question: "Which industries can benefit from Vertical Micro Dramas?",
            answer: "Any industry that relies on trust, education, emotional connection, or behaviour change can potentially benefit from narrative storytelling. Common applications include consumer brands, technology, finance, healthcare, education, entertainment, and social impact initiatives."
        },
        {
            category: "Brand & Strategy",
            question: "Who owns the intellectual property (IP) of a Vertical Micro Drama series?",
            answer: "IP ownership is defined in the initial agreement. Sometimes the commissioning brand owns the series outright; in other cases, creators or production partners retain rights and license the content. Clear contracts at the start of the project avoid confusion later."
        },
        {
            category: "Storytelling & Production",
            question: "Do Vertical Micro Dramas require professional actors?",
            answer: "Not necessarily. What matters most is believable performance and emotional truth on screen. Audiences respond more to authenticity and chemistry than to celebrity recognition alone."
        },
        {
            category: "Storytelling & Production",
            question: "What is a Story Bible in VMD production?",
            answer: "A Story Bible is a document that defines the characters, relationships, world rules, themes, and long-term narrative direction of a series. It helps maintain consistency across episodes and future seasons."
        },
        {
            category: "Storytelling & Production",
            question: "Can an existing brand campaign be adapted into a Vertical Micro Drama?",
            answer: "Yes. Many campaigns already contain the seeds of a story—a central tension, a setting, and recurring situations. By adding recurring characters, a season-level question, and episode-level progression, those ideas can often be restructured into a VMD format."
        },
        {
            category: "Storytelling & Production",
            question: "Which genres work best for VMD?",
            answer: "Drama, romance, slice-of-life, comedy, and light thriller formats tend to perform well because they naturally support character attachment and ongoing curiosity. The best genre is the one that fits both the audience and the brand’s comfort with tone."
        },
        {
            category: "Storytelling & Production",
            question: "What does a Vertical Micro Drama production process typically involve?",
            answer: "Most VMD productions move through concept development, story architecture, writing, pre-production, production, post-production, and distribution planning. The strongest projects invest significant time in story development before filming begins."
        },
        {
            category: "Platforms, Testing & Release",
            question: "Which platforms work best for Vertical Micro Dramas?",
            answer: "VMDs can run on Instagram Reels, YouTube Shorts, dedicated drama apps, OTT short-form sections, and brand-owned channels. The best platform is the one where your audience already discovers serial content and where following episodes feels natural."
        },
        {
            category: "Platforms, Testing & Release",
            question: "How often should Vertical Micro Drama episodes be released?",
            answer: "Consistency matters more than raw frequency. Whether you publish episodes daily, several times a week, or weekly, audiences are more likely to return when the release pattern is reliable and clearly communicated."
        },
        {
            category: "Platforms, Testing & Release",
            question: "Can a brand test a Vertical Micro Drama before committing to a larger series?",
            answer: "Yes. Many organisations start with a pilot season to test narrative, characters, and viewing behaviour. The results then inform whether to expand into additional episodes, seasons, or a broader story universe."
        },
        {
            category: "Platforms, Testing & Release",
            question: "How many episodes should a Vertical Micro Drama season have?",
            answer: "There is no fixed rule, but many pilot seasons sit between six and twelve episodes, with longer arcs extending to twenty or more. The length should be driven by how much story you truly have, not by an arbitrary episode target."
        },
        {
            category: "Platforms, Testing & Release",
            question: "How long does it take to create a Vertical Micro Drama series?",
            answer: "Timelines vary with scale, but most projects move through strategy, development, writing, pre-production, production, and editing before launch. A tightly scoped pilot season can be turned around relatively quickly; larger multi-season worlds take longer."
        },
        {
            category: "Budget, Measurement & Common Mistakes",
            question: "What budget is typically required for a Vertical Micro Drama project?",
            answer: "Budgets depend on cast, locations, episode count, visual ambition, and distribution plans. Most VMD projects are planned on a cost-per-episode model, which makes it easier to compare different season lengths and production scales."
        },
        {
            category: "Budget, Measurement & Common Mistakes",
            question: "Are views the most important metric for a Vertical Micro Drama?",
            answer: "No. Views measure reach, but they do not show whether people stayed or returned. Completion rate, return viewership, and season completion are better indicators of how effectively a VMD is holding attention over time."
        },
        {
            category: "Budget, Measurement & Common Mistakes",
            question: "How do you measure the success of a Vertical Micro Drama?",
            answer: "Success is typically evaluated through a combination of completion rates, return viewership, season completion, saves, shares, conversation, and other signals that show whether viewers are genuinely invested in the story."
        },
        {
            category: "Budget, Measurement & Common Mistakes",
            question: "How long does it take to know whether a VMD is working?",
            answer: "Early indicators often appear within the first episodes, especially through completion rates and return viewership. Meaningful evaluation usually requires enough episodes for audience behaviour patterns to emerge."
        },
        {
            category: "Budget, Measurement & Common Mistakes",
            question: "What is the biggest mistake brands make when creating a Vertical Micro Drama?",
            answer: "The most common mistake is treating a VMD like a sequence of advertisements instead of a story. When promotion takes priority over character, conflict, and payoff, audiences quickly recognise it and engagement usually declines."
        }
    ];

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch juju-page-container">
            <SEO
                title="Vertical Micro Drama (VMD) Playbook & Guide | JUJU"
                description="The complete Vertical Micro Drama playbook. Learn the storytelling principles, audience psychology, production workflows, and retention metrics driving the mobile-first video format."
            />
            
            <main id="content" role="main" className="content">
                {/* Immersive Header */}
                <div className="text reveal-on-scroll" style={{ margin: 0, paddingBottom: 20, paddingTop: 150 }}>
                    <div className="grid hero__content" style={{ paddingTop: 0, marginTop: 0 }}>
                        <p pos="row" pos-s="row" className="hero__title" style={{ fontSize: '20px', marginTop: 0, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#888' }}>
                            <span style={{ fontWeight: 'bold', color: '#e52323' }}>J</span>
                            <span style={{ fontWeight: 'bold', color: '#E9BC2D' }}>U</span>
                            <span style={{ fontWeight: 'bold', color: '#4CBF64' }}>J</span>
                            <span style={{ fontWeight: 'bold', color: '#52C3E1' }}>U</span> Playbook
                        </p>
                        <h1 pos="5-12" pos-s="row" className="hero__description" style={{ fontWeight: '300', fontSize: '56px', lineHeight: '1.15' }}>
                            <span>Vertical Micro Drama Guide: <br /><span style={{ color: '#E52323', fontWeight: 'bold' }}>The Complete Playbook</span></span>
                        </h1>
                    </div>
                </div>

                <div className="playbook-container">
                    <div className="playbook-grid">
                        
                        {/* Left Sticky Table of Contents */}
                        <aside className="playbook-sidebar">
                            <ul className="playbook-toc">
                                {chapters.map((ch) => (
                                    <li className="playbook-toc__item" key={ch.id}>
                                        <button 
                                            onClick={() => scrollToSection(ch.id)}
                                            className={`playbook-toc__link ${activeSection === ch.id ? 'active' : ''}`}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                                        >
                                            {ch.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </aside>

                        {/* Right Reading Pane */}
                        <article className="playbook-content text">
                            {chapters.map((ch) => {
                                // Special case for FAQs
                                if (ch.id === 'frequently-asked-questions-about-vertical-micro-dramas') {
                                    return (
                                        <section key={ch.id} id={ch.id} className="playbook-section reveal-on-scroll">
                                            <h2 className="playbook-section-title">Frequently Asked Questions</h2>
                                            <p className="playbook-text">
                                                Find answers to common questions about strategy, production, and measuring Vertical Micro Dramas:
                                            </p>
                                            
                                            <div className="accordion">
                                                {faqItems.map((faq, index) => (
                                                    <div className={`accordion__item ${openFaq === index ? 'open' : ''}`} key={index}>
                                                        <div className="accordion__header" onClick={() => toggleFaq(index)}>
                                                            <span>
                                                                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#E52323', marginRight: '10px', fontWeight: 'bold' }}>
                                                                    {faq.category}
                                                                </span>
                                                                {faq.question}
                                                            </span>
                                                            <span className="accordion__icon">+</span>
                                                        </div>
                                                        <div className="accordion__content">
                                                            <p className="playbook-text" style={{ margin: 0, fontSize: '15px' }}>
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    );
                                }

                                // Special case for conclusion CTA wrapping
                                let htmlContent = ch.html;
                                if (ch.id === 'the-future-belongs-to-stories-people-return-to') {
                                    // Remove the raw list CTA at the end of the text
                                    htmlContent = htmlContent.replace(/<p>CTA:<\/p>[\s\S]*$/gi, '');
                                    htmlContent = htmlContent.replace(/<p>CTA: <\/p>[\s\S]*$/gi, '');
                                }

                                return (
                                    <section key={ch.id} id={ch.id} className="playbook-section reveal-on-scroll">
                                        <h2 className="playbook-section-title">{ch.title}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                                    </section>
                                );
                            })}

                            {/* Premium Call to Action Block */}
                            <div className="playbook-cta-block reveal-on-scroll">
                                <h3 className="playbook-cta-block__title">The Future Belongs to Stories People Return To</h3>
                                <p className="playbook-text" style={{ color: '#aaa' }}>
                                    If your goal is to build a deeper relationship with your audience—whether you are a brand, platform, creator, or publisher—let's build a story they would choose to return to.
                                </p>
                                <div className="playbook-cta-block__btn-group">
                                    <Link href="/contact" className="playbook-cta-btn playbook-cta-btn--primary">
                                        Discuss Your VMD Project
                                    </Link>
                                    <Link href="/contact" className="playbook-cta-btn playbook-cta-btn--secondary">
                                        Book a Discovery Call
                                    </Link>
                                </div>
                            </div>

                        </article>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default VMDPlaybook;
