import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import ContentPillars from '../components/storytellers/StorytellersDetailedContent';
import VideoModal from '../components/VideoModal';
import AboutMediaGrid from '../components/about/AboutMediaGrid';
import storytellingvideo from '../assets/juju_storytelling.mp4';

const videos2025 = [
    {
        type: 'youtube',
        id: 'Gxon0EKK9go',
        title: 'Super Viral',
        sector: 'Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'Q_uknieIwf4',
        title: 'Super Viral',
        sector: 'Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'PiOQwKAAbn8',
        title: 'Super Viral',
        sector: 'Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: '89Ci5qAVfVY',
        title: 'Super Viral',
        sector: 'Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'izgmb-V1_f0',
        title: 'Web Series',
        sector: 'Web Series',
        desc: ''
    },
    {
        type: 'playlist',
        id: 'PLKvLlzKDgCiqhCnUZgpaIxibHQTIaqvag',
        title: 'Podcast',
        sector: 'Podcast',
        desc: '',
        thumbId: 'vW2xnWs_kmw' // Using first video of playlist as thumb or handled by iframe
    },
    {
        type: 'youtube',
        id: 'wq2KjP5QCk8',
        title: 'Celeb - Super Viral',
        sector: 'Commercial',
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

const JujuStorytellers = () => {
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
                title="JUJU Storytellers | Web Series & Micro Dramas"
                description="Crafting engaging web series and vertical micro drama series. Long-form social content that resonates."
            />
            <main id="content" role="main" className="content">
                {/* Hero Section */}
                <div className="text reveal-on-scroll" style={{ margin: 0, paddingBottom: 50, paddingTop: 150 }}>
                    <div className="grid hero__content" style={{ paddingTop: 0, marginTop: 0 }}>
                        <p pos="row" pos-s="row" className="hero__title" style={{ fontSize: '36px', marginTop: 0 }}>
                            <span style={{ fontWeight: 'bold', color: '#e52323' }}>J</span><span style={{ fontWeight: 'bold', color: '#E9BC2D' }}>U</span><span style={{ fontWeight: 'bold', color: '#4CBF64' }}>J</span><span style={{ fontWeight: 'bold', color: '#52C3E1' }}>U</span> Storytellers
                        </p>
                        <h1 pos="5-12" pos-s="row" className="hero__description" style={{ fontWeight: '300', fontSize: '64px' }}>
                            <span>Music Videos. <br />  Vertical Micro Drama Series. <br /> Long-Form Social Content. <br /> OTT Web Series </span>
                        </h1>
                    </div>
                </div>

                <AboutMediaGrid videoSrc={storytellingvideo} />

                <section className="reveal-on-scroll" style={{ padding: '0px 0 0' }}>
                    <ContentPillars />
                </section>

                <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeModal} />
            </main>
        </div>
    );
};

export default JujuStorytellers;
