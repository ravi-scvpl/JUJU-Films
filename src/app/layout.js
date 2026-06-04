import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import Script from 'next/script';

// Import all legacy stylesheets to preserve design assets perfectly
import '@/styles/home-style.css';
import '@/styles/home-style-2.css';
import '@/styles/style.css';
import '@/styles/style2.css';
import '@/styles/theme.css';
import '@/styles/detailed-pages.css';
import '@/index.css';
import '@/styles/juju-overrides.css';

export const metadata = {
  metadataBase: new URL('https://www.jujuindia.com'),
  title: 'JUJU Films',
  description: 'JUJU Films is a creator collective building original stories, under one JUJU philosophy.',
  icons: {
    icon: '/juju-6.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/juju-white-logo.webp" type="image/webp" fetchPriority="high" />
        
        {/* Meta Pixel Script */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function (f, b, e, v, n, t, s) {
              if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ?
                  n.callMethod.apply(n, arguments) : n.queue.push(arguments)
              };
              if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
              n.queue = []; t = b.createElement(e); t.async = !0;
              t.src = v; s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s)
            }(window, document, 'script',
              'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '904020689181121');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google Tag Manager Script */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function (w, d, s, l, i) {
              w[l] = w[l] || []; w[l].push({
                'gtm.start':
                  new Date().getTime(), event: 'gtm.js'
              }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                  'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-WLSPFXTM');
          `}
        </Script>
      </head>
      <body>
        {/* GTM (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WLSPFXTM"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* Meta Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=904020689181121&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
