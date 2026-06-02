"use client";

import React, { useRef } from 'react';
const aboutvideo = '/assets/juju-about1.mp4';
import './AboutMediaGrid.css';

const AboutMediaGrid = ({ videoSrc = aboutvideo }) => {
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
                    onContextMenu={(e) => e.preventDefault()}
                    controlsList="nodownload"
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default AboutMediaGrid;

