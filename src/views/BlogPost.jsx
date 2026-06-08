"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../supabaseClient';
import SEO from '../components/SEO';

const BlogPost = ({ blog }) => {
    const { slug } = useParams();
    const [blogState, setBlogState] = useState(blog);
    const [loading, setLoading] = useState(!blog);
    const [scrollProgress, setScrollProgress] = useState(0);

    const [processedContent, setProcessedContent] = useState('');
    const [introHTML, setIntroHTML] = useState('');
    const [toc, setToc] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [faqSchema, setFaqSchema] = useState(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScrollProgress = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100;
                setScrollProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScrollProgress);
        return () => window.removeEventListener('scroll', handleScrollProgress);
    }, []);

    useEffect(() => {
        if (blog) {
            setBlogState(blog);
            setLoading(false);
        } else {
            const fetchBlog = async () => {
                try {
                    const { data, error } = await supabase
                        .from('blog_posts')
                        .select('*')
                        .eq('slug', slug) // Match by slug
                        .maybeSingle();

                    if (data) {
                        setBlogState(data);
                    } else {
                        console.error("Blog post not found in DB.");
                    }
                } catch (err) {
                    console.error("Error fetching blog:", err);
                } finally {
                    setLoading(false);
                }
            };

            fetchBlog();
        }

        // Enable theme switching
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, [slug, blog]);

    useEffect(() => {
        if (!blogState || !blogState.content) return;

        if (typeof window !== 'undefined') {
            // Replace non-breaking spaces with standard spaces to ensure correct line wrapping
            let cleanHtml = blogState.content
                .replace(/&nbsp;/g, ' ')
                .replace(/\u00a0/g, ' ');

            const parser = new DOMParser();
            const doc = parser.parseFromString(cleanHtml, 'text/html');
            
            // Custom label mapping for editorial section headings
            const labelMap = {
                "why audiences follow some characters and forget others": "The Core Problem",
                "desire and obstacle create the engine": "The Mechanism",
                "why flaws work when sympathy alone does not": "Craft Detail",
                "building character in vertical micro dramas": "Applied to VMD",
                "change, resistance, and what actually moves an audience": "The Arc",
                "the myth of the likable character": "Debunking Likability",
                "every character needs something": "Core Desire",
                "why behaviour matters more than backstory": "Behaviour vs Backstory",
                "character arcs and the psychology of change": "Narrative Movement",
                "common character mistakes": "Common Pitfalls",
                "how character design influences audience retention": "Retention Dynamics",
                "the character test we use before production": "Pre-Production Test",
                "desire and obstacle": "The Engine",
                "why flaws work": "Flaws & Consequence"
            };

            // 1. Extract first two paragraphs as introHTML (before any H2 heading)
            const firstH2 = doc.querySelector('h2');
            const introNodes = [];
            const childNodes = Array.from(doc.body.childNodes);
            
            for (let node of childNodes) {
                if (firstH2 && (node === firstH2 || node.contains(firstH2))) {
                    break;
                }
                if (node.nodeName === 'P') {
                    introNodes.push(node);
                }
            }
            
            const nodesToUse = introNodes.slice(0, 2);
            const extractedIntro = nodesToUse.map(n => n.outerHTML).join('');
            nodesToUse.forEach(n => n.remove());
            
            // 2. Parse section headers, inject IDs and insert styled section-labels
            const headings = doc.querySelectorAll('h2');
            const tocItems = [];
            
            headings.forEach((h, index) => {
                const text = h.textContent;
                const isFAQ = text.toLowerCase() === 'faq';
                const isConclusion = text.toLowerCase() === 'conclusion';
                
                const id = h.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                h.id = id;
                
                const labelNum = String(index + 1).padStart(2, '0');
                
                // Allow visual editors to explicitly supply a custom label override element
                let prevEl = h.previousElementSibling;
                let isOverride = false;
                if (prevEl) {
                    if (prevEl.classList.contains('section-label')) {
                        isOverride = true;
                    } else if (prevEl.tagName === 'P' && prevEl.textContent.trim().length > 0 && prevEl.textContent.trim().length <= 35) {
                        isOverride = true;
                        // Convert P tag to a DIV to bypass paragraph-specific CSS overrides
                        const divLabel = doc.createElement('div');
                        divLabel.className = 'section-label';
                        divLabel.innerHTML = prevEl.innerHTML;
                        prevEl.parentNode.replaceChild(divLabel, prevEl);
                        prevEl = divLabel;
                    }
                }

                if (isOverride) {
                    if (!prevEl.textContent.match(/^\d+\s*—/)) {
                        prevEl.textContent = `${labelNum} — ${prevEl.textContent}`;
                    }
                } else {
                    const label = doc.createElement('div');
                    label.className = 'section-label';
                    
                    if (isFAQ) {
                        label.textContent = 'FAQ';
                    } else if (isConclusion) {
                        label.textContent = `${labelNum} — Conclusion`;
                    } else {
                        const textKey = text.toLowerCase().trim().replace(/\s+/g, ' ');
                        const customLabel = labelMap[textKey];
                        label.textContent = customLabel ? `${labelNum} — ${customLabel}` : `${labelNum} — Section`;
                    }
                    
                    h.parentNode.insertBefore(label, h);
                }
                
                tocItems.push({ id, text });
            });
            
            // 3. Reconstruct FAQ markup and compile questions/answers list
            const faqHeading = Array.from(doc.querySelectorAll('h2')).find(h => h.textContent.toLowerCase() === 'faq');
            const faqList = [];
            
            if (faqHeading) {
                const faqContainer = doc.createElement('div');
                faqContainer.className = 'faq-container';
                
                let next = faqHeading.nextElementSibling;
                const elementsToRemove = [];
                
                let currentItem = null;
                while (next && next.nodeName !== 'H2') {
                    if (next.nodeName === 'H3') {
                        currentItem = doc.createElement('div');
                        currentItem.className = 'faq-item';
                        
                        const qText = next.textContent.replace(/^Q\.\s*/i, '').trim();
                        
                        const qDiv = doc.createElement('div');
                        qDiv.className = 'faq-q';
                        qDiv.innerHTML = next.innerHTML.replace(/^<b>Q\.<\/b>\s*/i, '').replace(/^Q\.\s*/i, '');
                        currentItem.appendChild(qDiv);
                        faqContainer.appendChild(currentItem);
                        
                        currentItem._qText = qText;
                    } else if (next.nodeName === 'P' && currentItem) {
                        const aText = next.textContent.replace(/^Ans\.\s*/i, '').trim();
                        
                        const aDiv = doc.createElement('div');
                        aDiv.className = 'faq-a';
                        aDiv.innerHTML = next.innerHTML.replace(/^<b>Ans\.<\/b>\s*/i, '').replace(/^Ans\.\s*/i, '');
                        currentItem.appendChild(aDiv);
                        
                        if (currentItem._qText) {
                            faqList.push({
                                question: currentItem._qText,
                                answer: aText
                            });
                        }
                    }
                    elementsToRemove.push(next);
                    next = next.nextElementSibling;
                }
                
                elementsToRemove.forEach(el => el.remove());
                faqHeading.parentNode.insertBefore(faqContainer, faqHeading.nextSibling);
            }

            // 4. Extract explicit FAQ schema script block if present in content
            const faqScript = doc.querySelector('script#faq-schema-json');
            let parsedFaqSchemaObj = null;
            if (faqScript) {
                try {
                    parsedFaqSchemaObj = JSON.parse(faqScript.textContent);
                    faqScript.remove(); // Keep content clean
                } catch (e) {
                    console.error("Error parsing embedded FAQ schema:", e);
                }
            }

            // Define final schema set
            if (parsedFaqSchemaObj) {
                setFaqSchema(parsedFaqSchemaObj);
            } else if (faqList.length > 0) {
                const faqSchemaObj = {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faqList.map(item => ({
                        "@type": "Question",
                        "name": item.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": item.answer
                        }
                    }))
                };
                setFaqSchema(faqSchemaObj);
            } else {
                setFaqSchema(null);
            }
            
            setIntroHTML(extractedIntro);
            setProcessedContent(doc.body.innerHTML);
            setToc(tocItems);
        }
    }, [blogState]);

    if (loading) {
        return (
            <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ minHeight: '100vh', paddingTop: '100px', textAlign: 'center', backgroundColor: '#0d0c0a', color: '#f2f0ec' }}>
                Loading...
            </div>
        );
    }

    if (!blogState) {
        return (
            <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ minHeight: '100vh', paddingTop: '100px', textAlign: 'center', backgroundColor: '#0d0c0a', color: '#f2f0ec' }}>
                Article not found.
            </div>
        );
    }

    const formattedDate = blogState.created_at ? new Date(blogState.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'June 2026';
    const wordCount = blogState.content ? blogState.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length : 0;
    const readTime = Math.ceil(wordCount / 200) || 12;

    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blogState.title,
        "image": blogState.image_url,
        "datePublished": blogState.created_at,
        "dateModified": blogState.updated_at || blogState.created_at,
        "author": {
            "@type": "Organization",
            "name": "JUJU Films"
        },
        "publisher": {
            "@type": "Organization",
            "name": "JUJU Films",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.jujuindia.com/juju-white-logo.webp"
            }
        },
        "description": blogState.meta_desc || (blogState.content ? blogState.content.substring(0, 150).replace(/<[^>]*>?/gm, '') : '')
    };

    const finalSchema = faqSchema ? [blogPostingSchema, faqSchema] : blogPostingSchema;

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch blog-page-wrap" style={{ minHeight: '100vh' }}>
            <SEO
                title={blogState.meta_title || blogState.title}
                description={blogState.meta_desc || (blogState.content ? blogState.content.substring(0, 150).replace(/<[^>]*>?/gm, '') : '')}
                image={blogState.image_url}
                canonical={`/blog/${slug}`}
                type="article"
                schema={finalSchema}
            />

            {/* Reading Scroll Progress Bar */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${scrollProgress}%`,
                height: '3px',
                backgroundColor: '#e02020',
                zIndex: 99999,
                transition: 'width 0.1s ease-out'
            }} />

            {/* HERO */}
            <div className="hero reveal-on-scroll">
                <div className="hero-category">{blogState.category || 'Thought Leadership'}</div>
                <h1>{blogState.title}</h1>
                <div className="hero-meta">
                    <span>JUJU Editorial</span>
                    <span className="divider">—</span>
                    <span>{formattedDate}</span>
                    <span className="divider">—</span>
                    <span>{readTime} min read</span>
                </div>
                {mounted && introHTML ? (
                    <div className="hero-intro" dangerouslySetInnerHTML={{ __html: introHTML }} />
                ) : (
                    <div className="hero-intro">
                        <p>{blogState.intro || 'Audiences do not care about characters because they are likable. They care because something about the character still feels unresolved.'}</p>
                    </div>
                )}
            </div>

            {/* BODY */}
            <div className="page-wrap">
                <div className="article-body">

                    {/* MAIN CONTENT */}
                    <main className="article-main reveal-on-scroll">
                        {blogState.image_url && (
                            <div style={{ marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '40px' }}>
                                <img
                                    src={blogState.image_url}
                                    alt={blogState.alt_text || blogState.title}
                                    style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '60vh', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                        
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{ __html: mounted && processedContent ? processedContent : blogState.content }}
                        />

                        {/* Author Bio Card */}
                        <div className="blog-author-card">
                            <div style={{ 
                                width: '60px', 
                                height: '60px', 
                                borderRadius: '50%', 
                                backgroundColor: 'var(--red)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                fontSize: '20px', 
                                fontWeight: 'bold', 
                                color: '#fff',
                                fontFamily: 'monospace',
                                flexShrink: 0
                            }}>
                                JJ
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    JUJU Editorial
                                </h4>
                                <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6' }}>
                                    We are storytellers, designers, and directors partnering to build cultural IP. We explore character architecture, brand-enabled content, and the intersection of filmmaking and technology.
                                </p>
                            </div>
                        </div>

                        {/* Bottom Navigation */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '30px', marginTop: '60px' }}>
                            <Link href="/blog" className="blog-back-link">
                                ← Back to Thinkspace
                            </Link>
                            <span style={{ fontSize: '13px', opacity: 0.5, fontFamily: 'monospace' }}>© 2026 JUJU INDIA</span>
                        </div>
                    </main>

                    {/* SIDEBAR */}
                    <aside className="article-aside reveal-on-scroll">
                        {toc.length > 0 && (
                            <div className="sidebar-card">
                                <div className="sidebar-title">In This Article</div>
                                <ul className="sidebar-toc">
                                    {toc.map((item, idx) => (
                                        <li key={idx}>
                                            <a href={`#${item.id}`}>{item.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="sidebar-cta">
                            <p>Building a Vertical Micro Drama series? Talk to our production team.</p>
                            <Link href="/contact">Start The Conversation →</Link>
                        </div>

                        <div className="sidebar-card">
                            <div className="sidebar-title">Related Topics</div>
                            <ul className="sidebar-toc">
                                <li><Link href="/vertical-micro-drama-production-india/playbook">Narrative Structure For Short-Form</Link></li>
                                <li><Link href="/vertical-micro-drama-production-india">Vertical Micro Drama Overview</Link></li>
                                <li><Link href="/case-studies">JUJU Case Studies</Link></li>
                                <li><Link href="/blog">More Thinkspace Articles</Link></li>
                            </ul>
                        </div>
                    </aside>

                </div>
            </div>

            {/* FOOTER CTA */}
            <div className="footer-cta reveal-on-scroll">
                <h3>Let's Build Something Real.</h3>
                <p>We develop, write, cast, shoot, and deliver vertical micro dramas for brands that want to tell actual stories.</p>
                <Link href="/contact" className="btn-primary">Start A Project</Link>
            </div>

        </div>
    );
};

export default BlogPost;
