import React from 'react';
import Link from 'next/link';

const StartProjectCTA = () => {
    return (
        <section className="section section-cta" style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '100px 0',
            margin: 0,
            textAlign: 'center'
        }}>
            <div className="grid">
                <div pos="row" pos-s="row" className="reveal-on-scroll">
                    <h2 style={{
                        fontSize: '48px',
                        fontWeight: '300',
                        marginBottom: '40px',
                        letterSpacing: '-1px'
                    }}>
                        Ready to <span style={{ color: '#FF2B2B' }}>start your project?</span>
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#888',
                        marginBottom: '50px',
                        maxWidth: '600px',
                        margin: '0 auto 50px'
                    }}>
                        Whether it's a high-impact commercial, an original brand story, or a cost-controlled AI film, we're ready to build with you.
                    </p>
                    <Link
                        href="/start-project?src=organic"
                        className="hover-scale"
                        style={{
                            display: 'inline-block',
                            padding: '18px 40px',
                            backgroundColor: '#FF2B2B',
                            color: '#fff',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontSize: '14px',
                            fontWeight: '600',
                            borderRadius: '0',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Kickstart My Project
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default StartProjectCTA;
