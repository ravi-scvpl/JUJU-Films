import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isLightTheme, setIsLightTheme] = React.useState(false);
    const location = useLocation();

    // Inline styles for footer
    const footerStyles = `
        ul.footer-inline-list {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            align-items: center !important;
            gap: 15px !important;
            list-style: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: auto !important;
        }
        
        ul.footer-inline-list > li {
            display: inline-flex !important;
            width: auto !important;
            flex: 0 0 auto !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        ul.footer-inline-list > li > a {
            display: inline-block !important;
            width: auto !important;
            white-space: nowrap !important;
        }
    `;

    React.useEffect(() => {
        // ALWAYS scroll to top on route change
        window.scrollTo(0, 0);

        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            if (window.scrollY > viewportHeight / 2) {
                setIsLightTheme(true);
            } else {
                setIsLightTheme(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // --- Scroll Reveal Observer ---
        const observerOptions = {
            threshold: 0.01, // Trigger almost immediately
            rootMargin: '0px 0px 0px 0px' // No offset, simpler behavior
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If intersecting, add the class
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // We DO NOT unobserve here. Keeping it active ensures that if React 
                    // re-renders and wipes the class, a subsequent scroll/observer event 
                    // will re-add it. It's a "self-healing" mechanism for the class.
                }
            });
        }, observerOptions);

        // Select and observe all elements with .reveal-on-scroll
        const observeElements = () => {
            const elements = document.querySelectorAll('.reveal-on-scroll');
            elements.forEach(el => observer.observe(el));
        };

        // Delay slightly to ensure DOM is ready? 
        // useEffect runs after render, but sometimes sub-components need a tick.
        setTimeout(observeElements, 100);

        // Observe DOM mutations to catch new elements (e.g. on route change)
        const mutationObserver = new MutationObserver((mutations) => {
            // Debounce or just run? For now, just run.
            observeElements();
        });

        const main = document.querySelector('main');
        if (main) {
            mutationObserver.observe(main, { childList: true, subtree: true });
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={`layout-wrapper ${isLightTheme ? 'theme-light' : ''}`}>
            <style>{footerStyles}</style>
            <header className="header">
                <div className="header__container">

                    <Link className="header__logo" to="/" aria-label="Homepage">
                        <img src="/juju-white-logo.webp" alt="JUJU Films" style={{ height: '25px' }} fetchPriority="high" />
                    </Link>

                    <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle Navigation">
                        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                    </button>

                    <nav className={`navigation ${isMenuOpen ? 'mobile-open' : ''}`}>
                        <ul className="navigation__list">

                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                            </li>
                            {/* <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/team" onClick={() => setIsMenuOpen(false)}>Collective</Link>
                            </li> */}
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/juju-storytellers" onClick={() => setIsMenuOpen(false)}>Storytellers</Link>
                            </li>
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/juju-commercials" onClick={() => setIsMenuOpen(false)}>Commercials </Link>
                            </li>
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/juju-ai-films" onClick={() => setIsMenuOpen(false)}>AI Films</Link>
                            </li>
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/case-studies" onClick={() => setIsMenuOpen(false)}>Case Studies</Link>
                            </li>
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/blog" onClick={() => setIsMenuOpen(false)}>Stories</Link>
                            </li>
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main style={{ marginBottom: 0 }} className="animate-enter">
                {children}
            </main>

            <footer className="footer parallax-section" style={{ marginTop: 0 }}>
                <div className="grid footer__container parallax-section__container">
                    <div pos="1-4">
                        <nav className="navigation navigation--footer">
                            <ul className="navigation__list">

                                <li className="navigation__item"><Link className="navigation__link" to="/brand-collabrations">Storytellers</Link></li>
                                <li className="navigation__item"><Link className="navigation__link" to="/juju-commercials">Commercials</Link></li>
                                <li className="navigation__item"><Link className="navigation__link" to="/juju-ai-lab">AI Films</Link></li>
                                <li className="navigation__item"><Link className="navigation__link" to="/contact">Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="grid subgrid footer__text-container" pos="7-12" pos-s="row">
                        <div pos="1-3" pos-s="row" className="footer__text">
                            <p className="p2">JUJU Films exists to build stories that last—stories created with intention, restraint, and respect for the audience. By bringing together creators, brands, and platforms under one collective, we design narratives that don’t chase attention, but earn it over time.</p>
                        </div>
                        <div pos="4-6" pos-s="row" className="footer__text">
                            <p className="p2">Because culture isn’t built through campaigns alone. It’s shaped through stories people choose to remember. And when brands help make those stories possible, they don’t just show up—they belong.</p>
                        </div>
                        <div pos="3-6" pos-s="row" className="footer__logo" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <img src="/juju-6.webp" alt="JUJU Films" style={{ maxWidth: '100%', height: '30vh' }} loading="lazy" />
                        </div>
                    </div>

                    <div pos="row" className="footer__bottom">
                        <div className="navigation navigation--bottom">
                            <div className="navigation__list">
                                <span className="footer__copyright">© 2026</span>
                                <nav className="navigation navigation--bottom">
                                    <ul className="navigation__list footer-inline-list">
                                        <li className="navigation__item "><a className="navigation__link" href="#">Privacy Policy</a></li>
                                        <li className="navigation__item "><a className="navigation__link" href="#">Terms of Use</a></li>
                                        <li className="navigation__item "><a className="navigation__link" href="#cookiesPopin">Disclaimer</a></li>
                                    </ul>
                                </nav>
                                <div className="navigation navigation--bottom">
                                    <div className="navigation__list">
                                        <div className="navigation__item">
                                            <a className="navigation__link" href="https://socialcloudventures.com/" target="_blank">Site by <span style={{ color: '#E52323' }}>SocialCloudVentures</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav className="navigation navigation--bottom">
                            <ul className="navigation__list footer-inline-list">
                                <li className="navigation__item "><a className="navigation__link" target="_blank" href="#" rel="noreferrer">Newsletter</a></li>
                                <li className="navigation__item "><a className="navigation__link" target="_blank" href="https://www.instagram.com/jujufilmsindia?igsh=eTNwcHZrNTR5cXFv" rel="noreferrer">Instagram</a></li>
                                <li className="navigation__item "><a className="navigation__link" target="_blank" href="https://www.facebook.com/share/17xYvGRBGJ/" rel="noreferrer">Facebook</a></li>
                                <li className="navigation__item "><a className="navigation__link" target="_blank" href="https://x.com/JujuFilmsIndia" rel="noreferrer">X</a></li>
                                <li className="navigation__item "><a className="navigation__link" target="_blank" href="https://in.pinterest.com/JujuFilmsIndia/" rel="noreferrer">Pinterest</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Layout;
