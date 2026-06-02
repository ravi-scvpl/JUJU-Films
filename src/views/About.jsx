"use client";

import React, { useEffect } from 'react';
import AboutContent from '../components/about/AboutContent';
import SEO from '../components/SEO';

const About = () => {
    useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ marginBottom: 0, paddingBottom: 0, paddingTop: '120px' }}>
            <SEO
                title="About Us"
                description="Learn about JUJU Films, a collective of storytellers building cultural IP powered by brands."
                canonical="/about"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "name": "About JUJU Films",
                    "description": "JUJU Films is a creator collective building original stories, under one JUJU philosophy.",
                    "url": "https://www.jujuindia.com/about",
                    "publisher": {
                        "@type": "Organization",
                        "name": "JUJU Films",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://www.jujuindia.com/juju-white-logo.webp"
                        }
                    }
                }}
            />
            <div>
                <div style={{ minHeight: '50vh', padding: '0' }}>
                    <AboutContent />
                </div>
            </div>
        </div>
    );
};

export default About;
