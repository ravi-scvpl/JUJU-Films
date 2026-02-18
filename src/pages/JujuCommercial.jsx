import React from 'react';
import { Link } from 'react-router-dom';
import BrandContactForm from '../components/BrandContactForm';
import '../styles/juju-overrides.css';
import SEO from '../components/SEO';

const videos2025 = [
    {
        type: 'youtube',
        id: 'YJBpPx3-ntM',
        title: 'La Compagnie des Animaux',
        sector: 'Consulting & Services',
        desc: 'A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.'
    },
    {
        type: 'youtube',
        id: 'V4Z0G3Kwnc8',
        title: 'La Compagnie des Animaux',
        sector: 'Consulting & Services',
        desc: 'A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.'
    },
    {
        type: 'youtube',
        id: 'J8VZpw8gxdI',
        title: 'La Compagnie des Animaux',
        sector: 'Consulting & Services',
        desc: 'A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.'
    },
    {
        type: 'youtube',
        id: '61NCfL7kZj0',
        title: 'La Compagnie des Animaux',
        sector: 'Consulting & Services',
        desc: 'A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.'
    },
    {
        type: 'youtube',
        id: 'YGAy_eL4RDg',
        title: 'Commercial',
        sector: 'Ad Film',
        desc: ''
    },
    {
        type: 'youtube',
        id: '7WyTta2EuDc',
        title: 'Commercial',
        sector: 'Ad Film',
        desc: ''
    },
    {
        type: 'youtube',
        id: '8Y7gkcyg1XE',
        title: 'Commercial',
        sector: 'Ad Film',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'UEU9h7DTWw4',
        title: 'Commercial',
        sector: 'Ad Film',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'NqMT1MppLzY',
        title: 'Commercial',
        sector: 'Ad Film',
        desc: ''
    },
    {
        type: 'youtube',
        id: '8HdSWVHJkt0',
        title: 'Commercial',
        sector: 'Ad Film',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'lShL29tBky8',
        title: 'Commercial',
        sector: 'Ad Film',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'sY6W3KZHUXg',
        title: 'Commercial',
        sector: 'Ad Film',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'AzoH0PRJcC8',
        title: 'Commercial',
        sector: 'Ad Film',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'G8KKSlrt0tY',
        title: 'Commercial',
        sector: 'Ad Film',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'GezWesIniTY',
        title: 'Commercial',
        sector: 'Ad Film',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'Sgrl7sbtdoY',
        title: 'Commercial',
        sector: 'Ad Film',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'YBghJkyU938',
        title: 'Super Viral',
        sector: 'Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'L7p9E-ZdR1Q',
        title: 'TV Ad - Bumrah',
        sector: 'TV Commercial',
        desc: ''
    },

    {
        type: 'youtube',
        id: 'CJVECSrHeSM',
        title: 'JKC WallMaxx',
        sector: 'TV Ad Series',
        desc: ''
    },
    {
        type: 'youtube',
        id: '2L9tPbbV5GU',
        title: 'JKC WallMaxx',
        sector: 'TV Ad Series',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'vXoDDQXbcfQ',
        title: 'JKC WallMaxx',
        sector: 'TV Ad Series',
        desc: ''
    },
    {
        type: 'youtube',
        id: '_XgGuHhuYd8',
        title: 'JKC WallMaxx',
        sector: 'TV Ad Series',
        desc: ''
    },
    {
        type: 'playlist',
        id: 'PL4Pr7GpGLlWOhhU0WpkUYpa9wqYfOerKe',
        title: 'Sunrooof',
        sector: 'Commercial Series',
        desc: '',
        thumbId: 'JusWq4P8Qvs'
    },
    {
        type: 'youtube',
        id: '9tU0-qx-DHg',
        title: 'Sunrooof',
        sector: 'Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'tE9ZWNRDH8I',
        title: 'Celeb',
        sector: 'Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'dMpTFXKBWzI',
        title: 'India Gate Basmati',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'EK0jT9JCACQ',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'vimeo',
        id: '729945070',
        title: 'Biryani By Kilo',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'wPPv4QCTCTE',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'hcHk_EvKEQo',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'HlIx0_OojO4',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'HlT_IjnsBkY',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'QnGob2Ss3pw',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'playlist',
        id: 'PLKvLlzKDgCirI5JMdCy8RPgH9QDX0Gyql',
        title: 'JK Super Series',
        sector: 'TV Ad Series',
        desc: '',
        thumbId: 'vW2xnWs_kmw'
    },
    {
        type: 'youtube',
        id: 'IkZn5nRR4yY',
        title: 'Musical',
        sector: 'Music Video',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'S0gWCdpVGPA',
        title: 'Social Video',
        sector: 'Social Media',
        desc: ''
    },
    {
        type: 'playlist',
        id: 'PL4Pr7GpGLlWOBQu2l7E3FQu8G13sU2J-r',
        title: 'Magppie',
        sector: 'Brand Story',
        desc: '',
        thumbId: 'JusWq4P8Qvs'
    },
    {
        type: 'youtube',
        id: 'VIvleyU2mpY',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'U3VjsW9g6ik',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'aiT2FazV4vg',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'uHTGf034sRU',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'rDl6Fe0nTAg',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'qe2Mt5K85aI',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: '6N45mZsgjp4',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'ZVR1-345PEI',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: '6eLVK_uttmc',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'fe4Wq5jw8Dc',
        title: 'Commercial',
        sector: 'TV Commercial',
        desc: ''
    },
    {
        type: 'youtube',
        id: 'St1x3EjrpM0',
        title: 'Commercial',
        sector: 'TV Commercial',
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

const JujuCommercial = () => {
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
        <div className="page-template page-template-page-archive-work-chronological page-template-page-archive-work-chronological-php page page-id-1601 wp-theme-grapheine switch">
            <SEO
                title="Commercials"
                description="High-impact film craft across TVC, DVC, vertical and digital—built to command attention, not interrupt it."
                canonical="/juju-commercials"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Juju Commercials",
                    "description": "High-impact film craft across TVC, DVC, vertical and digital.",
                    "url": "https://jujufilms.com/juju-commercials"
                }}
            />
            <header className="hero">
                <div className="grid hero__content reveal-on-scroll">
                    <p pos="row" pos-s="row" className="hero__title">
                        Juju Commercials
                    </p>
                    <h1 pos="5-12" pos-s="row" className="hero__description" style={{ fontWeight: '300', fontSize: '72px' }}>
                        <span style={{ color: '#FF2B2B' }}>High-impact film craft
                            across </span> as cultural IP
                        TVC, DVC, vertical and digital—
                        built to command attention,
                        not interrupt it.
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
    );
};

export default JujuCommercial;
