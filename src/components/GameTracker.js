import React from 'react';

const GameTracker = ({ score, lives }) => {
  return (
    <div className="game-tracker">
      <div className="tracker-stats">
        <div className="stat-item">
          <span className="stat-label">Score:</span>
          <span className="stat-value score">{score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Lives:</span>
          <span className="stat-value lives">
            {'♥'.repeat(lives)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameTracker;
