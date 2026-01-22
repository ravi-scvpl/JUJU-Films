import React, { useEffect } from 'react';
import CollectiveContent from '../components/about/CollectiveContent';

const CollectivePage = () => {
    useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ marginBottom: 0, paddingBottom: 0, paddingTop: '120px' }}>
            <div>
                <div style={{ minHeight: '50vh', padding: '0' }}>
                    <CollectiveContent />
                </div>
            </div>
        </div>
    );
};

export default CollectivePage;
