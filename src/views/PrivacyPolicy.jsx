"use client";

import React, { useEffect } from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
    useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', marginBottom: 0 }}>
            <SEO
                title="Privacy Policy"
                description="Privacy Policy for JUJU Films - Learn how we collect and protect your information."
                canonical="/privacy-policy"
            />

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ fontSize: '48px', fontWeight: '300', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '4px' }}>Privacy Policy</h1>
                <p style={{ marginBottom: '40px', fontSize: '14px', opacity: 0.6 }}>Last Updated on: Feb 23, 2026 | Contact: info@jujuindia.com</p>

                <div className="policy-content" style={{ lineHeight: '1.8', fontSize: '16px', fontWeight: '300' }}>
                    <p style={{ marginBottom: '30px', opacity: 0.8 }}>
                        This Privacy Policy is published in compliance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                    </p>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>1. Collection of Information</h2>
                        <p>We may collect:</p>
                        <ul style={{ listStyle: 'none', paddingLeft: '0', marginTop: '10px' }}>
                            <li style={{ marginBottom: '15px' }}>
                                <strong style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Personal Information</strong>
                                Name, Email address, Phone number, Billing / Shipping address
                            </li>
                            <li style={{ marginBottom: '15px' }}>
                                <strong style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Sensitive Personal Data (if applicable)</strong>
                                Payment details (processed via secure third-party gateways)
                            </li>
                        </ul>
                        <p style={{ marginTop: '15px', fontStyle: 'italic', color: '#888' }}>We collect information only when voluntarily provided or when necessary to deliver services.</p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>2. Purpose of Collection</h2>
                        <p>Information is collected for:</p>
                        <ul style={{ listStyle: 'square', paddingLeft: '20px' }}>
                            <li>Processing orders or inquiries</li>
                            <li>Customer support</li>
                            <li>Marketing communication (with consent)</li>
                            <li>Improving website performance</li>
                            <li>Legal compliance</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>3. Disclosure of Information</h2>
                        <p>We do not sell or rent personal data. Information may be shared with:</p>
                        <ul style={{ listStyle: 'square', paddingLeft: '20px' }}>
                            <li>Payment processors</li>
                            <li>Logistics partners</li>
                            <li>Service providers under confidentiality obligations</li>
                            <li>Government authorities when required under law</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>4. Data Security</h2>
                        <p>We implement reasonable security practices as required under Rule 8 of the SPDI Rules, including technical and administrative safeguards.</p>
                        <p style={{ marginTop: '10px', color: '#888' }}>However, internet transmission cannot be guaranteed 100% secure.</p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>5. User Rights</h2>
                        <p>Users may request access to personal data, correction or deletion, or withdrawal of consent.</p>
                        <p style={{ marginTop: '10px' }}>Requests may be sent to: <a href="mailto:info@jujuindia.com" style={{ color: '#fff', borderBottom: '1px solid #E52323', textDecoration: 'none' }}>info@jujuindia.com</a></p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>6. Grievance Officer</h2>
                        <p>In accordance with Rule 5(9):</p>
                        <div style={{ marginTop: '10px', backgroundColor: '#111', padding: '20px', borderLeft: '3px solid #E52323' }}>
                            <p><strong>Grievance Officer:</strong></p>
                            <p>Email: <a href="mailto:info@jujuindia.com" style={{ color: '#fff', textDecoration: 'none' }}>info@jujuindia.com</a></p>
                            <p style={{ marginTop: '10px', fontSize: '12px', color: '#888' }}>Response Time: Within 30 days from receipt of complaint.</p>
                        </div>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>7. Policy Updates</h2>
                        <p>We reserve the right to update this policy. Continued use of the website constitutes acceptance of changes.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
