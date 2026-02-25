import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import AboutMediaGrid from '../components/about/AboutMediaGrid';
import EcosystemDetailedContent from '../components/ecosystem/EcosystemDetailedContent';

const JujuEcosystem = () => {
    useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ marginBottom: 0, paddingBottom: 0, paddingTop: '120px' }}>
            <SEO
                title="Brand Ecosystem & Growth Content | JUJU"
                description="JUJU builds scalable brand ecosystems through UGC content, influencer collaborations, original IP creation, and narrative-led knowledge series."
                canonical="/juju-ecosystem"
            />
            <div>
                <div style={{ minHeight: '50vh', padding: '0' }}>

                    {/* Hero Section */}
                    <div className="text reveal-on-scroll" style={{ margin: 0, paddingBottom: 50 }}>
                        <div className="grid hero__content" style={{ paddingTop: 0, marginTop: 0 }}>
                            <p pos="row" pos-s="row" className="hero__title" style={{ fontSize: '36px', marginTop: 0 }}>
                                <span style={{ fontWeight: 'bold', color: '#e52323' }}>J</span><span style={{ fontWeight: 'bold', color: '#E9BC2D' }}>U</span><span style={{ fontWeight: 'bold', color: '#4CBF64' }}>J</span><span style={{ fontWeight: 'bold', color: '#52C3E1' }}>U</span> Growth Content
                            </p>
                            <h1 pos="5-12" pos-s="row" className="hero__description" style={{ fontWeight: '300', fontSize: '64px' }}>
                                <span>6 Second Bumper Ads.<br />
                                    YouTube Non-Skippable Ads.<br />
                                    Meta Performance Video Ads.
                                    Influencer Videos.<br />
                                    UGC Content. </span>
                            </h1>
                        </div>
                    </div>

                    <AboutMediaGrid />

                    <EcosystemDetailedContent />
                </div>
            </div>
        </div>
    );
};

export default JujuEcosystem;
