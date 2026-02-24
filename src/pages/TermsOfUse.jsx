import React, { useEffect } from 'react';
import SEO from '../components/SEO';

const TermsOfUse = () => {
    useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', marginBottom: 0 }}>
            <SEO
                title="Terms of Use"
                description="Terms of Use for JUJU Films - Read our legally binding terms for accessing jujuindia.com."
                canonical="/terms-of-use"
            />

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ fontSize: '48px', fontWeight: '300', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '4px' }}>Terms of Use</h1>
                <p style={{ marginBottom: '40px', fontSize: '14px', opacity: 0.6 }}>Last Updated on: Feb 23, 2026</p>

                <div className="terms-content" style={{ lineHeight: '1.8', fontSize: '16px', fontWeight: '300' }}>
                    <p style={{ marginBottom: '30px', opacity: 0.8 }}>
                        By accessing jujuindia.com, you agree to these legally binding terms.
                    </p>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>1. Lawful Use</h2>
                        <p>Users shall not:</p>
                        <ul style={{ listStyle: 'square', paddingLeft: '20px', marginTop: '10px' }}>
                            <li>Violate applicable Indian laws</li>
                            <li>Transmit harmful, defamatory, or unlawful content</li>
                            <li>Attempt unauthorized access to systems</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>2. Intellectual Property</h2>
                        <p>
                            All website content including logos, designs, trademarks, text, and graphics are owned by Juju India and protected under the Copyright Act, 1957 and other applicable laws.
                        </p>
                        <p style={{ marginTop: '10px' }}>Unauthorized reproduction or commercial use is prohibited.</p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>3. Transactions</h2>
                        <p>All purchases are subject to acceptance and availability.</p>
                        <p style={{ marginTop: '10px' }}>We reserve the right to cancel orders due to pricing errors, suspected fraud, or regulatory concerns.</p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>4. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted under Indian law, Juju India shall not be liable for indirect, incidental, or consequential damages arising from website use.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>5. Indemnity</h2>
                        <p>Users agree to indemnify Juju India against claims arising from misuse of the website.</p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', color: '#E52323', marginBottom: '20px', fontWeight: '400' }}>6. Governing Law & Jurisdiction</h2>
                        <p>These terms shall be governed by the laws of India.</p>
                        <p style={{ marginTop: '10px' }}>Courts of competent jurisdiction in India shall have exclusive authority over disputes.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUse;
