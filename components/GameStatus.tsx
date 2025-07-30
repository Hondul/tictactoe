
import React from 'react';
import { BrainCircuitIcon, RotateCwIcon } from './icons';

interface GameStatusProps {
  status: React.ReactNode;
  onRestart: () => void;
  isAiOpponent: boolean;
  onToggleAi: (isAi: boolean) => void;
  isAiThinking: boolean;
  isGameStart: boolean;
}

const GameStatus: React.FC<GameStatusProps> = ({
  status,
  onRestart,
  isAiOpponent,
  onToggleAi,
  isAiThinking,
  isGameStart,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
      <div className="text-2xl font-bold text-slate-300 h-16 flex items-center justify-center text-center">
        {isAiThinking ? (
          <div className="flex items-center space-x-2 text-amber-400">
            <BrainCircuitIcon className="w-6 h-6 animate-pulse" />
            <span>AI is thinking...</span>
          </div>
        ) : (
          status
        )}
      </div>

      <div className="flex items-center justify-center space-x-4 w-full">
        <button
          onClick={onRestart}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <RotateCwIcon className="w-5 h-5" />
          <span>Restart</span>
        </button>
        
        <div className={`flex items-center space-x-2 p-1 bg-slate-800 rounded-lg ${!isGameStart ? 'opacity-50' : ''}`}>
          <label htmlFor="ai-toggle" className="sr-only">Toggle AI Opponent</label>
          <button
            onClick={() => onToggleAi(false)}
            disabled={!isGameStart}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${!isAiOpponent ? 'bg-cyan-500 text-white shadow-sm' : 'bg-transparent text-slate-400'} ${!isGameStart ? 'cursor-not-allowed' : ''}`}
          >
            2 Players
          </button>
          <button
            onClick={() => onToggleAi(true)}
            disabled={!isGameStart}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${isAiOpponent ? 'bg-amber-500 text-white shadow-sm' : 'bg-transparent text-slate-400'} ${!isGameStart ? 'cursor-not-allowed' : ''}`}
          >
            <BrainCircuitIcon className="w-4 h-4" />
            <span>vs AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameStatus;
