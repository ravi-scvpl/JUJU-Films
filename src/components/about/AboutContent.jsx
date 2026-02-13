import React from 'react';
import AboutMediaGrid from './AboutMediaGrid';
import AboutDetailedContent from './AboutDetailedContent';

const AboutContent = () => {
    return (
        <section className="section" style={{ paddingTop: '0', marginTop: '0' }}>
            <div className="" style={{ margin: 0, padding: 0 }}>
                <div pos="5-12" pos-s="row" className="text reveal-on-scroll" style={{ margin: 0, paddingBottom: 50 }}>
                    <div className="grid hero__content" style={{ paddingTop: 0, marginTop: 0 }}>
                        <p pos="row" pos-s="row" className="hero__title" style={{ marginTop: 0 }}>
                            Good JUJU, Great Films
                        </p>
                        <h1 pos="5-12" pos-s="row" className="hero__description" style={{ fontWeight: '300', fontSize: '72px' }}>
                            <span style={{ color: '#FF2B2B' }}>Built to shorten </span> the distance between idea and impact
                        </h1>
                    </div>
                </div>

                <div className="reveal-on-scroll">
                    <AboutMediaGrid />
                </div>

                <AboutDetailedContent />
            </div>
        </section>
    );
};

export default AboutContent;
