import React, { useState, useMemo, useCallback } from 'react';
import './Grid.css';

// Utility Functions
const isValid = (num, pos, board) => {
  const [r, c] = pos;
  
  for (let i = 0; i < 9; i++) {
    if (board[r][i] === num && c !== i) return false;
    if (board[i][c] === num && r !== i) return false;
  }

  const boxRow = Math.floor(r / 3) * 3;
  const boxCol = Math.floor(c / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === num && (i !== r || j !== c)) return false;
    }
  }

  return true;
};

const solve = (board) => {
  const findEmpty = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) return [r, c];
      }
    }
    return null;
  };

  const emptySpot = findEmpty();
  if (!emptySpot) return true;

  const [row, col] = emptySpot;
  for (let num = 1; num <= 9; num++) {
    if (isValid(num, emptySpot, board)) {
      board[row][col] = num;
      if (solve(board)) return true;
      board[row][col] = 0;
    }
  }

  return false;
};

// Component
const Grid = () => {
  const initialBoard = useMemo(() => Array(9).fill(Array(9).fill('')), []);
  const [board, setBoard] = useState(initialBoard);

  const handleChange = useCallback((e, row, col) => {
    const value = e.target.value;
    const validValue = value.match(/^[1-9]$/) ? value : '';

    setBoard(prevBoard =>
      prevBoard.map((r, i) =>
        r.map((val, j) => (i === row && j === col ? validValue : val))
      )
    );
  }, []);

  const solveSudoku = useCallback(() => {
    const newBoard = board.map(row => row.map(cell => (cell === '' ? 0 : parseInt(cell, 10))));
    if (!validateBoard(newBoard)) {
      alert('Invalid board configuration!');
      return;
    }
    if (solve(newBoard)) {
      setBoard(newBoard.map(row => row.map(cell => (cell === 0 ? '' : cell.toString()))));
    } else {
      alert('No solution exists!');
    }
  }, [board]);

  const resetBoard = () => {
    setBoard(initialBoard);
  };

  const validateBoard = (board) => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== 0 && !isValid(board[r][c], [r, c], board)) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div>
      <div className="grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={cell}
                onChange={(e) => handleChange(e, rowIndex, colIndex)}
                maxLength="1"
              />
            ))}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={solveSudoku}>Solve</button>
        <button onClick={resetBoard}>Reset</button>
      </div>
    </div>
  );
};

export default Grid;
