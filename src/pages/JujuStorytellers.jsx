import React, { useEffect } from 'react';

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
                    <div className="grid hero__content">
                        <p pos="row" pos-s="row" className="hero__title">
                            Juju Storytellers
                        </p>
                        <h1 pos="5-12" pos-s="row" className="hero__description" style={{ fontWeight: '300', fontSize: '72px' }}>
                            <span style={{ color: '#FF2B2B' }}>Brand-funded original stories built</span> as cultural IP— <br />
                            with distribution baked in, and recall that compounds over time.
                        </h1>
                    </div>
                </header>

                {/* Spacing / Placeholder for future content to match layout height if needed */}
                <div style={{ height: '50vh' }}></div>
            </div>
        </div>
    );
};

export default JujuStorytellers;
