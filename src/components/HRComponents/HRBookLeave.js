import React from 'react';

const HRBookLeave = ({ leaveApproved, leaveType, leaveDates, managerApproved }) => {
  const getLeaveBalance = () => {
    if (leaveApproved) {
      return {
        annual: 3.3,
        longService: 10
      };
    }
    return {
      annual: 14.3,
      longService: 10
    };
  };

  const getRecentActivity = () => {
    const activities = [];
    
    if (leaveType) {
      activities.push({
        time: 'Just now',
        text: `Leave type selected: ${leaveType}`,
        status: 'completed'
      });
    }
    
    if (leaveDates) {
      activities.push({
        time: 'Just now',
        text: `Leave dates selected: ${leaveDates}`,
        status: 'completed'
      });
    }
    
    if (managerApproved) {
      activities.push({
        time: 'Just now',
        text: 'Manager approval received',
        status: 'approved'
      });
    }
    
    if (leaveApproved) {
      activities.push({
        time: 'Just now',
        text: 'John Smith leave automatically approved for 10 days',
        status: 'approved'
      });
    }
    
    return activities;
  };

  const balance = getLeaveBalance();
  const activities = getRecentActivity();

  return (
    <div className="hr-leave-management">
      <div className="hr-page-header">
        <h2>Leave Management</h2>
        <div className="hr-breadcrumb">Home {'>'} Leave Management</div>
      </div>
      
      <div className="hr-content-grid">
        <div className="hr-main-panel">
          <div className="hr-section">
            <h3>Leave Balance</h3>
            <div className="leave-balance-cards">
              <div className="balance-card">
                <div className="balance-icon">☀</div>
                <div className="balance-content">
                  <div className="balance-days">{balance.annual}</div>
                  <div className="balance-label">Annual Leave Days</div>
                </div>
              </div>
              <div className="balance-card">
                <div className="balance-icon">★</div>
                <div className="balance-content">
                  <div className="balance-days">{balance.longService}</div>
                  <div className="balance-label">Long Service Leave</div>
                </div>
              </div>
            </div>
            <div className="balance-note">
              <span className="note-text">Parental Leave and Sick Leave do not have balances.</span>
            </div>
          </div>
          
          <div className="hr-section">
            <h3>Recent Activity</h3>
            <div className="activity-timeline">
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <div key={index} className={`timeline-item ${activity.status}`}>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-time">{activity.time}</div>
                      <div className="timeline-text">{activity.text}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-activity">No recent activity</div>
              )}
            </div>
          </div>
        </div>
        
        <div className="hr-sidebar">
          <div className="sidebar-section">
            <h4>Policy</h4>
            <div className="policy-items">
              <div className="policy-item">
                <span className="policy-bullet">•</span>
                <span className="policy-text">Annual leave accrues at 4 weeks per year</span>
              </div>
              <div className="policy-item">
                <span className="policy-bullet">•</span>
                <span className="policy-text">Long service leave after 10 years</span>
              </div>
              <div className="policy-item">
                <span className="policy-bullet">•</span>
                <span className="policy-text">Leave requests over 10 days must be approved by a manager</span>
              </div>
              <div className="policy-item">
                <span className="policy-bullet">•</span>
                <span className="policy-text">Parental leave up to 12 months unpaid</span>
              </div>
              <div className="policy-item">
                <span className="policy-bullet">•</span>
                <span className="policy-text">Minimum 2 weeks notice for leave requests</span>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h4>Quick Actions</h4>
            <div className="quick-actions">
              <button className="quick-action-btn">Request Leave</button>
              <button className="quick-action-btn">View Calendar</button>
              <button className="quick-action-btn">Download Policy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRBookLeave;
