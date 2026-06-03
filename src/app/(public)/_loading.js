import React from 'react';

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      width: '100%',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <div className="premium-spinner"></div>
      <p style={{
        marginTop: '24px',
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#aaaaaa',
        animation: 'pulse 1.8s infinite ease-in-out'
      }}>
        Loading Story
      </p>
      <style>{`
        .premium-spinner {
          width: 48px;
          height: 48px;
          border: 2px solid rgba(229, 35, 35, 0.1);
          border-radius: 50%;
          border-top-color: #E52323;
          animation: spin 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          box-shadow: 0 0 20px rgba(229, 35, 35, 0.2);
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.9;
            color: #ffffff;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
