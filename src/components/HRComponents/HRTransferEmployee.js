import React from 'react';

const HRTransferEmployee = ({ transferStep, employeeSelected, departmentSelected, managerApproved, transferComplete }) => {


  // const progress = getTransferProgress(); // Unused for now

  return (
    <div className="hr-employee-profile">
      <div className="hr-page-header">
        <h2>Employee Profile</h2>
        <div className="hr-breadcrumb">Home > Employee Management > Alex Chen</div>
      </div>
      
      <div className="hr-content-grid">
        <div className="hr-main-panel">
          <div className="hr-section">
            <h3>Personal Information</h3>
            <div className="employee-profile-card">
              <div className="profile-avatar">
                <div className="avatar-circle">AC</div>
              </div>
              <div className="profile-details">
                <div className="profile-name">Alex Chen</div>
                <div className="profile-role">{transferComplete ? 'Finance Analyst (Level 5)' : 'Sales Analyst (Level 5)'}</div>
                <div className="profile-department">{transferComplete ? 'Finance Department' : 'Sales Department'}</div>
              </div>
            </div>
            <div className="transfer-policy-note">
              <span className="policy-note-text">* Transfer Policy for Roles Related to Finance & Operations: Needs HR + Current Manager approval; requires 30 days' notice</span>
            </div>
          </div>
          
          <div className="hr-section">
            <h3>Employment Details</h3>
            <div className="employment-details">
              <div className="detail-row">
                <span className="detail-label">Employee ID:</span>
                <span className="detail-value">EMP-2024-AC</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{transferComplete ? 'Finance' : 'Sales'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Position:</span>
                <span className="detail-value">{transferComplete ? 'Finance Analyst (Level 5)' : 'Sales Analyst (Level 5)'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Manager:</span>
                <span className="detail-value">{transferComplete ? 'Sarah Li' : 'Mark White'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Finance Manager:</span>
                <span className="detail-value">Michael Tan</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Start Date:</span>
                <span className="detail-value">March 15, 2022</span>
              </div>
            </div>
          </div>
          
          <div className="hr-section">
            <h3>Performance Summary</h3>
            <div className="performance-summary">
              <div className="performance-item">
                <span className="performance-label">Overall Rating:</span>
                <span className="performance-value excellent">Excellent</span>
              </div>
              <div className="performance-item">
                <span className="performance-label">Last Review:</span>
                <span className="performance-value">Q3 2024</span>
              </div>
              <div className="performance-item">
                <span className="performance-label">Goals Met:</span>
                <span className="performance-value">95%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hr-sidebar">
          <div className="sidebar-section">
            <h4>Recent Activity</h4>
            <div className="recent-activity">
              {transferComplete && (
                <div className="activity-item">
                  <div className="activity-time">Just now</div>
                  <div className="activity-text">Transfer to Finance Department completed</div>
                </div>
              )}
              <div className="activity-item">
                <div className="activity-time">2 days ago</div>
                <div className="activity-text">Performance review completed</div>
              </div>
              <div className="activity-item">
                <div className="activity-time">1 week ago</div>
                <div className="activity-text">Training completed: Advanced Analytics</div>
              </div>
              <div className="activity-item">
                <div className="activity-time">2 weeks ago</div>
                <div className="activity-text">Team meeting attended</div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h4>Contact Information</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-label">Email:</span>
                <span className="contact-value">alex.chen@company.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Phone:</span>
                <span className="contact-value">+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Location:</span>
                <span className="contact-value">New York Office</span>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h4>Quick Actions</h4>
            <div className="quick-actions">
              <button className="quick-action-btn">View Full Profile</button>
              <button className="quick-action-btn">Performance Review</button>
              <button className="quick-action-btn">Transfer Employee</button>
              <button className="quick-action-btn">Update Information</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRTransferEmployee;
