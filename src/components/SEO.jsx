import React from 'react';

const SEO = ({ title, description, canonical, schema, noindex }) => {
  // Fallback / Default WebPage schema if no custom schema is provided
  const getFallbackSchema = () => {
    if (noindex) return null;
    if (!title && !description) return null;

    const pageUrl = canonical 
      ? (canonical.startsWith('http') ? canonical : `https://www.jujuindia.com${canonical}`)
      : typeof window !== 'undefined' ? window.location.href : 'https://www.jujuindia.com';

    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title || "JUJU Films",
      "description": description || "JUJU Films is a creator collective building original stories, under one JUJU philosophy.",
      "url": pageUrl
    };
  };

  const finalSchema = schema || getFallbackSchema();

  // Dynamically update page title, meta description, and robots tags on the client side
  React.useEffect(() => {
    if (title) {
      document.title = title.includes("JUJU Films") ? title : `${title} | JUJU Films`;
    }
    
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      } else {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        metaDesc.content = description;
        document.head.appendChild(metaDesc);
      }
    }

    if (noindex) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots) {
        metaRobots.setAttribute('content', 'noindex, nofollow');
      } else {
        metaRobots = document.createElement('meta');
        metaRobots.name = 'robots';
        metaRobots.content = 'noindex, nofollow';
        document.head.appendChild(metaRobots);
      }
    }
  }, [title, description, noindex]);

  return (
    <>
      {/* If it's admin or non-indexed page, insert the noindex tag in server-side render too */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Render Schema.org JSON-LD scripts */}
      {finalSchema && (Array.isArray(finalSchema) ? finalSchema : [finalSchema]).map((s, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(s)
          }}
        />
      ))}
    </>
  );
};

export default SEO;
