"use client";

import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import AboutMediaGrid from '../components/about/AboutMediaGrid';
import VMDRichContent from '../components/vertical-micro-dramas/VMDRichContent';

const vmdVideo = '/assets/juju_storytelling.mp4';

const VerticalMicroDramas = () => {
    useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch juju-page-container">
            <SEO
                title="Vertical Micro Drama Production House in India | JUJU"
                description="JUJU is a Mumbai and Delhi NCR-based Vertical Micro Drama Production House creating branded entertainment, vertical series and mobile-first storytelling for brands, platforms and creators."
            />
            <main id="content" role="main" className="content">
                {/* Hero Section */}
                <div className="text reveal-on-scroll" style={{ margin: 0, paddingBottom: 50, paddingTop: 150 }}>
                    <div className="grid hero__content" style={{ paddingTop: 0, marginTop: 0 }}>
                        <p pos="row" pos-s="row" className="hero__title" style={{ fontSize: '36px', marginTop: 0 }}>
                            <span style={{ fontWeight: 'bold', color: '#e52323' }}>J</span><span style={{ fontWeight: 'bold', color: '#E9BC2D' }}>U</span><span style={{ fontWeight: 'bold', color: '#4CBF64' }}>J</span><span style={{ fontWeight: 'bold', color: '#52C3E1' }}>U</span> Vertical Micro Dramas
                        </p>
                        <h1 pos="5-12" pos-s="row" className="hero__description" style={{ fontWeight: '300', fontSize: '64px' }}>
                            <span>Vertical Web Series. <br />
                                Episodic Branded Content. <br />
                                Mobile-First Drama Series. <br />
                                Social-First Storytelling.</span>
                        </h1>
                    </div>
                </div>

                <AboutMediaGrid videoSrc={vmdVideo} />

                <section className="reveal-on-scroll" style={{ padding: '0px 0 0' }}>
                    <VMDRichContent />
                </section>
            </main>
        </div>
    );
};

export default VerticalMicroDramas;
