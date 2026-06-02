"use client";

import React, { useState, useRef } from 'react';
const jujuShowreel = '/assets/juju-showreel.mp4';

const Showreel = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlayClick = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#000',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onContextMenu={handleContextMenu}
        >
            <video
                ref={videoRef}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
                playsInline
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                onContextMenu={handleContextMenu}
                src={jujuShowreel}
            />

            {!isPlaying && (
                <button
                    onClick={handlePlayClick}
                    style={{
                        position: 'absolute',
                        zIndex: 10,
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '2px solid #fff',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(5px)',
                        transition: 'transform 0.3s ease, background 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                >
                    <div style={{
                        width: 0,
                        height: 0,
                        borderTop: '15px solid transparent',
                        borderBottom: '15px solid transparent',
                        borderLeft: '25px solid white',
                        marginLeft: '8px'
                    }} />
                </button>
            )}

            {/* Overlay to prevent interaction with video element directly if needed */}
            {isPlaying && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 5
                    }}
                    onClick={() => {
                        if (videoRef.current) {
                            if (videoRef.current.paused) {
                                videoRef.current.play();
                            } else {
                                videoRef.current.pause();
                            }
                        }
                    }}
                />
            )}
        </div>
    );
};

export default Showreel;
