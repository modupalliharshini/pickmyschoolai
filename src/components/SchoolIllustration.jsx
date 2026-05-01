import React from 'react';

const SchoolIllustration = () => (
  <div className="w-full h-full bg-[#E8D3D3] flex items-center justify-center relative overflow-hidden">
    <svg viewBox="0 0 400 240" className="w-[85%] h-auto">
      {/* Side blocks */}
      <rect x="100" y="140" width="70" height="70" fill="#7C1A1A" />
      <rect x="230" y="140" width="70" height="70" fill="#7C1A1A" />
      
      {/* Middle block */}
      <rect x="150" y="110" width="100" height="100" fill="#7C1A1A" />
      
      {/* Roof */}
      <path d="M150 110 L200 70 L250 110 Z" fill="#7C1A1A" />
      
      {/* Flag */}
      <line x1="200" y1="70" x2="200" y2="50" stroke="#7C1A1A" strokeWidth="2" />
      <path d="M200 50 L225 58 L200 66 Z" fill="#7C1A1A" />
      
      {/* Windows on side blocks */}
      <rect x="115" y="155" width="15" height="15" fill="#E8D3D3" opacity="0.4" />
      <rect x="140" y="155" width="15" height="15" fill="#E8D3D3" opacity="0.4" />
      <rect x="115" y="180" width="15" height="15" fill="#E8D3D3" opacity="0.4" />
      <rect x="140" y="180" width="15" height="15" fill="#E8D3D3" opacity="0.4" />
      
      <rect x="245" y="155" width="15" height="15" fill="#E8D3D3" opacity="0.4" />
      <rect x="270" y="155" width="15" height="15" fill="#E8D3D3" opacity="0.4" />
      <rect x="245" y="180" width="15" height="15" fill="#E8D3D3" opacity="0.4" />
      <rect x="270" y="180" width="15" height="15" fill="#E8D3D3" opacity="0.4" />
      
      {/* Windows on middle block */}
      <rect x="170" y="125" width="15" height="15" fill="#E8D3D3" opacity="0.4" />
      <rect x="215" y="125" width="15" height="15" fill="#E8D3D3" opacity="0.4" />
      <rect x="170" y="150" width="15" height="15" fill="#E8D3D3" opacity="0.4" />
      <rect x="215" y="150" width="15" height="15" fill="#E8D3D3" opacity="0.4" />
      
      {/* Door */}
      <rect x="190" y="175" width="20" height="35" fill="white" />
    </svg>
  </div>
);

export default SchoolIllustration;

