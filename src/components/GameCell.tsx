
import React from 'react';
import { X, Circle } from 'lucide-react';

type Player = 'X' | 'O' | null;

interface GameCellProps {
  value: Player;
  onClick: () => void;
  isWinning: boolean;
  isGameOver: boolean;
  index: number;
}

export const GameCell: React.FC<GameCellProps> = ({
  value,
  onClick,
  isWinning,
  isGameOver,
  index
}) => {
  const getCellContent = () => {
    if (value === 'X') {
      return (
        <X 
          size={48} 
          className={`${isWinning ? 'text-yellow-400 animate-pulse' : 'text-purple-400'} transition-all duration-300`}
          strokeWidth={3}
        />
      );
    }
    if (value === 'O') {
      return (
        <Circle 
          size={48} 
          className={`${isWinning ? 'text-yellow-400 animate-pulse' : 'text-blue-400'} transition-all duration-300`}
          strokeWidth={3}
        />
      );
    }
    return null;
  };

  return (
    <button
      onClick={onClick}
      disabled={value !== null || isGameOver}
      className={`
        w-20 h-20 rounded-xl flex items-center justify-center
        transition-all duration-300 transform
        ${value === null && !isGameOver
          ? 'bg-white/10 hover:bg-white/20 hover:scale-105 hover:shadow-lg border-2 border-white/20 hover:border-white/40'
          : 'bg-white/15 border-2 border-white/30'
        }
        ${isWinning ? 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border-yellow-400/50 shadow-lg shadow-yellow-400/25' : ''}
        ${value === null && !isGameOver ? 'cursor-pointer' : 'cursor-default'}
      `}
      style={{
        animationDelay: `${index * 50}ms`
      }}
    >
      {getCellContent()}
    </button>
  );
};
