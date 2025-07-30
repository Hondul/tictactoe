
import React from 'react';
import { SquareValue } from '../types';
import { XIcon, OIcon } from './icons';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning, disabled }) => {
  const baseStyle = 'flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-lg transition-all duration-200';
  const activeStyle = 'bg-slate-700 hover:bg-slate-600/70 cursor-pointer';
  const winningStyle = 'bg-green-500/40 scale-105';
  
  const iconSize = 'w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-300 transform group-hover:scale-105';

  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`group ${baseStyle} ${value === null && !disabled ? activeStyle : 'bg-slate-800'} ${isWinning ? winningStyle : ''}`}
      aria-label={`Square ${value || 'empty'}`}
    >
      {value === 'X' && <XIcon className={`text-cyan-400 ${iconSize}`} />}
      {value === 'O' && <OIcon className={`text-amber-400 ${iconSize}`} />}
    </button>
  );
};

export default Square;
