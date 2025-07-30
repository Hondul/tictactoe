
import React from 'react';
import { SquareValue } from '../types';
import Square from './Square';

interface BoardProps {
  squares: SquareValue[];
  onSquareClick: (index: number) => void;
  winningLine: number[] | null;
  isBoardDisabled: boolean;
}

const Board: React.FC<BoardProps> = ({ squares, onSquareClick, winningLine, isBoardDisabled }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-2 bg-slate-900/50 rounded-xl shadow-lg border border-slate-700">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onSquareClick(i)}
          isWinning={winningLine?.includes(i) ?? false}
          disabled={isBoardDisabled}
        />
      ))}
    </div>
  );
};

export default Board;
