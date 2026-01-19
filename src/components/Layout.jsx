import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
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
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/brand-collabrations" onClick={() => setIsMenuOpen(false)}>Juju Storytellers</Link>
                            </li>
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/portfolio" onClick={() => setIsMenuOpen(false)}>Juju Commercials </Link>
                            </li>
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/juju-ai-lab" onClick={() => setIsMenuOpen(false)}>Juju AI Films</Link>
                            </li>
                            <li className="navigation__item">
                                <Link className="navigation__link" style={{ fontSize: '16px' }} to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                {children}
            </main>

            <footer className="footer parallax-section">
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
                            <p className="p2">JUJU Films supports brands that are keen to make design a driver of social and economic transformation, helping them meet the challenges of tomorrow.</p>
                        </div>
                        <div pos="4-6" pos-s="row" className="footer__text">
                            <p className="p2">We believe that a brand is a powerful tool for creating fresh narratives, uniting imaginations and shaping desirable futures.</p>
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
        </>
    );
};

export default Layout;
