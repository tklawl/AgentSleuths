import React from 'react';

const HRHomePage = () => {
  return (
    <div className="hr-instructions-manual">
      <div className="instructions-header">
        <h1>🎯 Spot the AI Mistake</h1>
        <div className="instructions-subtitle">Instructions Manual</div>
      </div>
      
      <div className="instructions-content">
        <div className="welcome-section">
          <h2>Welcome!</h2>
          <p>You're about to play <strong>Spot the AI Mistake</strong>. The rules are simple:</p>
        </div>
        
        <div className="game-rules">
          <div className="rule-section">
            <h3>🎮 How to Play</h3>
            <ul className="rules-list">
              <li>On the <strong>left</strong>, you'll see an AI agent talking to an employee</li>
              <li>On the <strong>right</strong>, you'll see the HR system — the source of truth</li>
              <li>Your job? <strong>Catch the AI when it gets things wrong</strong></li>
            </ul>
          </div>
          
          <div className="rule-section">
            <h3>🎯 Scoring</h3>
            <ul className="rules-list">
              <li>Click on the agent's mistakes to <strong>score points</strong></li>
              <li>But be careful — if you click on something that's actually correct, you <strong>lose a life</strong></li>
              <li>You've got <strong>3 lives</strong>, <strong>3 minutes</strong>, and <strong>3 levels</strong> that get harder as you go</li>
            </ul>
          </div>
          
          <div className="rule-section">
            <h3>🔍 Pro Tips</h3>
            <ul className="rules-list">
              <li>Some messages even hide <strong>two mistakes</strong> — so read carefully</li>
              <li>Compare what the AI says with the HR system data</li>
              <li>Look for inconsistencies in names, dates, roles, and policies</li>
            </ul>
          </div>
        </div>
        
        <div className="challenge-section">
          <h3>🚀 Ready to Start?</h3>
          <p>Think you can outsmart the AI? Choose your difficulty level and begin your detective work!</p>
        </div>
      </div>
    </div>
  );
};

export default HRHomePage;
