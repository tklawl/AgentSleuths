import React from 'react';

const ThinkingIndicator = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="thinking-indicator">
      <div className="thinking-content">
        <div className="thinking-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <span className="thinking-text">HRAssist is thinking...</span>
      </div>
    </div>
  );
};

export default ThinkingIndicator;
