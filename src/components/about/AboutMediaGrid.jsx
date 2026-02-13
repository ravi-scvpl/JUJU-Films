import React, { useRef } from 'react';
import aboutvideo from '../../assets/juju-about.mp4';
import './AboutMediaGrid.css';

const AboutMediaGrid = () => {
    const videoRef = useRef(null);

    return (
        <div className="about-media-grid">
            <div className="about-video-container">
                <video
                    ref={videoRef}
                    className="about-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={aboutvideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default AboutMediaGrid;

