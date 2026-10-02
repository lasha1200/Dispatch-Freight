import React from 'react';

export default function Logo({ size = 'md', showSubtitle = true, inverted = false }) {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const fontSize = size === 'sm' ? '1.1rem' : size === 'lg' ? '1.75rem' : '1.35rem';
  const subSize = size === 'sm' ? '0.65rem' : size === 'lg' ? '0.8rem' : '0.72rem';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', userSelect: 'none' }}>
      {/* Sleek Vector Emblem */}
      <div
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: size === 'sm' ? '8px' : '12px',
          background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <svg
          width={iconSize * 0.72}
          height={iconSize * 0.72}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle dynamic background route arc */}
          <path
            d="M4 20C8 10 16 6 24 5"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Main forward arrow / route wing */}
          <path
            d="M5 14.5L16 6.5L24 12L15 22L5 14.5Z"
            fill="white"
            fillOpacity="0.95"
          />
          <path
            d="M14 10.5L22.5 12L15 19L11 15L14 10.5Z"
            fill="#e0f2fe"
          />
          {/* Central dispatch pin indicator */}
          <circle cx="16.5" cy="12" r="2.2" fill="#0284c7" />
          {/* Fast track lines */}
          <path
            d="M6 19L11 23"
            stroke="#bae6fd"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: fontSize,
              letterSpacing: '-0.03em',
              color: inverted ? '#ffffff' : '#0f172a'
            }}
          >
            Aero<span style={{ color: '#0284c7' }}>Route</span>
          </span>
          <span
            style={{
              background: '#e0f2fe',
              color: '#0369a1',
              fontSize: '0.62rem',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '999px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            Dispatch
          </span>
        </div>
        {showSubtitle && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: subSize,
              fontWeight: 500,
              color: inverted ? '#93c5fd' : '#64748b',
              letterSpacing: '0.02em',
              marginTop: '1px'
            }}
          >
            Fleet & Carrier Operations
          </span>
        )}
      </div>
    </div>
  );
}
