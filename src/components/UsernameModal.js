import React, { useState, useEffect } from 'react';
import { removeUser } from '../utils/scoreboard';

const UsernameModal = ({ isVisible, onStartGame }) => {
  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Load leaderboard from localStorage
    const savedLeaderboard = localStorage.getItem('agentSleuthLeaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('agentSleuthUsername', username.trim());
      onStartGame(username.trim());
    }
  };

  const handleRemoveUser = (timestamp) => {
    const updatedLeaderboard = removeUser(timestamp);
    setLeaderboard(updatedLeaderboard);
  };

  if (!isVisible) return null;

  return (
    <div className="username-modal-overlay">
      <div className="username-modal">
        <div className="modal-header">
          <h2>Welcome to Agent Sleuth!</h2>
          <p>Enter your username to start playing</p>
        </div>
        
        <div className="modal-content">
          <div className="username-section">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  maxLength={20}
                  required
                />
              </div>
              <button type="submit" className="start-game-btn">
                Start Game
              </button>
            </form>
          </div>
          
          <div className="leaderboard-section">
            <h3>Top 5 Leaderboard</h3>
            <div className="leaderboard">
              {leaderboard.length > 0 ? (
                leaderboard.slice(0, 5).map((player, index) => (
                  <div key={player.timestamp} className="leaderboard-item">
                    <div className="rank">#{index + 1}</div>
                    <div className="player-info">
                      <div className="player-name">{player.username}</div>
                      <div className="player-score">Score: {player.score}/{player.totalPossible}</div>
                    </div>
                    <div className="player-percentage">{player.percentage}%</div>
                    <button 
                      className="remove-user-btn"
                      onClick={() => handleRemoveUser(player.timestamp)}
                      title="Remove user"
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-scores">No scores yet. Be the first!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsernameModal;
