import React, { useState, useEffect } from 'react';
import AboutContent from '../components/about/AboutContent';
import CollectiveContent from '../components/about/CollectiveContent';
import BlogContent from '../components/about/BlogContent';

const About = () => {
    const [activeTab, setActiveTab] = useState('about');

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
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch">
            <div>
                <header className="hero" style={{ paddingBottom: 0 }}>
                    <div className="hero__tabs">
                        <nav className="tabs">
                            <ul className="tabs__list">
                                <li className={`tab ${activeTab === 'about' ? 'tab--active' : ''}`}>
                                    <button className="tab__link" onClick={() => setActiveTab('about')}>About</button>
                                </li>
                                <li className={`tab ${activeTab === 'collective' ? 'tab--active' : ''}`}>
                                    <button className="tab__link" onClick={() => setActiveTab('collective')}>Collective</button>
                                </li>
                                <li className={`tab ${activeTab === 'blog' ? 'tab--active' : ''}`}>
                                    <button className="tab__link" onClick={() => setActiveTab('blog')}>Blog</button>
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
