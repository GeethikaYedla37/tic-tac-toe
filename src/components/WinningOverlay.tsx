
import React from 'react';
import { Sparkles, Trophy, RotateCcw, Home, Bot } from 'lucide-react';

type Player = 'X' | 'O' | null;

interface WinningOverlayProps {
  winner: Player | 'tie';
  winnerName: string | null;
  onPlayAgain: () => void;
  onGoToSetup: () => void;
}

export const WinningOverlay: React.FC<WinningOverlayProps> = ({
  winner,
  winnerName,
  onPlayAgain,
  onGoToSetup
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md mx-4 text-center border border-white/20 animate-scale-in">
        {/* Celebration particles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {[...Array(12)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-yellow-400 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
              size={16 + Math.random() * 16}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="mb-6">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-4xl font-bold mb-2">
              {winner === 'tie' ? (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  It's a Tie!
                </span>
              ) : (
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  {winnerName} Wins!
                  {winnerName === 'Computer' && <Bot size={32} className="text-blue-400" />}
                </span>
              )}
            </h2>
            <p className="text-white/80 text-lg">
              {winner === 'tie' ? 'Both players played amazingly!' : 'Congratulations on your victory!'}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onPlayAgain}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
            
            <button
              onClick={onGoToSetup}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Home size={20} />
              New Game Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
