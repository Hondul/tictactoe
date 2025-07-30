
import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import { calculateWinner } from './utils/gameLogic';
import { getAiMove } from './services/geminiService';
import { SquareValue, Player } from './types';
import { XIcon, OIcon } from './components/icons';

const App: React.FC = () => {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [isAiOpponent, setIsAiOpponent] = useState<boolean>(true);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  
  const { winner, line: winningLine } = calculateWinner(board);
  const isDraw = board.every(square => square !== null) && !winner;
  const isGameEnd = !!winner || isDraw;
  const isGameStart = board.every(square => square === null);

  const handleRestart = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setIsAiThinking(false);
  }, []);

  const handleToggleAi = (isAi: boolean) => {
    if (isGameStart) {
      setIsAiOpponent(isAi);
      handleRestart();
    }
  };

  const makeMove = useCallback((index: number, player: Player) => {
      if (board[index] || winner) return;
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setCurrentPlayer(player === 'X' ? 'O' : 'X');
  }, [board, winner]);


  const handleHumanMove = (index: number) => {
    if (isAiOpponent && currentPlayer === 'O') return; // Prevent human move on AI's turn
    if (isAiThinking) return;
    makeMove(index, currentPlayer);
  };
  
  useEffect(() => {
    if (isAiOpponent && currentPlayer === 'O' && !isGameEnd) {
      const performAiMove = async () => {
        setIsAiThinking(true);
        const aiMoveIndex = await getAiMove(board);
        // Add a small delay for better UX
        setTimeout(() => {
            // Check again if game state has changed (e.g., reset)
            if (currentPlayer === 'O' && !calculateWinner(board).winner) {
                 makeMove(aiMoveIndex, 'O');
            }
            setIsAiThinking(false);
        }, 600);
      };
      performAiMove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, board, isAiOpponent, isGameEnd, makeMove]);

  let statusNode: React.ReactNode;
  if (winner) {
    statusNode = (
      <span className="flex items-center justify-center">
        Winner:
        {winner === 'X' ? <XIcon className="w-8 h-8 mx-2 text-cyan-400" /> : <OIcon className="w-8 h-8 mx-2 text-amber-400" />}
      </span>
    );
  } else if (isDraw) {
    statusNode = "It's a Draw!";
  } else {
    statusNode = (
      <span className="flex items-center justify-center">
        Next player:
        {currentPlayer === 'X' ? <XIcon className="w-8 h-8 mx-2 text-cyan-400" /> : <OIcon className="w-8 h-8 mx-2 text-amber-400" />}
      </span>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 sm:space-y-8">
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-amber-500">
                    Gemini Tic Tac Toe
                </span>
            </h1>
            <p className="text-slate-400 mt-2">Play against a friend or a Gemini-powered AI.</p>
        </header>
        <main className="flex flex-col items-center space-y-6">
            <GameStatus 
                status={statusNode}
                onRestart={handleRestart}
                isAiOpponent={isAiOpponent}
                onToggleAi={handleToggleAi}
                isAiThinking={isAiThinking}
                isGameStart={isGameStart}
            />
            <Board 
                squares={board}
                onSquareClick={handleHumanMove}
                winningLine={winningLine}
                isBoardDisabled={isGameEnd || isAiThinking}
            />
        </main>
        <footer className="text-center text-slate-500 text-sm absolute bottom-4 left-0 right-0">
            <p>Built with React, Tailwind CSS, and the Google Gemini API.</p>
        </footer>
    </div>
  );
};

export default App;
