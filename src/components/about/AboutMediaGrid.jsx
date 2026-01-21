import React, { useRef } from 'react';

const AboutMediaGrid = () => {
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Optional: Reset to start
        }
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '20px',
        padding: '60px 0',
        alignItems: 'center',
    };

    const imageStyle = {
        width: '100%',
        height: 'auto',
        display: 'block',
        transition: 'transform 0.3s ease',
    };

    const videoContainerStyle = {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
    };

    const videoStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    };

    return (
        <div className="about-media-grid">
            <div className="grid">
                <div pos="row" style={gridStyle}>
                    {/* Item 1 - Top Left (Wide) */}
                    <div style={{ gridColumn: '1 / 6', alignSelf: 'end', marginBottom: '40px' }}>
                        <img
                            src="https://placehold.co/800x500"
                            alt="Creative Process"
                            style={imageStyle}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </div>

                    {/* Item 2 - Top Right (Small, Offset) */}
                    <div style={{ gridColumn: '8 / 12', alignSelf: 'center', marginTop: '-80px' }}>
                        <img
                            src="https://placehold.co/400x300"
                            alt="Design Tools"
                            style={imageStyle}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </div>

                    {/* Item 3 - Center Video (Prominent) */}
                    <div
                        style={{ gridColumn: '4 / 10', zIndex: 2, margin: '-20px 0' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div style={videoContainerStyle}>
                            <video
                                ref={videoRef}
                                poster="https://placehold.co/900x506/black/white?text=Video+Poster"
                                style={videoStyle}
                                loop
                                muted
                                playsInline
                            >
                                <source src="https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                    {/* Item 4 - Bottom Left (Tall, overlapping) */}
                    <div style={{ gridColumn: '2 / 5', alignSelf: 'start', marginTop: '-60px', zIndex: 1 }}>
                        <img
                            src="https://placehold.co/400x500"
                            alt="Brand Strategy"
                            style={imageStyle}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </div>

                    {/* Item 5 - Bottom Right (Wide, overlapping) */}
                    <div style={{ gridColumn: '7 / 13', alignSelf: 'start', marginTop: '30px' }}>
                        <img
                            src="https://placehold.co/700x400"
                            alt="Workshop"
                            style={imageStyle}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMediaGrid;
