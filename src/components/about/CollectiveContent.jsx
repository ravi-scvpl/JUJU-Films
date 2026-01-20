import React from 'react';

const CollectiveContent = () => {
    const team = [
        { name: "Quentin Petiteau", role: "Art Director", img: "https://placehold.co/400x500" },
        { name: "Élodie Drean", role: "Project Management Assistant", img: "https://placehold.co/400x500" },
        { name: "Lucas Bernard", role: "Graphic Designer & Character Designer", img: "https://placehold.co/400x500" },
        { name: "Eugénie Bergeon", role: "Artistic Director", img: "https://placehold.co/400x500" },
    ];

    return (
        <section className="section" style={{ paddingTop: 0, marginTop: 0 }}>
            <div className="grid" style={{ margin: 0, padding: 0 }}>
                <div pos="row" className="text" style={{ marginBottom: '40px', marginTop: 0, paddingTop: 0 }}>
                    <h2 style={{ marginTop: 0 }}>Team</h2>
                </div>
                <div className="grid subgrid" pos="row" style={{ gap: '20px' }}>
                    {team.map((member, index) => (
                        <div key={index} pos={index % 4 === 0 ? "1-3" : "auto"} style={{ marginBottom: '40px' }}>
                            <img src={member.img} alt={member.name} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block', marginBottom: '10px' }} />
                            <h3 style={{ fontSize: '18px', margin: '0 0 5px 0' }}>{member.name}</h3>
                            <p style={{ fontSize: '14px', margin: 0, color: '#888' }}>{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CollectiveContent;
