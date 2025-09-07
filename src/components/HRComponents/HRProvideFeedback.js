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
          
          <div className="hr-section">
            <h3>Training Achievements 2025</h3>
            <div className="training-badges">
              <div className="badge-item">
                <div className="badge-icon">📊</div>
                <div className="badge-content">
                  <div className="badge-title">Digital Marketing Analytics</div>
                  <div className="badge-description">Advanced data analysis and campaign performance tracking</div>
                </div>
              </div>
              <div className="badge-item">
                <div className="badge-icon">📱</div>
                <div className="badge-content">
                  <div className="badge-title">Social Media Strategy</div>
                  <div className="badge-description">Multi-platform content planning and engagement optimization</div>
                </div>
              </div>
              <div className="badge-item">
                <div className="badge-icon">✍️</div>
                <div className="badge-content">
                  <div className="badge-title">Content Creation</div>
                  <div className="badge-description">Creative writing and visual content development</div>
                </div>
              </div>
              <div className="badge-item">
                <div className="badge-icon">📋</div>
                <div className="badge-content">
                  <div className="badge-title">Project Management</div>
                  <div className="badge-description">Agile methodologies and team coordination</div>
                </div>
              </div>
            </div>
          </div>
          
          {feedbackSubmitted && (
            <div className="hr-section">
              <h3>2025 Employee Performance Review</h3>
              <div className="performance-review-card">
                <div className="review-header">
                  <div className="review-year">2025 Annual Review</div>
                  <div className="review-rating excellent">Submitted</div>
                </div>
                <div className="review-summary">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="hr-section">
            <h3>Previous Performance Review</h3>
            <div className="performance-review-card">
              <div className="review-header">
                <div className="review-year">2024 Annual Review</div>
                <div className="review-rating excellent">Exceeds Expectations</div>
              </div>
              <div className="review-summary">
                <p><strong>Overall Assessment:</strong> Priya demonstrated exceptional performance throughout 2024, consistently exceeding expectations in all key areas.</p>
                <p><strong>Key Strengths:</strong></p>
                <ul>
                  <li>Outstanding leadership and team collaboration skills</li>
                  <li>Consistently met and exceeded all project deadlines</li>
                  <li>Demonstrated remarkable initiative in driving successful marketing campaigns</li>
                  <li>Innovative thinking that significantly contributed to team success</li>
                  <li>Excellent communication and stakeholder management</li>
                </ul>
                <p><strong>Areas of Excellence:</strong> Time management, attention to detail, and proactive problem-solving were particularly noteworthy. Priya's ability to coordinate complex projects while maintaining high quality standards was exemplary.</p>
                <p><strong>Recommendation:</strong> Continue current trajectory. Priya is a valuable asset to the team and shows strong potential for future leadership roles.</p>
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
              <div className="feedback-item">
                <div className="feedback-header">
                  <div className="feedback-author">Sarah Chen</div>
                  <div className="feedback-role">Marketing Manager</div>
                </div>
                <div className="feedback-content">
                  "Priya is an exceptional team player who consistently goes above and beyond. Her creative ideas have significantly improved our campaign performance. She's always willing to help colleagues and brings positive energy to the team."
                </div>
              </div>
              <div className="feedback-item">
                <div className="feedback-header">
                  <div className="feedback-author">Michael Rodriguez</div>
                  <div className="feedback-role">Content Specialist</div>
                </div>
                <div className="feedback-content">
                  "Working with Priya has been fantastic. She's incredibly organized, meets all deadlines, and her attention to detail is outstanding. She's also great at mentoring junior team members."
                </div>
              </div>
              <div className="feedback-item">
                <div className="feedback-header">
                  <div className="feedback-author">Lisa Wang</div>
                  <div className="feedback-role">Digital Analyst</div>
                </div>
                <div className="feedback-content">
                  "Priya's analytical skills are impressive. She helped me understand complex marketing metrics and always provides valuable insights during our team meetings. She's a true collaborator."
                </div>
              </div>
              <div className="feedback-item">
                <div className="feedback-header">
                  <div className="feedback-author">David Kim</div>
                  <div className="feedback-role">Project Coordinator</div>
                </div>
                <div className="feedback-content">
                  "Priya is reliable and professional. She communicates clearly, manages her workload effectively, and is always available to support team initiatives. Her problem-solving abilities are top-notch."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRProvideFeedback;