import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AboutContent from '../components/about/AboutContent';
import CollectiveContent from '../components/about/CollectiveContent';
import BlogContent from '../components/about/BlogContent';

const About = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        if (location.pathname === '/team') {
            setActiveTab('collective');
        } else if (location.pathname === '/blog') {
            setActiveTab('blog');
        } else {
            setActiveTab('about');
        }
    }, [location.pathname]);

    useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    // Tab content mapping
    const renderContent = () => {
        switch (activeTab) {
            case 'about':
                return <AboutContent />;
            case 'collective':
                return <CollectiveContent />;
            case 'blog':
                return <BlogContent />;
            default:
                return <AboutContent />;
        }
    };

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ marginBottom: 0, paddingBottom: 0 }}>
            <div>
                <header className="hero" style={{ paddingBottom: 0 }}>
                    <div className="hero__tabs">
                        <nav className="tabs">
                            <ul className="tabs__list">
                                <li className={`tab ${activeTab === 'about' ? 'tab--active' : ''}`}>
                                    <button className="tab__link" onClick={() => navigate('/about')}>About</button>
                                </li>
                                <li className={`tab ${activeTab === 'collective' ? 'tab--active' : ''}`}>
                                    <button className="tab__link" onClick={() => navigate('/team')}>Collective</button>
                                </li>
                                <li className={`tab ${activeTab === 'blog' ? 'tab--active' : ''}`}>
                                    <button className="tab__link" onClick={() => navigate('/blog')}>Blog</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>

                <div style={{ minHeight: '50vh', padding: '0' }}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default About;
