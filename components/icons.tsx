
import React from 'react';

export const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const OIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9" />
  </svg>
);

export const BrainCircuitIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 5a3 3 0 1 0-5.993.129" />
      <path d="M12 5a3 3 0 1 0 5.993.129" />
      <path d="M12 12a3 3 0 1 0-5.993.129" />
      <path d="M12 12a3 3 0 1 0 5.993.129" />
      <path d="M12 19a3 3 0 1 0-5.993.129" />
      <path d="M12 19a3 3 0 1 0 5.993.129" />
      <path d="M21 12h-3" />
      <path d="M6 12H3" />
      <path d="m15.88 15.88-.01-.01" />
      <path d="m8.12 15.88-.01-.01" />
      <path d="m15.88 8.12-.01-.01" />
      <path d="m8.12 8.12-.01-.01" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
    </svg>
);

export const RotateCwIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 2v6h-6"/>
        <path d="M3 12a9 9 0 1 1 9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    </svg>
);
