import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, canonical, type, schema }) => {
    const siteTitle = 'JUJU Films';
    const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDescription = description || 'JUJU Films is a creator collective building original stories, under one JUJU philosophy.';
    const metaUrl = canonical || window.location.href;
    const metaType = type || 'website';

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph Tags */}
            <meta property="og:type" content={metaType} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
