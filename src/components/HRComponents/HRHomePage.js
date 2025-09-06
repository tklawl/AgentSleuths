import React from 'react';

const HRHomePage = () => {
  return (
    <div className="hr-dashboard">
      <div className="hr-welcome-section">
        <h2>Welcome to HRSys</h2>
        <p>Your comprehensive HR management platform</p>
      </div>
      
      <div className="hr-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">247</div>
            <div className="stat-label">Total Employees</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-number">12</div>
            <div className="stat-label">Pending Approvals</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">98%</div>
            <div className="stat-label">System Uptime</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">156</div>
            <div className="stat-label">Completed Tasks</div>
          </div>
        </div>
      </div>
      
      <div className="hr-recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-time">2 min ago</div>
            <div className="activity-text">Sarah Johnson submitted leave request</div>
          </div>
          <div className="activity-item">
            <div className="activity-time">15 min ago</div>
            <div className="activity-text">Mike Chen completed performance review</div>
          </div>
          <div className="activity-item">
            <div className="activity-time">1 hour ago</div>
            <div className="activity-text">Lisa Wang transferred to Marketing</div>
          </div>
        </div>
      </div>
      
      <div className="hr-quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn primary">Book Leave</button>
          <button className="action-btn secondary">Transfer Employee</button>
          <button className="action-btn secondary">Provide Feedback</button>
        </div>
      </div>
    </div>
  );
};

export default HRHomePage;
