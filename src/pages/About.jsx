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
