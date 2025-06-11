
import { useEffect } from 'react';

type Player = 'X' | 'O' | null;
type Board = Player[];

interface UseComputerPlayerProps {
  board: Board;
  currentPlayer: Player;
  gameMode: 'friend' | 'computer';
  isGameOver: boolean;
  onCellClick: (index: number) => void;
}

export const useComputerPlayer = ({
  board,
  currentPlayer,
  gameMode,
  isGameOver,
  onCellClick
}: UseComputerPlayerProps) => {
  useEffect(() => {
    if (gameMode === 'computer' && currentPlayer === 'O' && !isGameOver) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove(board);
        if (bestMove !== -1) {
          onCellClick(bestMove);
        }
      }, 800); // Add delay to make it feel more natural

      return () => clearTimeout(timer);
    }
  }, [board, currentPlayer, gameMode, isGameOver, onCellClick]);

  const getBestMove = (board: Board): number => {
    // First, try to win
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = 'O';
        if (checkWinner(testBoard) === 'O') {
          return i;
        }
      }
    }

    // Second, try to block player from winning
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = 'X';
        if (checkWinner(testBoard) === 'X') {
          return i;
        }
      }
    }

    // Third, take center if available
    if (board[4] === null) {
      return 4;
    }

    // Fourth, take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Finally, take any available space
    const availableMoves = board.map((cell, index) => cell === null ? index : null)
                              .filter(index => index !== null) as number[];
    
    return availableMoves.length > 0 
      ? availableMoves[Math.floor(Math.random() * availableMoves.length)]
      : -1;
  };

  const checkWinner = (board: Board): Player => {
    const WINNING_COMBINATIONS = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };
};
