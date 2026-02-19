import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BrandContactForm from '../components/BrandContactForm';
import '../styles/juju-overrides.css';
import SEO from '../components/SEO';

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


import VideoModal from '../components/VideoModal';

const VideoItem = ({ video, onVideoClick }) => {
    const [isHovered, setIsHovered] = React.useState(false);
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
    const [selectedVideo, setSelectedVideo] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch">
            <SEO
                title="Storytellers"
                description="Brand-funded original stories built as cultural IP—with distribution baked in."
                canonical="/juju-storytellers"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Juju Storytellers",
                    "description": "Brand-funded original stories built as cultural IP—with distribution baked in.",
                    "url": "https://www.jujuindia.com/juju-storytellers"
                }}
            />
            <div>
                <header className="hero">
                    <div className="grid hero__content reveal-on-scroll">
                        <p pos="row" pos-s="row" className="hero__title">
                            Juju Storytellers
                        </p>
                        <h1 pos="5-12" pos-s="row" className="hero__description" style={{ fontWeight: '300', fontSize: '72px' }}>
                            <span style={{ color: '#FF2B2B' }}>Brand-funded original stories built</span> as cultural IP—
                            with distribution baked in, and recall that compounds over time.
                        </h1>
                    </div>
                </header>
                <section className="works-chronology">
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
                </section>
                <BrandContactForm />
                <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </div >
    );
};

export default JujuStorytellers;
