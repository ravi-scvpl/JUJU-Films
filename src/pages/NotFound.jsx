import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    useEffect(() => {
        document.body.classList.add('page-not-found');
        return () => {
            document.body.classList.remove('page-not-found');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine" style={{
            backgroundColor: '#000',
            color: '#fff',
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            padding: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999
        }}>
            <div className="grid">
                <div className="hero__content" pos="row" pos-s="row" style={{ textAlign: 'center', paddingTop: '100px', paddingBottom: '100px', opacity: 1, transform: 'none' }}>
                    <h1 style={{ fontSize: '120px', lineHeight: '1', marginBottom: '20px', color: '#E52323' }}>404</h1>
                    <h2 style={{ fontSize: '40px', marginBottom: '30px' }}>Page Not Found</h2>
                    <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    <Link to="/" className="btn" style={{
                        display: 'inline-block',
                        padding: '15px 40px',
                        backgroundColor: '#fff',
                        color: '#000',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        borderRadius: '50px',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseOver={(e) => { e.target.style.backgroundColor = '#E52323'; e.target.style.color = '#fff'; }}
                        onMouseOut={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#000'; }}
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
