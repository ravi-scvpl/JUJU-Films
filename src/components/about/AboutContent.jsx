import React from 'react';

const AboutContent = () => {
    return (
        <section className="section" style={{ paddingTop: '0', marginTop: '0' }}>
            <div className="" style={{ margin: 0, padding: 0 }}>
                <div pos="5-12" pos-s="row" className="text" style={{ margin: 0, padding: 0 }}>
                    <div className="grid hero__content" style={{ paddingTop: 0, marginTop: 0 }}>
                        <p pos="row" pos-s="row" className="hero__title" style={{ marginTop: 0 }}>
                            About Us
                        </p>
                        <h1 pos="5-12" pos-s="row" className="hero__description" style={{ fontWeight: '300', fontSize: '72px' }}>
                            <span style={{ color: '#FF2B2B' }}>Cost-controlled, full-service brand IP—
                                created entirely with</span> AI,
                            built to scale narratives faster,
                            without losing emotion or control.
                        </h1>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '60px' }}>
                        <div style={{ flex: 1 }}>
                            <img src="https://placehold.co/600x400" alt="Team member" style={{ width: '100%', display: 'block' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <img src="https://placehold.co/600x400" alt="Craftsmanship" style={{ width: '100%', display: 'block' }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutContent;
