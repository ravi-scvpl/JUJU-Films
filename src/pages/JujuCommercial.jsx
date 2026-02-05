import React from 'react';
import { Link } from 'react-router-dom';
import BrandContactForm from '../components/BrandContactForm';

const videos2025 = [
    {
        type: 'youtube',
        id: 'LvE2Rd0IHks',
        title: 'La Compagnie des Animaux',
        sector: 'Consulting & Services',
        desc: 'A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.'
    },
    // {
    //     type: 'youtube',
    //     id: 'YJBpPx3-ntM',
    //     title: 'La Compagnie des Animaux',
    //     sector: 'Consulting & Services',
    //     desc: 'A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.'
    // },
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
        type: 'local',
        src: '/local_assets/wp-content/uploads/2025/09/devoilement-logo-loop-1.mp4',
        thumb: '/local_assets/wp-content/uploads/2025/09/cs_elegy-gallimard-jeunesse-2560x1313.webp',
        title: 'Élégy',
        sector: 'Culture',
        desc: "Naming and visual identity for Gallimard Jeunesse's new \"Young Adult\" label.\nElegy explores teenage emotions through a poetic and mysterious graphic universe, between inner flame and magic potion.",
        link: '/juju-commercials/elegy/'
    }
];

const videos2024 = [
    {
        type: 'local',
        src: '/local_assets/wp-content/uploads/2024/09/tanjazz-logo.mp4',
        thumb: '/local_assets/wp-content/uploads/2024/09/00_tanjazz-logo-identitevisuelle-branding-graphisme-affiche-2-2560x1583.webp',
        title: 'Tanjazz',
        sector: 'Culture',
        desc: 'Visual identity for Tanjazz, the jazz festival of Tangier (Morocco). A typographic and musical effervescence.',
        link: '/juju-commercials/tanjazz-festival-jazz-maroc-identite-visuelle/'
    }
];

const VideoItem = ({ video }) => (
    <li className="work">
        <div className="work__container grid">
            <div className="work__thumbnail">
                <div className="media">
                    <img
                        width="2560"
                        height="1575"
                        src={video.type === 'youtube' ? `https://img.youtube.com/vi/${video.id}/hqdefault.jpg` : video.thumb}
                        className=""
                        alt=""
                        loading="lazy"
                        sizes="auto"
                        decoding="async"
                    />
                </div>
                <div className="work__thumbnail-over" aria-hidden="true">
                    {video.type === 'youtube' ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            style={{ pointerEvents: 'none' }}
                        ></iframe>
                    ) : (
                        <video src={video.src} muted playsInline loop></video>
                    )}
                </div>
            </div>
            <Link className="work__link" to={video.link || "#"} aria-label={video.title}>
                <h3 className="work__title">{video.title}</h3>
                <span className="work__sector">{video.sector}</span>
            </Link>
            <div className="work__excerpt">
                <p>{video.desc}</p>
            </div>
        </div>
    </li>
);

const JujuCommercial = () => {
    React.useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="page-template page-template-page-archive-work-chronological page-template-page-archive-work-chronological-php page page-id-1601 wp-theme-grapheine switch">
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
                        <h5 className="works-chronology__title">2025</h5>
                        <ol>
                            {videos2025.map((video, index) => (
                                <VideoItem key={index} video={video} />
                            ))}
                        </ol>
                    </li>
                    <li className="works-chronology__year">
                        <h5 className="works-chronology__title">2024</h5>
                        <ol>
                            {videos2024.map((video, index) => (
                                <VideoItem key={index} video={video} />
                            ))}
                        </ol>
                    </li>
                </ol>
            </section>
            <BrandContactForm />
        </div>
    );
};

export default JujuCommercial;
