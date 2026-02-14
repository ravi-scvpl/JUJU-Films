import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BrandContactForm from '../components/BrandContactForm';

const JujuAIFilms = () => {
    useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch">
            <div>
                <header className="hero">
                    <div className="grid hero__content reveal-on-scroll">
                        <p pos="row" pos-s="row" className="hero__title">
                            Juju AI Films
                        </p>
                        <h1 pos="5-12" pos-s="row" className="hero__description" style={{ fontWeight: '300', fontSize: '72px' }}>
                            <span style={{ color: '#FF2B2B' }}>Cost-controlled, full-service brand IP—
                                created entirely with</span> AI,
                            built to scale narratives faster,
                            without losing emotion or control.
                        </h1>
                    </div>
                </header>
                <section className="works-chronology">
                    <ol className="works-chronology__list grid reveal-on-scroll">
                        <li className="works-chronology__year">
                            <h5 className="works-chronology__title">2025</h5>
                            <ol>
                                {videos2025.map((video, index) => (
                                    <VideoItem key={index} video={video} onVideoClick={handleVideoClick} />
                                ))}
                            </ol>
                        </li>
                        <li className="works-chronology__year">
                            <h5 className="works-chronology__title">2024</h5>
                            <ol>
                                {videos2024.map((video, index) => (
                                    <VideoItem key={index} video={video} onVideoClick={handleVideoClick} />
                                ))}
                            </ol>
                        </li>
                    </ol>
                </section>
                <BrandContactForm />
                <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </div>
    );
};

export default JujuAIFilms;
