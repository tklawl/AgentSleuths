import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  const addScore = () => {
    setScore(prev => prev + 1);
  };

  const loseLife = () => {
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        // Game over - show modal
        setGameOver(true);
      }
      return newLives;
    });
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
  };

  const value = {
    score,
    lives,
    gameOver,
    addScore,
    loseLife,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
