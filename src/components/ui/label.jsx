import React from 'react';

export const Label = ({ children, className = "" }) => (
  <label className={`text-[13px] font-medium text-stone-700 ${className}`}>
    {children}
  </label>
);
