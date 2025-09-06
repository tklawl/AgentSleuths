import React from 'react';
import { useGame } from '../context/GameContext';
import { useTimer } from '../context/TimerContext';

const GameOverModal = ({ isVisible, finalScore }) => {
  const { resetGame } = useGame();
  const { resetTimer } = useTimer();

  if (!isVisible) return null;

  return (
    <div className="game-over-overlay">
      <div className="game-over-modal">
        <div className="modal-header">
          <h2>🎮 Game Over! 🎮</h2>
        </div>
        
        <div className="modal-content">
          <div className="final-score">
            <h3>Final Score</h3>
            <div className="score-display">{finalScore}</div>
            <p>You found {finalScore} error{finalScore !== 1 ? 's' : ''} in the Agent's responses!</p>
          </div>
          
          <div className="game-summary">
            <h4>Game Summary</h4>
            <ul>
              <li>✅ Correct clicks: {finalScore}</li>
              <li>❌ Incorrect clicks: {3 - finalScore}</li>
              <li>🎯 Accuracy: {Math.round((finalScore / 3) * 100)}%</li>
            </ul>
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            className="play-again-btn"
            onClick={() => {
              resetGame();
              resetTimer();
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
