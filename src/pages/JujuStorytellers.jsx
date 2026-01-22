import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BrandContactForm from '../components/BrandContactForm';

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
                                <li className="work">
                                    <div className="work__container grid">
                                        <div className="work__thumbnail">
                                            <div className="media">
                                                <img width="2560" height="1575"
                                                    src="/thumbnails/video_thumb.jpg"
                                                    className="" alt="" loading="lazy" sizes="auto" decoding="async" />
                                            </div>
                                            <div className="work__thumbnail-over" aria-hidden="true">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src="https://www.youtube.com/embed/LvE2Rd0IHks?autoplay=1&mute=1&controls=0&loop=1&playlist=LvE2Rd0IHks"
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    style={{ pointerEvents: 'none' }}
                                                ></iframe>
                                            </div>
                                        </div>
                                        <Link className="work__link" to="/portfolio/la-compagnie-des-animaux/" aria-label="The Animal Company">
                                            <h3 className="work__title">La Compagnie des Animaux</h3>
                                            <span className="work__sector">Consulting & Services</span>
                                        </Link>
                                        <div className="work__excerpt">
                                            <p>A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="work">
                                    <div className="work__container grid">
                                        <div className="work__thumbnail">
                                            <div className="media">
                                                <img width="2560" height="1575"
                                                    src="/thumbnails/video_thumb.jpg"
                                                    className="" alt="" loading="lazy" sizes="auto" decoding="async" />
                                            </div>
                                            <div className="work__thumbnail-over" aria-hidden="true">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src="https://www.youtube.com/embed/IkZn5nRR4yY?autoplay=1&mute=1&controls=0&loop=1&playlist=LvE2Rd0IHks"
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    style={{ pointerEvents: 'none' }}
                                                ></iframe>
                                            </div>
                                        </div>
                                        <Link className="work__link" to="/portfolio/la-compagnie-des-animaux/" aria-label="The Animal Company">
                                            <h3 className="work__title">La Compagnie des Animaux</h3>
                                            <span className="work__sector">Consulting & Services</span>
                                        </Link>
                                        <div className="work__excerpt">
                                            <p>A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="work">
                                    <div className="work__container grid">
                                        <div className="work__thumbnail">
                                            <div className="media">
                                                <img width="2560" height="1575"
                                                    src="/thumbnails/video_thumb.jpg"
                                                    className="" alt="" loading="lazy" sizes="auto" decoding="async" />
                                            </div>
                                            <div className="work__thumbnail-over" aria-hidden="true">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src="https://www.youtube.com/embed/LvE2Rd0IHks?autoplay=1&mute=1&controls=0&loop=1&playlist=LvE2Rd0IHks"
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    style={{ pointerEvents: 'none' }}
                                                ></iframe>
                                            </div>
                                        </div>
                                        <Link className="work__link" to="/portfolio/la-compagnie-des-animaux/" aria-label="The Animal Company">
                                            <h3 className="work__title">La Compagnie des Animaux</h3>
                                            <span className="work__sector">Consulting & Services</span>
                                        </Link>
                                        <div className="work__excerpt">
                                            <p>A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="work">
                                    <div className="work__container grid">
                                        <div className="work__thumbnail">
                                            <div className="media">
                                                <img width="2560" height="1575"
                                                    src="/thumbnails/video_thumb.jpg"
                                                    className="" alt="" loading="lazy" sizes="auto" decoding="async" />
                                            </div>
                                            <div className="work__thumbnail-over" aria-hidden="true">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src="https://www.youtube.com/embed/LvE2Rd0IHks?autoplay=1&mute=1&controls=0&loop=1&playlist=LvE2Rd0IHks"
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    style={{ pointerEvents: 'none' }}
                                                ></iframe>
                                            </div>
                                        </div>
                                        <Link className="work__link" to="/portfolio/la-compagnie-des-animaux/" aria-label="The Animal Company">
                                            <h3 className="work__title">La Compagnie des Animaux</h3>
                                            <span className="work__sector">Consulting & Services</span>
                                        </Link>
                                        <div className="work__excerpt">
                                            <p>A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="work">
                                    <div className="work__container grid">
                                        <div className="work__thumbnail">
                                            <div className="media">
                                                <img width="2560" height="1575"
                                                    src="/thumbnails/video_thumb.jpg"
                                                    className="" alt="" loading="lazy" sizes="auto" decoding="async" />
                                            </div>
                                            <div className="work__thumbnail-over" aria-hidden="true">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src="https://www.youtube.com/embed/LvE2Rd0IHks?autoplay=1&mute=1&controls=0&loop=1&playlist=LvE2Rd0IHks"
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    style={{ pointerEvents: 'none' }}
                                                ></iframe>
                                            </div>
                                        </div>
                                        <Link className="work__link" to="/portfolio/la-compagnie-des-animaux/" aria-label="The Animal Company">
                                            <h3 className="work__title">La Compagnie des Animaux</h3>
                                            <span className="work__sector">Consulting & Services</span>
                                        </Link>
                                        <div className="work__excerpt">
                                            <p>A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="work">
                                    <div className="work__container grid">
                                        <div className="work__thumbnail">
                                            <div className="media">
                                                <img width="2560" height="1575"
                                                    src="/thumbnails/video_thumb.jpg"
                                                    className="" alt="" loading="lazy" sizes="auto" decoding="async" />
                                            </div>
                                            <div className="work__thumbnail-over" aria-hidden="true">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src="https://www.youtube.com/embed/LvE2Rd0IHks?autoplay=1&mute=1&controls=0&loop=1&playlist=LvE2Rd0IHks"
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    style={{ pointerEvents: 'none' }}
                                                ></iframe>
                                            </div>
                                        </div>
                                        <Link className="work__link" to="/portfolio/la-compagnie-des-animaux/" aria-label="The Animal Company">
                                            <h3 className="work__title">La Compagnie des Animaux</h3>
                                            <span className="work__sector">Consulting & Services</span>
                                        </Link>
                                        <div className="work__excerpt">
                                            <p>A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="work">
                                    <div className="work__container grid">
                                        <div className="work__thumbnail">
                                            <div className="media">
                                                <img width="2560" height="1575"
                                                    src="/thumbnails/video_thumb.jpg"
                                                    className="" alt="" loading="lazy" sizes="auto" decoding="async" />
                                            </div>
                                            <div className="work__thumbnail-over" aria-hidden="true">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src="https://www.youtube.com/embed/LvE2Rd0IHks?autoplay=1&mute=1&controls=0&loop=1&playlist=LvE2Rd0IHks"
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    style={{ pointerEvents: 'none' }}
                                                ></iframe>
                                            </div>
                                        </div>
                                        <Link className="work__link" to="/portfolio/la-compagnie-des-animaux/" aria-label="The Animal Company">
                                            <h3 className="work__title">La Compagnie des Animaux</h3>
                                            <span className="work__sector">Consulting & Services</span>
                                        </Link>
                                        <div className="work__excerpt">
                                            <p>A visual identity to make veterinary advice accessible; a logo embodying expertise, proximity, and animal well-being.</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="work">
                                    <div className="work__container grid">
                                        <div className="work__thumbnail">
                                            <div className="media">
                                                <img width="2560" height="1313"
                                                    src="/local_assets/wp-content/uploads/2025/09/cs_elegy-gallimard-jeunesse-2560x1313.webp"
                                                    className="" alt="" loading="lazy" sizes="auto" decoding="async" />
                                            </div>
                                            <div className="work__thumbnail-over" aria-hidden="true">
                                                <video src="/local_assets/wp-content/uploads/2025/09/devoilement-logo-loop-1.mp4" muted playsInline loop></video>
                                            </div>
                                        </div>
                                        <Link className="work__link" to="/portfolio/elegy/" aria-label="Elegy">
                                            <h3 className="work__title">Élégy</h3>
                                            <span className="work__sector">Culture</span>
                                        </Link>
                                        <div className="work__excerpt">
                                            <p>Naming and visual identity for Gallimard Jeunesse's new "Young Adult" label.<br />
                                                Elegy explores teenage emotions through a poetic and mysterious graphic universe, between inner flame and magic potion.</p>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </li>
                        <li className="works-chronology__year">
                            <h5 className="works-chronology__title">2024</h5>
                            <ol>
                                <li className="work">
                                    <div className="work__container grid">
                                        <div className="work__thumbnail">
                                            <div className="media">
                                                <img width="2560" height="1583"
                                                    src="/local_assets/wp-content/uploads/2024/09/00_tanjazz-logo-identitevisuelle-branding-graphisme-affiche-2-2560x1583.webp"
                                                    className="" alt="" loading="lazy" sizes="auto" decoding="async" />
                                            </div>
                                            <div className="work__thumbnail-over" aria-hidden="true">
                                                <video src="/local_assets/wp-content/uploads/2024/09/tanjazz-logo.mp4" muted playsInline loop></video>
                                            </div>
                                        </div>
                                        <Link className="work__link" to="/portfolio/tanjazz-festival-jazz-maroc-identite-visuelle/" aria-label="Tanjazz">
                                            <h3 className="work__title">Tanjazz</h3>
                                            <span className="work__sector">Culture</span>
                                        </Link>
                                        <div className="work__excerpt">
                                            <p>Visual identity for Tanjazz, the jazz festival of Tangier (Morocco). A typographic and musical effervescence.</p>
                                        </div>
                                    </div>
                                </li>
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
