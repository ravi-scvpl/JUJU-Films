import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, canonical, type, schema, image }) => {
    const location = useLocation();
    const siteTitle = 'JUJU Films';
    const domain = 'https://www.jujuindia.com';

    const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDescription = description || 'JUJU Films is a creator collective building original stories, under one JUJU philosophy.';

    // Logic: If 'canonical' prop is passed, use it (appended to domain if relative). 
    // Otherwise use current path.
    // Ensure canonical never has a trailing slash unless it's root, to align with sitemap (optional, but good practice).
    // Here we just join domain + path. 
    // We remove any trailing slash from domain (it doesn't have one) and ensure path starts with /.

    let path = canonical || location.pathname;
    // Ensure path starts with / if not empty
    if (path && !path.startsWith('http') && !path.startsWith('/')) {
        path = `/${path}`;
    }

    const metaUrl = canonical && canonical.startsWith('http')
        ? canonical
        : `${domain}${path === '/' ? '' : path}`;

    const metaType = type || 'website';
    const metaImage = image || `${domain}/juju-white-logo.webp`; // Default image

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
