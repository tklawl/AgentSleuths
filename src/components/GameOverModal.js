import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useTimer } from '../context/TimerContext';
import { saveScore } from '../utils/scoreboard';

const GameOverModal = ({ isVisible, finalScore, username }) => {
  const { resetGame, lives } = useGame();
  const { resetTimer } = useTimer();
  const [playerPosition, setPlayerPosition] = useState(null);

  // Total possible errors across all workflows
  const totalPossibleErrors = 15; // 4 from BookLeave + 6 from TransferEmployee + 5 from ProvideFeedback
  const percentageUncovered = Math.round((finalScore / totalPossibleErrors) * 100);

  useEffect(() => {
    if (isVisible && finalScore !== undefined && username) {
      const position = saveScore(username, finalScore, totalPossibleErrors, lives);
      setPlayerPosition(position);
    }
  }, [isVisible, finalScore, lives, totalPossibleErrors, username]);

  if (!isVisible) return null;

  return (
    <div className="game-over-overlay">
      <div className="game-over-modal">
        <div className="modal-header">
          <h2>Game Over!</h2>
        </div>
        
        <div className="modal-content">
          <div className="final-score">
            <h3>Final Score</h3>
            <div className="score-display">{finalScore} / {totalPossibleErrors}</div>
            <p>You found {finalScore} out of {totalPossibleErrors} possible errors!</p>
          </div>
          
          <div className="game-summary">
            <h4>Game Summary</h4>
            <ul>
              <li>Correct answers: {finalScore}</li>
              <li>Lives remaining: {lives}</li>
              <li>Percentage of errors uncovered: {percentageUncovered}%</li>
              <li>Score out of {totalPossibleErrors}: {finalScore}</li>
              {playerPosition && (
                <li className="position-info">You placed #{playerPosition} on the leaderboard!</li>
              )}
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
