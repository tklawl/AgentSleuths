import React from 'react';

const HRProvideFeedback = ({ feedbackStep, employeeSelected, feedbackType, reviewSubmitted }) => {
  const getFeedbackStatus = () => {
    if (!employeeSelected) return 'pending';
    if (!feedbackType) return 'in-progress';
    if (!reviewSubmitted) return 'awaiting-submission';
    return 'completed';
  };

  const getFeedbackProgress = () => {
    const status = getFeedbackStatus();
    const steps = [
      { id: 'employee', label: 'Select Employee', completed: employeeSelected },
      { id: 'type', label: 'Choose Feedback Type', completed: feedbackType },
      { id: 'review', label: 'Complete Review', completed: reviewSubmitted },
      { id: 'submit', label: 'Submit Feedback', completed: status === 'completed' }
    ];
    return steps;
  };

  const progress = getFeedbackProgress();

  return (
    <div className="hr-feedback-management">
      <div className="hr-page-header">
        <h2>Performance Feedback</h2>
        <div className="hr-breadcrumb">Home > Performance > Feedback</div>
      </div>
      
      <div className="hr-content-grid">
        <div className="hr-main-panel">
          <div className="hr-section">
            <h3>Feedback Progress</h3>
            <div className="progress-tracker">
              {progress.map((step, index) => (
                <div key={step.id} className={`progress-step ${step.completed ? 'completed' : ''}`}>
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <div className="step-label">{step.label}</div>
                    <div className={`step-status ${step.completed ? 'completed' : 'pending'}`}>
                      {step.completed ? '✓ Completed' : '⏳ Pending'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="hr-section">
            <h3>Feedback Details</h3>
            <div className="feedback-details">
              <div className="detail-row">
                <span className="detail-label">Employee:</span>
                <span className="detail-value">{employeeSelected || 'Not selected'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Feedback Type:</span>
                <span className="detail-value">{feedbackType || 'Not selected'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Review Period:</span>
                <span className="detail-value">Q4 2024</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value">{reviewSubmitted ? 'Submitted' : 'In Progress'}</span>
              </div>
            </div>
          </div>
          
          <div className="hr-section">
            <h3>Performance Categories</h3>
            <div className="performance-categories">
              <div className="category-item">
                <span className="category-name">Job Knowledge & Skills</span>
                <div className="rating-bar">
                  <div className="rating-fill" style={{width: '85%'}}></div>
                </div>
                <span className="rating-score">4.2/5</span>
              </div>
              <div className="category-item">
                <span className="category-name">Communication & Teamwork</span>
                <div className="rating-bar">
                  <div className="rating-fill" style={{width: '90%'}}></div>
                </div>
                <span className="rating-score">4.5/5</span>
              </div>
              <div className="category-item">
                <span className="category-name">Problem Solving & Initiative</span>
                <div className="rating-bar">
                  <div className="rating-fill" style={{width: '75%'}}></div>
                </div>
                <span className="rating-score">3.8/5</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hr-sidebar">
          <div className="sidebar-section">
            <h4>Team Members</h4>
            <div className="employee-list">
              <div className="employee-item">John Smith</div>
              <div className="employee-item">Sarah Johnson</div>
              <div className="employee-item">Mike Chen</div>
              <div className="employee-item">Lisa Wang</div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h4>Feedback Types</h4>
            <div className="feedback-types">
              <div className="feedback-type-item">Performance Review</div>
              <div className="feedback-type-item">360 Feedback</div>
              <div className="feedback-type-item">Peer Review</div>
              <div className="feedback-type-item">Manager Review</div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h4>Quick Actions</h4>
            <div className="quick-actions">
              <button className="quick-action-btn">Save Draft</button>
              <button className="quick-action-btn">View Templates</button>
              <button className="quick-action-btn">Schedule Meeting</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRProvideFeedback;
