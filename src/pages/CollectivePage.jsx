import React, { useEffect } from 'react';
import CollectiveContent from '../components/about/CollectiveContent';
import SEO from '../components/SEO';

const CollectivePage = () => {
    useEffect(() => {
        document.body.classList.add('switch', 'collective-page');
        return () => {
            document.body.classList.remove('switch', 'collective-page');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ marginBottom: 0, paddingBottom: 0, backgroundColor: '#000' }}>
            <SEO
                title="Collective"
                description="Meet the collective of India's best storytellers."
                canonical="/team"
            />
            <div>
                <div style={{ minHeight: '50vh', padding: '0' }}>
                    <CollectiveContent />
                </div>
            </div>
        </div>
    );
};

export default CollectivePage;
