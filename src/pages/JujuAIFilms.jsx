import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AboutMediaGrid from '../components/about/AboutMediaGrid';
import AIFilmsDetailedContent from '../components/ai-films/AIFilmsDetailedContent';
import VideoModal from '../components/VideoModal';

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

const VideoItem = ({ video, onVideoClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    let src;
    let thumbSrc;

    if (video.type === 'youtube') {
        src = `https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}`;
        thumbSrc = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
    } else if (video.type === 'playlist') {
        src = `https://www.youtube.com/embed/videoseries?list=${video.id}`;
        thumbSrc = video.thumbId ? `https://img.youtube.com/vi/${video.thumbId}/hqdefault.jpg` : '/thumbnails/video_thumb.jpg';
    } else if (video.type === 'vimeo') {
        src = `https://player.vimeo.com/video/${video.id}?autoplay=1&muted=1&background=1`;
        thumbSrc = '/thumbnails/video_thumb.jpg'; // Pending better placeholder
    } else {
        src = video.src;
        thumbSrc = video.thumb;
    }

    return (
        <li className="work">
            <div
                className="work__container grid"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="work__thumbnail"
                    onClick={() => onVideoClick(video)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="media">
                        <img
                            width="2560"
                            height="1575"
                            src={thumbSrc}
                            className=""
                            alt={video.desc || video.title}
                            loading="lazy"
                            sizes="auto"
                            decoding="async"
                        />
                    </div>
                    <div className="work__thumbnail-over" aria-hidden="true">
                        {isHovered && (
                            video.type === 'local' ? (
                                <video src={src} muted playsInline autoPlay loop></video>
                            ) : (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={src}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    style={{ pointerEvents: 'none' }}
                                ></iframe>
                            )
                        )}
                    </div>
                </div>
                <Link className="work__link" to={video.link || "#"} aria-label={video.title} onClick={(e) => { e.preventDefault(); onVideoClick(video); }}>
                    <h3 className="work__title">{video.title}</h3>
                    <span className="work__sector">{video.sector}</span>
                </Link>
                <div className="work__excerpt">
                    <p>{video.desc}</p>
                </div>
            </div>
        </li>
    );
};

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
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ marginBottom: 0, paddingBottom: 0, paddingTop: '120px' }}>
            <SEO
                title="AI Films | Human Skill. AI Advantage."
                description="JUJU AI Films combines world-class creative talent with advanced AI tools to produce AI-powered ads and scalable brand IP."
                canonical="/juju-ai-films"
            />
            <div>
                <div style={{ minHeight: '50vh', padding: '0' }}>

                    {/* Hero Section */}
                    <div className="text reveal-on-scroll" style={{ margin: 0, paddingBottom: 50 }}>
                        <div className="grid hero__content" style={{ paddingTop: 0, marginTop: 0 }}>
                            <p pos="row" pos-s="row" className="hero__title" style={{ fontSize: '36px', marginTop: 0 }}>
                                <span style={{ fontWeight: 'bold', color: '#e52323' }}>J</span><span style={{ fontWeight: 'bold', color: '#E9BC2D' }}>U</span><span style={{ fontWeight: 'bold', color: '#4CBF64' }}>J</span><span style={{ fontWeight: 'bold', color: '#52C3E1' }}>U</span> AI Films
                            </p>
                            <h1 pos="5-12" pos-s="row" className="hero__description" style={{ fontWeight: '300', fontSize: '64px' }}>
                                <span>Human Skill. AI Advantage. <br /> Unfair Advantage. </span>
                            </h1>
                        </div>
                    </div>

                    <AboutMediaGrid />

                    <AIFilmsDetailedContent />

                    {/* Works Chronology - Optional: keep it or move it to a specific section */}
                    {/* <section className="works-chronology" style={{ marginTop: '100px' }}>
                        <div className="grid">
                             <div style={{ gridColumn: '1 / 13' }}>
                                <h2 style={{ fontSize: '48px', fontWeight: '300', marginBottom: '40px' }}>Our Work</h2>
                             </div>
                        </div>
                        <ol className="works-chronology__list grid reveal-on-scroll">
                            <li className="works-chronology__year">
                                <h5 className="works-chronology__title"><span style={{ fontWeight: 'bold', color: '#e52323' }}>J</span><span style={{ fontWeight: 'bold', color: '#E9BC2D' }}>U</span><span style={{ fontWeight: 'bold', color: '#4CBF64' }}>J</span><span style={{ fontWeight: 'bold', color: '#52C3E1' }}>U</span></h5>
                                <ol>
                                    {videos2025.map((video, index) => (
                                        <VideoItem key={index} video={video} onVideoClick={handleVideoClick} />
                                    ))}
                                </ol>
                            </li>
                        </ol>
                    </section> */}

                    <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
        </div>
    );
};

export default JujuAIFilms;
