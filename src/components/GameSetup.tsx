
import React, { useState } from 'react';
import { User, Users, Bot, Play } from 'lucide-react';

interface GameSetupProps {
  onStartGame: (gameMode: 'friend' | 'computer', player1Name: string, player2Name: string) => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [gameMode, setGameMode] = useState<'friend' | 'computer'>('friend');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const handleStartGame = () => {
    const p1Name = player1Name.trim() || 'Player 1';
    const p2Name = gameMode === 'computer' ? 'Computer' : (player2Name.trim() || 'Player 2');
    onStartGame(gameMode, p1Name, p2Name);
  };

  const canStart = player1Name.trim() && (gameMode === 'computer' || player2Name.trim());

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Game Setup
        </h2>
        <p className="text-white/80">Choose your game mode and enter player names</p>
      </div>

      {/* Game Mode Selection */}
      <div className="mb-6">
        <label className="block text-white/90 font-semibold mb-3">Game Mode</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setGameMode('friend')}
            className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
              gameMode === 'friend'
                ? 'border-purple-400 bg-purple-400/20 text-purple-400'
                : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10'
            }`}
          >
            <Users size={24} />
            <span className="font-medium">vs Friend</span>
          </button>
          <button
            onClick={() => setGameMode('computer')}
            className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
              gameMode === 'computer'
                ? 'border-blue-400 bg-blue-400/20 text-blue-400'
                : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10'
            }`}
          >
            <Bot size={24} />
            <span className="font-medium">vs Computer</span>
          </button>
        </div>
      </div>

      {/* Player Names */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-white/90 font-medium mb-2 flex items-center gap-2">
            <User size={16} />
            Player 1 Name (X)
          </label>
          <input
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
          />
        </div>

        {gameMode === 'friend' && (
          <div>
            <label className="block text-white/90 font-medium mb-2 flex items-center gap-2">
              <User size={16} />
              Player 2 Name (O)
            </label>
            <input
              type="text"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              placeholder="Enter friend's name"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleStartGame}
        disabled={!canStart}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          canStart
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 shadow-lg hover:shadow-xl'
            : 'bg-white/10 text-white/50 cursor-not-allowed'
        }`}
      >
        <Play size={20} />
        Start Game
      </button>
    </div>
  );
};
