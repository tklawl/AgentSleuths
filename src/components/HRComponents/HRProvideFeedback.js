import React from 'react';

const HRProvideFeedback = ({ feedbackSubmitted }) => {
  return (
    <div className="hr-employee-profile">
      <div className="hr-page-header">
        <h2>Employee Profile</h2>
        <div className="hr-breadcrumb">Home > Employee Management > Priya Singh</div>
      </div>
      
      <div className="hr-content-grid">
        <div className="hr-main-panel">
          <div className="hr-section">
            <h3>Personal Information</h3>
            <div className="employee-profile-card">
              <div className="profile-avatar">
                <div className="avatar-circle">PS</div>
              </div>
              <div className="profile-details">
                <div className="profile-name">Priya Singh</div>
                <div className="profile-role">Marketing Specialist</div>
                <div className="profile-department">Marketing Department</div>
              </div>
            </div>
          </div>
          
          <div className="hr-section">
            <h3>Employment Details</h3>
            <div className="employment-details">
              <div className="detail-row">
                <span className="detail-label">Employee ID:</span>
                <span className="detail-value">EMP-2019-PS</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">Marketing</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Position:</span>
                <span className="detail-value">Marketing Specialist</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Manager:</span>
                <span className="detail-value">User (You)</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Start Date:</span>
                <span className="detail-value">2019</span>
              </div>
            </div>
          </div>
          
          <div className="hr-section">
            <h3>Performance Summary</h3>
            <div className="performance-summary">
              <div className="performance-item">
                <span className="performance-label">2024 Performance Review:</span>
                <span className="performance-value excellent">"Exceeds Expectations"</span>
              </div>
              <div className="performance-item">
                <span className="performance-label">Attendance 2025:</span>
                <span className="performance-value">2 late arrivals, 0 unapproved absences</span>
              </div>
              <div className="performance-item">
                <span className="performance-label">Training 2025:</span>
                <span className="performance-value">2 courses completed</span>
              </div>
              <div className="performance-item">
                <span className="performance-label">Compliance 2025:</span>
                <span className="performance-value excellent">Passed</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hr-sidebar">
          <div className="sidebar-section">
            <h4>Recent Activity</h4>
            <div className="recent-activity">
              {feedbackSubmitted && (
                <div className="activity-item">
                  <div className="activity-time">Just now</div>
                  <div className="activity-text">Performance feedback submitted</div>
                </div>
              )}
              <div className="activity-item">
                <div className="activity-time">March 2025</div>
                <div className="activity-text">Employee of the Month Award</div>
              </div>
              <div className="activity-item">
                <div className="activity-time">Q4 2024</div>
                <div className="activity-text">Performance review completed</div>
              </div>
              <div className="activity-item">
                <div className="activity-time">Q3 2024</div>
                <div className="activity-text">Training completed: Digital Marketing</div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h4>Awards & Recognition</h4>
            <div className="awards-section">
              <div className="award-item">
                <div className="award-icon">🏆</div>
                <div className="award-details">
                  <div className="award-title">Employee of the Month</div>
                  <div className="award-date">March 2025</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h4>Peer Feedback</h4>
            <div className="peer-feedback">
              <div className="no-feedback">
                <span className="no-feedback-text">No peer feedback stored in system</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRProvideFeedback;