
import React from 'react';
import { RotateCcw, Play } from 'lucide-react';

type Player = 'X' | 'O' | null;

interface GameHistory {
  board: Player[];
  currentPlayer: Player;
  moveIndex: number;
}

interface TimeTravelProps {
  history: GameHistory[];
  currentMove: number;
  onJumpToMove: (moveIndex: number) => void;
  player1Name: string;
  player2Name: string;
  gameMode: 'friend' | 'computer';
}

export const TimeTravel: React.FC<TimeTravelProps> = ({
  history,
  currentMove,
  onJumpToMove,
  player1Name,
  player2Name,
  gameMode
}) => {
  const getPlayerName = (player: Player) => {
    if (player === 'X') return player1Name;
    if (player === 'O') return gameMode === 'computer' ? 'Computer' : player2Name;
    return '';
  };

  const getMoveDescription = (move: number) => {
    if (move === 0) return 'Game Start';
    const historyItem = history[move];
    const previousPlayer = move % 2 === 1 ? 'X' : 'O';
    const playerName = getPlayerName(previousPlayer);
    const position = Math.floor(historyItem.moveIndex / 3) + 1;
    const column = (historyItem.moveIndex % 3) + 1;
    return `${playerName} → Row ${position}, Col ${column}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-h-96 overflow-y-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <RotateCcw className="text-blue-400" size={24} />
          <h3 className="text-2xl font-bold text-white">Time Travel</h3>
        </div>
        <p className="text-white/70">Go back to any move</p>
      </div>

      <div className="space-y-2">
        {history.map((_, move) => (
          <button
            key={move}
            onClick={() => onJumpToMove(move)}
            className={`w-full p-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${
              move === currentMove
                ? 'bg-blue-500/30 border border-blue-400/50 text-blue-400'
                : 'bg-white/5 hover:bg-white/10 border border-white/20 text-white/80 hover:text-white'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              move === currentMove ? 'bg-blue-400 text-white' : 'bg-white/20 text-white/60'
            }`}>
              {move}
            </div>
            <span className="flex-1">{getMoveDescription(move)}</span>
            {move === currentMove && <Play size={16} className="text-blue-400" />}
          </button>
        ))}
      </div>

      {currentMove < history.length - 1 && (
        <div className="mt-4 p-3 bg-yellow-500/20 rounded-xl border border-yellow-400/30">
          <p className="text-yellow-400 text-sm font-semibold">
            ⚠️ You're viewing a past move. Make a move to continue from here.
          </p>
        </div>
      )}
    </div>
  );
};
