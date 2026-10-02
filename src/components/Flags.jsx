import React from 'react';

export function GeorgiaFlag({ size = 20, style = {} }) {
  const width = size;
  const height = Math.round((size * 2) / 3);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 600 400"
      style={{ borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.15)', display: 'inline-block', verticalAlign: 'middle', ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White background */}
      <rect width="600" height="400" fill="#FFFFFF" />
      {/* Central Red St. George Cross */}
      <rect x="250" width="100" height="400" fill="#FF0000" />
      <rect y="150" width="600" height="100" fill="#FF0000" />
      {/* 4 Bolnur-Katskhuri Crosses */}
      <g fill="#FF0000">
        {/* Top-Left */}
        <g transform="translate(125, 75)">
          <path d="M-10,-40 C-10,-20 -20,-10 -40,-10 L-40,10 C-20,10 -10,20 -10,40 L10,40 C10,20 20,10 40,10 L40,-10 C20,-10 10,-20 10,-40 Z" />
        </g>
        {/* Top-Right */}
        <g transform="translate(475, 75)">
          <path d="M-10,-40 C-10,-20 -20,-10 -40,-10 L-40,10 C-20,10 -10,20 -10,40 L10,40 C10,20 20,10 40,10 L40,-10 C20,-10 10,-20 10,-40 Z" />
        </g>
        {/* Bottom-Left */}
        <g transform="translate(125, 325)">
          <path d="M-10,-40 C-10,-20 -20,-10 -40,-10 L-40,10 C-20,10 -10,20 -10,40 L10,40 C10,20 20,10 40,10 L40,-10 C20,-10 10,-20 10,-40 Z" />
        </g>
        {/* Bottom-Right */}
        <g transform="translate(475, 325)">
          <path d="M-10,-40 C-10,-20 -20,-10 -40,-10 L-40,10 C-20,10 -10,20 -10,40 L10,40 C10,20 20,10 40,10 L40,-10 C20,-10 10,-20 10,-40 Z" />
        </g>
      </g>
    </svg>
  );
}

export function USFlag({ size = 20, style = {} }) {
  const width = size;
  const height = Math.round((size * 2) / 3);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 741 390"
      style={{ borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.15)', display: 'inline-block', verticalAlign: 'middle', ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="741" height="390" fill="#B22234" />
      <path d="M0,30H741M0,90H741M0,150H741M0,210H741M0,270H741M0,330H741" stroke="#FFFFFF" strokeWidth="30" />
      <rect width="296.4" height="210" fill="#3C3B6E" />
      <g fill="#FFFFFF">
        <circle cx="49" cy="35" r="10" />
        <circle cx="98" cy="35" r="10" />
        <circle cx="148" cy="35" r="10" />
        <circle cx="197" cy="35" r="10" />
        <circle cx="247" cy="35" r="10" />
        <circle cx="73" cy="70" r="10" />
        <circle cx="123" cy="70" r="10" />
        <circle cx="172" cy="70" r="10" />
        <circle cx="222" cy="70" r="10" />
        <circle cx="49" cy="105" r="10" />
        <circle cx="98" cy="105" r="10" />
        <circle cx="148" cy="105" r="10" />
        <circle cx="197" cy="105" r="10" />
        <circle cx="247" cy="105" r="10" />
        <circle cx="73" cy="140" r="10" />
        <circle cx="123" cy="140" r="10" />
        <circle cx="172" cy="140" r="10" />
        <circle cx="222" cy="140" r="10" />
        <circle cx="49" cy="175" r="10" />
        <circle cx="98" cy="175" r="10" />
        <circle cx="148" cy="175" r="10" />
        <circle cx="197" cy="175" r="10" />
        <circle cx="247" cy="175" r="10" />
      </g>
    </svg>
  );
}
