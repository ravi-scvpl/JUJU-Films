import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isLightTheme, setIsLightTheme] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            // Trigger transition when scrolled past 50% of viewport
            if (window.scrollY > viewportHeight / 2) {
                setIsLightTheme(true);
            } else {
                setIsLightTheme(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={`layout-wrapper ${isLightTheme ? 'theme-light' : ''}`}>
            <header className="header">
                <div className="header__container">

                    <Link className="header__logo" to="/" aria-label="Homepage">
                        <img src="/JUJU White logo.png" alt="JUJU Films" style={{ height: '25px' }} />
                    </Link>

                    <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle Navigation">
                        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                    </button>

                    <nav className={`navigation ${isMenuOpen ? 'mobile-open' : ''}`}>
                        <ul className="navigation__list">

                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                            </li>
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/juju-storytellers" onClick={() => setIsMenuOpen(false)}>Juju Storytellers</Link>
                            </li>
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/portfolio" onClick={() => setIsMenuOpen(false)}>Juju Commercials </Link>
                            </li>
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/juju-ai-films" onClick={() => setIsMenuOpen(false)}>Juju AI Films</Link>
                            </li>
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main style={{ marginBottom: 0 }}>
                {children}
            </main>

            <footer className="footer parallax-section" style={{ marginTop: 0 }}>
                <div className="grid footer__container parallax-section__container">
                    <div pos="1-4">
                        <nav className="navigation navigation--footer">
                            <ul className="navigation__list">

                                <li className="navigation__item"><Link className="navigation__link" to="/brand-collabrations">Storytellers</Link></li>
                                <li className="navigation__item"><Link className="navigation__link" to="/portfolio">Commercials</Link></li>
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
                            <img src="/JUJU-6.png" alt="JUJU Films" style={{ maxWidth: '100%', height: '20vh' }} />
                        </div>
                    </div>

                    <div pos="row" className="footer__bottom">
                        <div className="navigation navigation--bottom">
                            <div className="navigation__list">
                                <span className="footer__copyright">© 2002 — 2026</span>
                                <nav className="navigation navigation--bottom">
                                    <ul className="navigation__list">
                                        <li className="navigation__item "><a className="navigation__link" href="#">Coworking Lyon</a></li>
                                        <li className="navigation__item "><a className="navigation__link" href="#">Shared library</a></li>
                                        <li className="navigation__item "><a className="navigation__link" href="#cookiesPopin">Cookies</a></li>
                                    </ul>
                                </nav>
                                <div className="navigation navigation--bottom">
                                    <div className="navigation__list">
                                        <div className="navigation__item">
                                            <a className="navigation__link" href="https://ocitocine.com/" target="_blank">Site by Ocitocine</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav className="navigation navigation--bottom">
                            <ul className="navigation__list">
                                <li className="navigation__item "><a className="navigation__link" target="_blank" href="#" rel="noreferrer">Newsletter</a></li>
                                <li className="navigation__item "><a className="navigation__link" target="_blank" href="#" rel="noreferrer">Behance</a></li>
                                <li className="navigation__item "><a className="navigation__link" target="_blank" href="#" rel="noreferrer">LinkedIn</a></li>
                                <li className="navigation__item "><a className="navigation__link" target="_blank" href="https://www.instagram.com/JUJUfilms/" rel="noreferrer">Instagram</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Layout;
