import React from 'react';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" 
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-[10000] w-full max-w-lg animate-in">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className = "" }) => (
  <div className={`mx-auto bg-[#FBF7F0] rounded-3xl p-8 shadow-2xl border border-stone-200 ${className}`}>
    {children}
  </div>
);

export const DialogHeader = ({ children }) => (
  <div className="space-y-1.5 mb-6">
    {children}
  </div>
);

export const DialogTitle = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-serif font-bold text-stone-900 ${className}`}>
    {children}
  </h2>
);

export const DialogDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-stone-500 ${className}`}>
    {children}
  </p>
);
