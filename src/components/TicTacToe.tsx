
import React, { useState, useEffect } from 'react';
import { GameBoard } from './GameBoard';
import { GameStatus } from './GameStatus';
import { WinningOverlay } from './WinningOverlay';
import { GameSetup } from './GameSetup';
import { ScoreBoard } from './ScoreBoard';
import { TimeTravel } from './TimeTravel';
import { useComputerPlayer } from '../hooks/useComputerPlayer';
import { useSounds } from '../hooks/useSounds';
import { Home, Moon, Sun, History } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = Player[];
type GameMode = 'friend' | 'computer';

interface GameHistory {
  board: Board;
  currentPlayer: Player;
  moveIndex: number;
}

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

export const TicTacToe = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>('friend');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'tie' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showTimeTravel, setShowTimeTravel] = useState(false);
  
  // Score tracking
  const [scores, setScores] = useState({ player1: 0, player2: 0, ties: 0 });
  
  // Time travel
  const [history, setHistory] = useState<GameHistory[]>([
    { board: Array(9).fill(null), currentPlayer: 'X', moveIndex: -1 }
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const { playMoveSound, playWinSound, playTieSound } = useSounds();

  // Dynamic background based on current player and dark mode
  const getBackgroundClass = () => {
    const baseClass = darkMode ? 'from-gray-900 via-gray-800 to-gray-900' : '';
    if (!gameStarted) return darkMode ? baseClass : 'from-purple-900 via-blue-900 to-indigo-900';
    if (winner) return darkMode ? 'from-gray-900 via-green-900 to-gray-900' : 'from-green-900 via-emerald-900 to-teal-900';
    if (currentPlayer === 'X') return darkMode ? 'from-gray-900 via-purple-900 to-gray-900' : 'from-purple-900 via-violet-900 to-fuchsia-900';
    return darkMode ? 'from-gray-900 via-blue-900 to-gray-900' : 'from-blue-900 via-cyan-900 to-teal-900';
  };

  const checkWinner = (board: Board): { winner: Player | 'tie' | null, line: number[] | null } => {
    // Check for winning combinations
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: [a, b, c] };
      }
    }

    // Check for tie
    if (board.every(cell => cell !== null)) {
      return { winner: 'tie', line: null };
    }

    return { winner: null, line: null };
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || currentMove < history.length - 1) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    
    // Play move sound
    playMoveSound();
    
    setBoard(newBoard);

    const { winner: gameWinner, line } = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setWinningLine(line);
      
      // Update scores
      if (gameWinner === 'tie') {
        setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
        playTieSound();
      } else if (gameWinner === 'X') {
        setScores(prev => ({ ...prev, player1: prev.player1 + 1 }));
        playWinSound();
      } else {
        setScores(prev => ({ ...prev, player2: prev.player2 + 1 }));
        playWinSound();
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    // Add to history
    const newHistory = history.slice(0, currentMove + 1);
    newHistory.push({
      board: newBoard,
      currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
      moveIndex: index
    });
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  };

  const jumpToMove = (moveIndex: number) => {
    const historyItem = history[moveIndex];
    setBoard(historyItem.board);
    setCurrentPlayer(historyItem.currentPlayer);
    setCurrentMove(moveIndex);
    setWinner(null);
    setWinningLine(null);
  };

  const handleStartGame = (mode: GameMode, p1Name: string, p2Name: string) => {
    setGameMode(mode);
    setPlayer1Name(p1Name);
    setPlayer2Name(p2Name);
    setGameStarted(true);
    resetGame();
  };

  const resetGame = () => {
    const initialBoard = Array(9).fill(null);
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setHistory([{ board: initialBoard, currentPlayer: 'X', moveIndex: -1 }]);
    setCurrentMove(0);
  };

  const goToSetup = () => {
    setGameStarted(false);
    resetGame();
    setScores({ player1: 0, player2: 0, ties: 0 });
  };

  // Computer player logic
  useComputerPlayer({
    board,
    currentPlayer,
    gameMode,
    isGameOver: !!winner,
    onCellClick: handleCellClick
  });

  const getCurrentPlayerName = () => {
    if (currentPlayer === 'X') return player1Name;
    return gameMode === 'computer' ? 'Computer' : player2Name;
  };

  const getWinnerName = () => {
    if (winner === 'X') return player1Name;
    if (winner === 'O') return gameMode === 'computer' ? 'Computer' : player2Name;
    return null;
  };

  if (!gameStarted) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${getBackgroundClass()} flex items-center justify-center p-4 transition-all duration-1000 ${darkMode ? 'dark' : ''}`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            {darkMode ? <Sun className="text-yellow-400" size={24} /> : <Moon className="text-blue-400" size={24} />}
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-3xl blur-xl"></div>
          <div className="relative">
            <div className="text-center mb-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Tic Tac Toe
              </h1>
              <p className="text-white/80 text-xl">Challenge your friends or the AI!</p>
            </div>
            <GameSetup onStartGame={handleStartGame} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundClass()} flex items-center justify-center p-4 transition-all duration-1000 ${darkMode ? 'dark' : ''}`}>
      <div className="relative max-w-6xl w-full">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-3xl blur-xl"></div>
        
        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header with controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Tic Tac Toe
              </h1>
              <div className="flex items-center justify-center gap-4 text-white/80">
                <span className="text-purple-400 font-semibold">{player1Name} (X)</span>
                <span>vs</span>
                <span className="text-blue-400 font-semibold">{player2Name} (O)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowTimeTravel(!showTimeTravel)}
                className="p-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <History className="text-white" size={20} />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-blue-400" size={20} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Score Board */}
            <div className="lg:order-1">
              <ScoreBoard
                player1Name={player1Name}
                player2Name={player2Name}
                scores={scores}
                gameMode={gameMode}
              />
            </div>

            {/* Main Game Area */}
            <div className="lg:order-2">
              <GameStatus 
                currentPlayer={currentPlayer}
                currentPlayerName={getCurrentPlayerName()}
                winner={winner}
                winnerName={getWinnerName()}
                gameStarted={gameStarted}
              />

              <GameBoard
                board={board}
                onCellClick={handleCellClick}
                winningLine={winningLine}
                winner={winner}
              />

              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  New Round
                </button>
                <button
                  onClick={goToSetup}
                  className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Home size={20} />
                  Setup
                </button>
              </div>
            </div>

            {/* Time Travel */}
            <div className="lg:order-3">
              {showTimeTravel && (
                <TimeTravel
                  history={history}
                  currentMove={currentMove}
                  onJumpToMove={jumpToMove}
                  player1Name={player1Name}
                  player2Name={player2Name}
                  gameMode={gameMode}
                />
              )}
            </div>
          </div>
        </div>

        {winner && (
          <WinningOverlay 
            winner={winner} 
            winnerName={getWinnerName()}
            onPlayAgain={resetGame}
            onGoToSetup={goToSetup}
          />
        )}
      </div>
    </div>
  );
};
