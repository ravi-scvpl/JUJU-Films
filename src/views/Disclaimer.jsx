"use client";

import React, { useEffect } from 'react';
import SEO from '../components/SEO';

const Disclaimer = () => {
    useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', marginBottom: 0 }}>
            <SEO
                title="Disclaimer & Cookie Policy"
                description="Disclaimer and Cookie Policy for JUJU Films - Read about our website usage, warranties, and cookie practices."
                canonical="/disclaimer"
            />

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ fontSize: '48px', fontWeight: '300', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '4px' }}>Disclaimer</h1>

                <div className="disclaimer-content" style={{ lineHeight: '1.8', fontSize: '16px', fontWeight: '300', marginBottom: '60px' }}>
                    <p style={{ marginBottom: '20px' }}>
                        The information on jujuindia.com is provided on an “as is” basis.
                    </p>
                    <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                        <li style={{ marginBottom: '10px' }}>We make no warranties regarding accuracy or completeness.</li>
                        <li style={{ marginBottom: '10px' }}>Product images are for representation purposes only.</li>
                        <li style={{ marginBottom: '10px' }}>Results, testimonials, or experiences may vary.</li>
                        <li style={{ marginBottom: '10px' }}>External links are not under our control.</li>
                        <li style={{ marginBottom: '10px' }}>Use of this website is at your own risk.</li>
                    </ul>
                </div>

                <h1 style={{ fontSize: '48px', fontWeight: '300', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '4px' }}>Cookie Policy</h1>
                <p style={{ color: '#888', marginBottom: '40px', fontSize: '14px' }}>Last Updated on: Feb 23, 2026</p>

                <div className="cookie-content" style={{ lineHeight: '1.8', fontSize: '16px', fontWeight: '300' }}>
                    <p style={{ marginBottom: '20px' }}>
                        In compliance with the IT Act and applicable digital privacy practices:
                    </p>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>1. What We Use</h2>
                        <p>We use cookies and similar tracking technologies to:</p>
                        <ul style={{ listStyle: 'square', paddingLeft: '20px', marginTop: '10px' }}>
                            <li>Improve website performance</li>
                            <li>Analyze traffic</li>
                            <li>Enhance user experience</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>2. Types of Cookies</h2>
                        <ul style={{ listStyle: 'square', paddingLeft: '20px' }}>
                            <li>Essential Cookies</li>
                            <li>Performance Cookies</li>
                            <li>Analytics Cookies</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>3. Consent</h2>
                        <p>By continuing to browse jujuindia.com, you consent to cookie usage.</p>
                        <p style={{ marginTop: '10px' }}>Users may disable cookies through browser settings.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
