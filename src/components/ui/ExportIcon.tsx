import React from 'react';

interface ExportIconProps {
  className?: string;
}

const ExportIcon: React.FC<ExportIconProps> = ({ className }) => (
  <svg 
    className={className}
    viewBox="0 0 94 94" 
    fill="currentColor"
    preserveAspectRatio="xMidYMid meet"
  >
    <g transform="translate(0,94) scale(0.1,-0.1)">
      <path d="M215 866 c-148 -46 -183 -112 -192 -356 -9 -268 18 -375 110 -437 67
      -45 145 -56 367 -51 160 3 191 7 231 25 103 46 141 116 155 280 7 90 -7 133
      -45 133 -37 0 -49 -30 -53 -136 -3 -88 -7 -106 -28 -138 -43 -62 -83 -71 -315
      -71 -195 0 -201 1 -243 25 -73 41 -77 55 -80 300 -3 207 -2 217 20 260 32 63
      77 83 198 88 52 2 101 9 108 14 15 13 16 50 0 66 -16 16 -180 15 -233 -2z"/>
      <path d="M622 868 c-16 -16 -15 -53 1 -66 7 -6 32 -12 56 -14 l44 -3 -136
      -135 c-109 -108 -137 -140 -137 -162 0 -27 29 -53 51 -46 5 2 72 66 149 142
      l140 140 0 -38 c0 -53 15 -76 51 -76 39 0 49 27 49 138 0 129 -3 132 -144 132
      -74 0 -116 -4 -124 -12z"/>
    </g>
  </svg>
);

export default ExportIcon;