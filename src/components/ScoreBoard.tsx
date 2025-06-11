
import React from 'react';
import { Trophy, Star, Users, Bot } from 'lucide-react';

interface ScoreBoardProps {
  player1Name: string;
  player2Name: string;
  scores: {
    player1: number;
    player2: number;
    ties: number;
  };
  gameMode: 'friend' | 'computer';
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  player1Name,
  player2Name,
  scores,
  gameMode
}) => {
  const totalGames = scores.player1 + scores.player2 + scores.ties;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="text-yellow-400" size={24} />
          <h3 className="text-2xl font-bold text-white">Score Board</h3>
        </div>
        <p className="text-white/70">Games Played: {totalGames}</p>
      </div>

      <div className="space-y-4">
        {/* Player 1 Score */}
        <div className="flex items-center justify-between p-4 bg-purple-500/20 rounded-xl border border-purple-400/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold">
              X
            </div>
            <span className="text-purple-400 font-semibold">{player1Name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-purple-400">{scores.player1}</span>
            {scores.player1 > 0 && <Star className="text-yellow-400" size={20} />}
          </div>
        </div>

        {/* Player 2 Score */}
        <div className="flex items-center justify-between p-4 bg-blue-500/20 rounded-xl border border-blue-400/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold">
              O
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-semibold">{player2Name}</span>
              {gameMode === 'computer' && <Bot className="text-blue-400" size={16} />}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-400">{scores.player2}</span>
            {scores.player2 > 0 && <Star className="text-yellow-400" size={20} />}
          </div>
        </div>

        {/* Ties */}
        <div className="flex items-center justify-between p-4 bg-yellow-500/20 rounded-xl border border-yellow-400/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
              =
            </div>
            <span className="text-yellow-400 font-semibold">Ties</span>
          </div>
          <span className="text-2xl font-bold text-yellow-400">{scores.ties}</span>
        </div>
      </div>

      {totalGames > 0 && (
        <div className="mt-6 p-4 bg-white/5 rounded-xl">
          <h4 className="text-white/90 font-semibold mb-2">Win Rate</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-purple-400">{player1Name}</span>
              <span className="text-white/80">{Math.round((scores.player1 / totalGames) * 100)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-400">{player2Name}</span>
              <span className="text-white/80">{Math.round((scores.player2 / totalGames) * 100)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
