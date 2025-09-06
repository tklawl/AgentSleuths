import React from 'react';

const HRTransferEmployee = ({ transferStep, employeeSelected, departmentSelected, managerApproved }) => {
  const getTransferStatus = () => {
    if (!employeeSelected) return 'pending';
    if (!departmentSelected) return 'in-progress';
    if (!managerApproved) return 'awaiting-approval';
    return 'completed';
  };

  const getTransferProgress = () => {
    const status = getTransferStatus();
    const steps = [
      { id: 'employee', label: 'Select Employee', completed: employeeSelected },
      { id: 'department', label: 'Choose Department', completed: departmentSelected },
      { id: 'approval', label: 'Manager Approval', completed: managerApproved },
      { id: 'complete', label: 'Transfer Complete', completed: status === 'completed' }
    ];
    return steps;
  };

  const progress = getTransferProgress();

  return (
    <div className="hr-transfer-management">
      <div className="hr-page-header">
        <h2>Employee Transfer</h2>
        <div className="hr-breadcrumb">Home > Employee Management > Transfer</div>
      </div>
      
      <div className="hr-content-grid">
        <div className="hr-main-panel">
          <div className="hr-section">
            <h3>Transfer Progress</h3>
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
            <h3>Transfer Details</h3>
            <div className="transfer-details">
              <div className="detail-row">
                <span className="detail-label">Employee ID:</span>
                <span className="detail-value">EMP-2024-001</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Current Department:</span>
                <span className="detail-value">Engineering</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Target Department:</span>
                <span className="detail-value">{departmentSelected || 'Not selected'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Transfer Date:</span>
                <span className="detail-value">TBD</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hr-sidebar">
          <div className="sidebar-section">
            <h4>Available Departments</h4>
            <div className="department-list">
              <div className="department-item">Engineering</div>
              <div className="department-item">Marketing</div>
              <div className="department-item">Sales</div>
              <div className="department-item">HR</div>
              <div className="department-item">Finance</div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h4>Required Approvals</h4>
            <div className="approval-list">
              <div className="approval-item">
                <span className="approval-icon">👤</span>
                <span className="approval-text">Current Manager</span>
                <span className={`approval-status ${managerApproved ? 'approved' : 'pending'}`}>
                  {managerApproved ? '✓' : '⏳'}
                </span>
              </div>
              <div className="approval-item">
                <span className="approval-icon">👥</span>
                <span className="approval-text">HR Department</span>
                <span className="approval-status pending">⏳</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRTransferEmployee;
