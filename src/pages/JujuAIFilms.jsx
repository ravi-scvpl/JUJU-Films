import React from 'react';
import { Link } from 'react-router-dom';
import BrandContactForm from '../components/BrandContactForm';
import VideoModal from '../components/VideoModal';
import SEO from '../components/SEO';

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

const JujuAIFilms = () => {
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

    React.useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch">
            <SEO
                title="AI Films"
                description="Cost-controlled, full-service brand IP—created entirely with AI."
                canonical="/juju-ai-films"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Juju AI Films",
                    "description": "Cost-controlled, full-service brand IP—created entirely with AI.",
                    "url": "https://jujufilms.com/juju-ai-films"
                }}
            />
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
        </div>
    );
};

export default JujuAIFilms;
