import React, { useState, useEffect } from 'react';

const CollectiveContent = () => {
    const [teamData, setTeamData] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        fetch('/blog/team_profile.json')
            .then(res => res.json())
            .then(data => setTeamData(data))
            .catch(err => console.error("Error fetching team profiles:", err));
    }, []);

    if (!teamData) return <div style={{ padding: '0 5vw', color: '#fff' }}>Loading...</div>;

    // Get all unique categories
    const categories = ['All', ...teamData.categories.map(c => c.category)];

    // Filter items
    let displayedItems = [];
    if (activeCategory === 'All') {
        teamData.categories.forEach(cat => {
            cat.items.forEach(item => {
                displayedItems.push({ ...item, role: cat.category });
            });
        });
    } else {
        const categoryData = teamData.categories.find(c => c.category === activeCategory);
        if (categoryData) {
            displayedItems = categoryData.items.map(item => ({ ...item, role: categoryData.category }));
        }
    }

    return (
        <>
            <header className="hero" style={{ minHeight: 'auto', paddingBottom: '0', backgroundColor: '#000', color: '#fff' }}>
                <div className="hero__tabs" style={{ marginBottom: '0px', borderBottom: '1px solid #333' }}>
                    <nav className="tabs" style={{ marginBottom: '-1px' }}>
                        <ul className="tabs__list">
                            {categories.map((cat, index) => (
                                <li key={index} className={`tab ${activeCategory === cat ? 'tab--active' : ''}`}>
                                    <button
                                        className="tab__link"
                                        onClick={() => setActiveCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Title */}
                <div className="grid hero__content reveal-on-scroll" style={{ paddingTop: '80px', position: 'relative', zIndex: 2 }}>
                    <h1 pos="row" pos-s="row" className="hero__title" style={{ marginTop: 0, paddingBottom: 0, fontSize: '32px' }}>
                        {teamData.title}
                    </h1>
                </div>
            </header>

            {/* Grid - 3 Columns */}
            <section className="section" style={{ backgroundColor: '#000', color: '#fff', paddingTop: '40px' }}>
                <div className="grid reveal-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', padding: '0 5vw 40px' }}>
                    {displayedItems.map((member, index) => (
                        <a
                            key={index}
                            href={member.profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', display: 'block' }}
                        >
                            <div style={{ transition: 'opacity 0.3s', cursor: 'pointer' }}>
                                <img
                                    src={member.image || `https://placehold.co/600x800/222/fff?text=${encodeURIComponent(member.name)}`}
                                    alt={`${member.name} - ${member.role} - JujuFilms`}
                                    style={{
                                        width: '100%',
                                        aspectRatio: '3/4', // Taller portrait for 3-col
                                        objectFit: 'cover',
                                        display: 'block',
                                        marginBottom: '15px',
                                        filter: 'grayscale(100%)',
                                        borderRadius: '4px'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                                    onMouseOut={e => e.currentTarget.style.filter = 'grayscale(100%)'}
                                />
                                <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 5px 0', color: '#fff' }}>{member.name}</h3>
                                <p style={{ fontSize: '16px', margin: 0, color: '#E52323', textTransform: 'uppercase' }}>{member.role}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
};

export default CollectiveContent;
