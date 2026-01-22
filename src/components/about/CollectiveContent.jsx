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
        <section className="section" style={{ paddingTop: 0, marginTop: '-1px', paddingBottom: 0, marginBottom: 0, backgroundColor: '#000', color: '#fff' }}>
            <div className="hero__tabs" style={{ marginBottom: '40px' }}>
                <nav className="tabs">
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

            <div className="grid hero__content" style={{ paddingTop: 0, marginTop: 0 }}>
                <p pos="row" pos-s="row" className="hero__title" style={{ marginTop: 0, paddingBottom: '20px' }}>
                    {teamData.title}
                </p>
            </div>

            {/* Grid */}
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '40px', padding: '0 5vw 100px' }}>
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
                                src={`https://placehold.co/400x500/222/fff?text=${encodeURIComponent(member.name)}`}
                                alt={member.name}
                                style={{
                                    width: '100%',
                                    aspectRatio: '4/5',
                                    objectFit: 'cover',
                                    display: 'block',
                                    marginBottom: '15px',
                                    filter: 'grayscale(100%)',
                                    borderRadius: '4px'
                                }}
                                onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                                onMouseOut={e => e.currentTarget.style.filter = 'grayscale(100%)'}
                            />
                            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 5px 0', color: '#fff' }}>{member.name}</h3>
                            <p style={{ fontSize: '14px', margin: 0, color: '#E52323', textTransform: 'uppercase' }}>{member.role}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default CollectiveContent;
