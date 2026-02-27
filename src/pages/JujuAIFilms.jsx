import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import AboutMediaGrid from '../components/about/AboutMediaGrid';
import AIFilmsDetailedContent from '../components/ai-films/AIFilmsDetailedContent';
import VideoModal from '../components/VideoModal';
import aivideo from '../assets/juju_ai.mp4';

const videos2025 = [
    {
        type: 'youtube',
        id: 'ygOxrGdR8dE',
        title: 'AI Series 1',
        sector: 'AI Generated',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'Oqpwhotwa3M',
        title: 'AI Series 2',
        sector: 'AI Generated',
        desc: ''
    },
];

const JujuAIFilms = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVideo(null);
    };

    useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch juju-page-container">
            <SEO
                title="JUJU AI Films | Human Skill. AI Advantage."
                description="Harnessing AI to push the boundaries of cinematic storytelling. AI-driven brand films that perform."
            />
            <main id="content" role="main" className="content">
                {/* Hero Section */}
                <div className="text reveal-on-scroll" style={{ margin: 0, paddingBottom: 50, paddingTop: 150 }}>
                    <div className="grid hero__content" style={{ paddingTop: 0, marginTop: 0 }}>
                        <p pos="row" pos-s="row" className="hero__title" style={{ fontSize: '36px', marginTop: 0 }}>
                            <span style={{ fontWeight: 'bold', color: '#e52323' }}>J</span><span style={{ fontWeight: 'bold', color: '#E9BC2D' }}>U</span><span style={{ fontWeight: 'bold', color: '#4CBF64' }}>J</span><span style={{ fontWeight: 'bold', color: '#52C3E1' }}>U</span> AI Films
                        </p>
                        <h1 pos="5-12" pos-s="row" className="hero__description" style={{ fontWeight: '300', fontSize: '64px' }}>
                            <span>AI Ads. <br />
                                AI UGC Content. <br />
                                AI Brand Ambassador Creation. <br />
                                AI Spokesperson for Brands. <br />
                                AI Influencer & Digital Avatar. </span>
                        </h1>
                    </div>
                </div>

                <AboutMediaGrid videoSrc={aivideo} />

                <section className="reveal-on-scroll" style={{ padding: '0px 0 0' }}>
                    <AIFilmsDetailedContent />
                </section>

                <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeModal} />
            </main>
        </div>
    );
};

export default JujuAIFilms;
