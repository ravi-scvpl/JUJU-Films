import React from 'react';
const aboutvideo = '/assets/juju-about.mp4';

const AboutDetailedContent = () => {

    const principles = [
        { number: "1", title: "WHY JUJU EXISTS", desc: "The world does not need more content. It needs fewer, better stories.Stories that people choose to watch. Stories that feel honest. Stories that stay long after campaigns end.JUJU exists because the traditional model rewards speed over substance, visibility over meaning, and control over trust. We believe the future belongs to stories built with patience, clarity, and long-term intent." },
        { number: "2", title: "THE COLLECTIVE MODEL", desc: "At JUJU, we don’t hire creators. We partner with them.Directors, cinematographers, writers, music directors, casting directors, and technologists collaborate as IP partners—not as resources on a roster. Ownership changes how stories are approached. It creates responsibility, pride, and care.This collective model allows us to move faster without cutting corners—and to scale without losing soul." },
        { number: "3", title: "HOW BRANDS FIT IN", desc: "Brands don’t come to JUJU to place messages. They come to enable stories.In our ecosystem, brands act as producers—funding original narratives that subtly carry intent, values, and presence. The brand doesn’t interrupt the story. It belongs inside the world of the story.This approach creates something advertising rarely does: subconscious, long-term recall.Because when audiences choose the story, they accept the brand that made it possible." },
        { number: "4", title: "THE ROLE OF TECHNOLOGY", desc: "At JUJU, technology is not the story. It is the enabler.AI helps us explore scripts faster, visualise worlds earlier, adapt stories regionally, and scale production intelligently. But emotion remains human. Judgment remains creative. Intent remains clear.We call this speed without soul loss." },
        { number: "5", title: "CULTURE OVER CLUTTER", desc: "We believe culture compounds while campaigns expire.JUJU is built for brands and creators who think in years, not weeks—who understand that meaning outlasts media plans, and memory outperforms frequency.We are not here to chase attention. We are here to earn it." }
    ];

    const services = [
        { title: "Storytellers", desc: "Original stories built as cultural IP—micro-dramas, series, and films designed for audiences, with distribution baked in from the start." },
        { title: "Commercials", desc: "High-impact film craft across TVCs, DVCs, vertical formats, and digital content—built for credibility, not interruption." },
        { title: "AI Films", desc: "Cost-controlled, full-service brand IP created entirely through AI—designed to scale narratives efficiently while keeping emotion and narrative control intact." },
        { title: "AN INVITATION", desc: "JUJU Films is not for everyone.It is for brands that want to belong, not shout. For creators who want ownership, not instructions. For platforms that value originality over volume.If this way of thinking resonates,you already understand what JUJU is building." }
    ];

    return (
        <div className="about-detailed-content" style={{ marginTop: 0, paddingBottom: '80px' }}>

            {/* Our Commitments */}
            <section className="section grid reveal-on-scroll" style={{ display: 'grid', marginBottom: '100px' }}>
                <div className="our-philosophy-content" style={{ gridColumn: '5 / 13', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h2 className="h2" style={{ borderBottom: '1px solid #333', paddingBottom: '20px' }}>Our Philosophy</h2>
                    </div>
                    <div className="ourPhilosophy">
                        <div className="ourPhilosophy__item" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
                            <h3 className="ourPhilosophy__item__title" style={{ gridColumn: '1 / 5', marginTop: 0 }}>Story first. Always.
                            </h3>
                            <p className="ourPhilosophy__item__desc" style={{ gridColumn: '6 / 13', margin: 0 }}>Every decision at JUJU—creative, commercial, or technological—is measured against this principle.
                                If something serves the story, it belongs.<br />
                                If it doesn’t, it doesn’t matter how efficient, profitable, or popular it is.<br />
                                This philosophy protects the audience.
                                It protects creators.<br />
                                And in the long run, it protects brands.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="section reveal-on-scroll" style={{ marginBottom: '100px', textAlign: 'center' }}>
                <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
                    <div style={{ gridColumn: '2 / 12' }}>
                        <h2 style={{ fontSize: '48px', lineHeight: '1.2', fontWeight: '400' }}>
                            <span style={{ color: '#e52323' }}>Understand complexity</span>. Design <span style={{ color: '#e52323' }}>simple strategies</span>. Develop <span style={{ color: '#e52323' }}>original</span>, agile, and sustainable solutions.
                        </h2>
                    </div>
                </div>
            </section>

            {/* Numbered Principles */}
            <section className="section reveal-on-scroll" style={{ marginBottom: '100px' }}>
                <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>

                    <div style={{ gridColumn: '1 / 13' }}>
                        {principles.map((item, index) => (
                            <div key={index} style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(12, 1fr)',
                                gap: '20px',
                                padding: '40px 0',
                                backgroundColor: index % 2 === 0 ? '#F5F5F5' : 'transparent', // Alternating background
                                color: '#111'
                            }}>
                                <div style={{ gridColumn: '2 / 3', fontSize: '64px', fontWeight: '300', lineHeight: 1, marginTop: '10px' }}>{item.number}</div>
                                <div style={{ gridColumn: '4 / 12' }}>
                                    <h3 style={{ fontSize: '24px', fontWeight: '400', marginBottom: '10px', marginTop: 0 }}>{item.title}</h3>
                                    <p style={{ fontSize: '18px' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Office Image */}
            <section className="section reveal-on-scroll" style={{ marginBottom: '100px' }}>
                <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
                    <div className="office-image-container" style={{ gridColumn: '5 / 13' }}>
                        <video
                            height={500}
                            width={800}
                            loop
                            muted
                            playsInline
                            onContextMenu={(e) => e.preventDefault()}
                            controlsList="nodownload"
                        >
                            <source src={aboutvideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </section>

            {/* Services and Professions */}
            {/* Services and Professions */}
            <section className="grid reveal-on-scroll services-section">
                <div className="services-header">
                    <h2 className="h2" style={{ borderBottom: '1px solid #333', paddingBottom: '20px' }}>What we build</h2>
                    <p>JUJU Films operates across three focused verticals—each serving a distinct role, all guided by the same philosophy.
                    </p>
                </div>
                {services.map((service, index) => (
                    <div key={index} className="service-item" data-index={index}>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '20px' }}>{service.title}</h4>
                        <p>{service.desc}</p>
                    </div>
                ))}
            </section>

        </div>
    );
};

export default AboutDetailedContent;
