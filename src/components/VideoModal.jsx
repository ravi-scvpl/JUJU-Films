"use client";

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const VideoModal = ({ video, isOpen, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            document.body.style.overflow = 'unset';
            // Stop any playing video if possible/needed (unmounting will handle it mostly)
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !video) return null;

    let videoContent;

    if (video.type === 'youtube') {
        videoContent = (
            <iframe
                style={{ width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        );
    } else if (video.type === 'playlist') {
        videoContent = (
            <iframe
                style={{ width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/videoseries?list=${video.id}&autoplay=1&rel=0`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        );
    } else if (video.type === 'vimeo') {
        videoContent = (
            <iframe
                src={`https://player.vimeo.com/video/${video.id}?autoplay=1`}
                style={{ width: '100%', height: '100%' }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
            ></iframe>
        );
    } else if (video.type === 'local') {
        videoContent = (
            <video
                src={video.src}
                controls
                autoPlay
                onContextMenu={(e) => e.preventDefault()}
                controlsList="nodownload"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            ></video>
        );
    } else {
        videoContent = <div style={{ color: 'white' }}>Video format not supported</div>;
    }

    return ReactDOM.createPortal(
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                zIndex: 2147483647, // Max z-index
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: isOpen ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                pointerEvents: isOpen ? 'all' : 'none'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    position: 'relative',
                    width: 'min(90vw, 160vh)', // Ensures ratio-correct size fitting within 90vw and 90vh
                    aspectRatio: '16/9',
                    maxHeight: '90vh', // Backup constraint
                    backgroundColor: '#000',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside video area
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        background: 'rgba(0,0,0,0.5)',
                        border: 'none',
                        color: 'white',
                        fontSize: '30px',
                        cursor: 'pointer',
                        zIndex: 2,
                        padding: '5px 15px',
                        lineHeight: 1
                    }}
                >
                    &times;
                </button>
                <div style={{ flex: 1, width: '100%', height: '100%', position: 'relative' }}>
                    {videoContent}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default VideoModal;
