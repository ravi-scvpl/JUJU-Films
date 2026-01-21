import React from 'react';

const CollectiveContent = () => {
    const team = [
        { name: "Élodie Drean", role: "Project Management Assistant", img: "https://placehold.co/400x500/333/999" },
        { name: "Tiphaine Guillermou", role: "Editor", img: "https://placehold.co/400x500/333/999" },
        { name: "Céline Boursin", role: "Director of Operations", img: "https://placehold.co/400x500/333/999" },
        { name: "Mathéo Roy", role: "Graphic Designer", img: "https://placehold.co/400x500/333/999" },
        { name: "Mathéo Roy", role: "Graphic Designer", img: "https://placehold.co/400x500/333/999" },
    ];

    return (
        <section className="section" style={{ paddingTop: 0, marginTop: '-1px', paddingBottom: 0, marginBottom: 0, backgroundColor: '#000', color: '#fff' }}>
            <div className="grid hero__content" style={{ paddingTop: 0, marginTop: 0 }}>
                <p pos="row" pos-s="row" className="hero__title" style={{ marginTop: 0, paddingBottom: '20px' }}>
                    Teams
                </p>

            </div>
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {team.map((member, index) => (
                    <div key={index}>
                        <img
                            src={member.img}
                            alt={member.name}
                            style={{
                                width: '100%',
                                aspectRatio: '4/5',
                                objectFit: 'cover',
                                display: 'block',
                                marginBottom: '15px',
                                filter: 'grayscale(100%)'
                            }}
                        />
                        <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 5px 0', color: '#fff' }}>{member.name}</h3>
                        <p style={{ fontSize: '14px', margin: 0, color: '#888' }}>{member.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CollectiveContent;
