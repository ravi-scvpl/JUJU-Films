import React, { useEffect } from 'react';
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
        type: 'youtube',
        id: 'izgmb-V1_f0',
        title: 'Web Series',
        sector: 'Web Series',
        desc: ''
    },
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
    {
        type: 'playlist',
        id: 'PLKvLlzKDgCiqhCnUZgpaIxibHQTIaqvag',
        title: 'Podcast',
        sector: 'Podcast',
        desc: '',
        thumbId: 'vW2xnWs_kmw' // Using first video of playlist as thumb or handled by iframe
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
        type: 'local',
        src: '/local_assets/wp-content/uploads/2025/09/devoilement-logo-loop-1.mp4',
        thumb: '/local_assets/wp-content/uploads/2025/09/cs_elegy-gallimard-jeunesse-2560x1313.webp',
        title: 'Élégy',
        sector: 'Culture',
        desc: "Naming and visual identity for Gallimard Jeunesse's new \"Young Adult\" label.\nElegy explores teenage emotions through a poetic and mysterious graphic universe, between inner flame and magic potion.",
        link: '/portfolio/elegy/'
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
        link: '/portfolio/tanjazz-festival-jazz-maroc-identite-visuelle/'
    }
];

const VideoItem = ({ video }) => {
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
                <div className="work__thumbnail">
                    <div className="media">
                        <img
                            width="2560"
                            height="1575"
                            src={thumbSrc}
                            className=""
                            alt=""
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
};

const JujuStorytellers = () => {
    useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch">
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
        </div >
    );
};

export default JujuStorytellers;
