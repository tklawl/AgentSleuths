// Scoreboard utility functions

export const saveScore = (username, score, totalPossible, lives) => {
  const percentage = Math.round((score / totalPossible) * 100);
  const gameResult = {
    username,
    score,
    totalPossible,
    lives,
    percentage,
    timestamp: new Date().toISOString()
  };

  // Get existing leaderboard
  const existingLeaderboard = JSON.parse(localStorage.getItem('agentSleuthLeaderboard') || '[]');
  
  // Add new score
  existingLeaderboard.push(gameResult);
  
  // Sort by score (descending), then by percentage (descending), then by lives (descending)
  existingLeaderboard.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.percentage !== a.percentage) return b.percentage - a.percentage;
    return b.lives - a.lives;
  });

  // Keep only top 50 scores
  const topScores = existingLeaderboard.slice(0, 50);
  
  // Save back to localStorage
  localStorage.setItem('agentSleuthLeaderboard', JSON.stringify(topScores));
  
  // Return the position of the new score
  return topScores.findIndex(entry => 
    entry.username === username && 
    entry.timestamp === gameResult.timestamp
  ) + 1;
};

export const getLeaderboard = () => {
  return JSON.parse(localStorage.getItem('agentSleuthLeaderboard') || '[]');
};

export const getUsername = () => {
  return localStorage.getItem('agentSleuthUsername') || '';
};

export const saveUsername = (username) => {
  localStorage.setItem('agentSleuthUsername', username);
};

export const removeUser = (timestamp) => {
  const existingLeaderboard = JSON.parse(localStorage.getItem('agentSleuthLeaderboard') || '[]');
  const updatedLeaderboard = existingLeaderboard.filter(entry => entry.timestamp !== timestamp);
  localStorage.setItem('agentSleuthLeaderboard', JSON.stringify(updatedLeaderboard));
  return updatedLeaderboard;
};
