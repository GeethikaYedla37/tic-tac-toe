
import React from 'react';
import { X, Circle, Bot } from 'lucide-react';

type Player = 'X' | 'O' | null;

interface GameStatusProps {
  currentPlayer: Player;
  currentPlayerName: string;
  winner: Player | 'tie' | null;
  winnerName: string | null;
  gameStarted: boolean;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  currentPlayer,
  currentPlayerName,
  winner,
  winnerName,
  gameStarted
}) => {
  const getStatusContent = () => {
    if (winner === 'tie') {
      return (
        <div className="text-center animate-scale-in">
          <div className="text-2xl font-bold text-yellow-400 mb-2">It's a Tie!</div>
          <div className="text-white/80">Great game! Try again?</div>
        </div>
      );
    }

    if (winner) {
      return (
        <div className="text-center animate-scale-in">
          <div className="text-2xl font-bold text-green-400 mb-2 flex items-center justify-center gap-2">
            {winner === 'X' ? <X size={32} className="text-purple-400 animate-bounce" /> : <Circle size={32} className="text-blue-400 animate-bounce" />}
            {winnerName} Wins!
            {winnerName === 'Computer' && <Bot size={24} className="text-blue-400 animate-pulse" />}
          </div>
          <div className="text-white/80">Congratulations! 🎉</div>
        </div>
      );
    }

    if (!gameStarted) {
      return (
        <div className="text-center">
          <div className="text-xl font-semibold text-white/90 mb-2">Ready to Play?</div>
          <div className="text-white/70">Player X goes first!</div>
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className="text-xl font-semibold text-white/90 mb-2 flex items-center justify-center gap-2">
          <span>Current Turn:</span>
          {currentPlayer === 'X' ? (
            <X size={24} className="text-purple-400 animate-pulse" />
          ) : (
            <Circle size={24} className="text-blue-400 animate-pulse" />
          )}
          <span className={currentPlayer === 'X' ? 'text-purple-400' : 'text-blue-400'}>
            {currentPlayerName}
          </span>
          {currentPlayerName === 'Computer' && <Bot size={20} className="text-blue-400 animate-bounce" />}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-6 h-20 flex items-center justify-center">
      {getStatusContent()}
    </div>
  );
};
