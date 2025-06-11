
import React from 'react';
import { GameCell } from './GameCell';

type Player = 'X' | 'O' | null;

interface GameBoardProps {
  board: Player[];
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  winner: Player | 'tie' | null;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  winningLine,
  winner
}) => {
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-3 p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
        {board.map((cell, index) => (
          <GameCell
            key={index}
            value={cell}
            onClick={() => onCellClick(index)}
            isWinning={winningLine?.includes(index) || false}
            isGameOver={!!winner}
            index={index}
          />
        ))}
      </div>
      
      {/* Animated winning line overlay */}
      {winningLine && (
        <div className="absolute inset-0 pointer-events-none">
          <WinningLineAnimation winningLine={winningLine} />
        </div>
      )}
    </div>
  );
};

const WinningLineAnimation: React.FC<{ winningLine: number[] }> = ({ winningLine }) => {
  const getLinePosition = () => {
    const [a, b, c] = winningLine;
    
    // Calculate line position and rotation
    const positions = [
      { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
      { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 },
      { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }
    ];
    
    const startPos = positions[a];
    const endPos = positions[c];
    
    const startX = (startPos.col * 33.33) + 16.665;
    const startY = (startPos.row * 33.33) + 16.665;
    const endX = (endPos.col * 33.33) + 16.665;
    const endY = (endPos.row * 33.33) + 16.665;
    
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
    
    return {
      left: `${startX}%`,
      top: `${startY}%`,
      width: `${length}%`,
      transform: `rotate(${angle}deg) translateY(-50%)`,
      transformOrigin: '0 50%'
    };
  };

  return (
    <div
      className="absolute h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"
      style={getLinePosition()}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping opacity-75"></div>
    </div>
  );
};
