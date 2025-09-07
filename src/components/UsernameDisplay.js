import React from 'react';

const UsernameDisplay = ({ username }) => {
  if (!username) return null;

  return (
    <div className="username-display">
      <div className="username-content">
        <span className="username-label">Player:</span>
        <span className="username-value">{username}</span>
      </div>
    </div>
  );
};

export default UsernameDisplay;
