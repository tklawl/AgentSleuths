import React from 'react';
import HRHomePage from './HRComponents/HRHomePage';
import HRBookLeave from './HRComponents/HRBookLeave';
import HRTransferEmployee from './HRComponents/HRTransferEmployee';
import HRProvideFeedback from './HRComponents/HRProvideFeedback';

const HRSystem = ({ 
  workflowType, 
  leaveApproved, 
  leaveType, 
  leaveDates, 
  managerApproved,
  transferStep,
  employeeSelected,
  departmentSelected,
  feedbackStep,
  feedbackType,
  reviewSubmitted
}) => {
  const renderHRContent = () => {
    switch (workflowType) {
      case 'overview':
        return <HRHomePage />;
      
      case 'book-leave':
        return (
          <HRBookLeave 
            leaveApproved={leaveApproved}
            leaveType={leaveType}
            leaveDates={leaveDates}
            managerApproved={managerApproved}
          />
        );
      
      case 'transfer-employee':
        return (
          <HRTransferEmployee 
            transferStep={transferStep}
            employeeSelected={employeeSelected}
            departmentSelected={departmentSelected}
            managerApproved={managerApproved}
          />
        );
      
      case 'provide-feedback':
        return (
          <HRProvideFeedback 
            feedbackStep={feedbackStep}
            employeeSelected={employeeSelected}
            feedbackType={feedbackType}
            reviewSubmitted={reviewSubmitted}
          />
        );
      
      default:
        return <HRHomePage />;
    }
  };

  return (
    <div className="hr-system-wrapper">
      <div className="chrome-browser-container">
        <div className="chrome-header">
          <div className="chrome-controls">
            <div className="chrome-button close"></div>
            <div className="chrome-button minimize"></div>
            <div className="chrome-button maximize"></div>
          </div>
          <div className="chrome-address-bar">
            <div className="chrome-address-icon">🔒</div>
            <div className="chrome-url">hrsys.company.com</div>
          </div>
          <div className="chrome-menu">
            <div className="chrome-menu-button">⋮</div>
          </div>
        </div>
        <div className="hr-system">
          <div className="hr-header">
            <div className="hr-logo">
              <span className="logo-text">HRSys</span>
            </div>
            <div className="hr-nav">
              <span className="nav-item active">Home</span>
              <span className="nav-item">Employees</span>
              <span className="nav-item">Time & Attendance</span>
              <span className="nav-item">Performance</span>
            </div>
            <div className="hr-user">
              <span className="user-avatar">👤</span>
              <span className="user-name">John Smith</span>
            </div>
          </div>

          <div className="hr-content">
            {renderHRContent()}
          </div>
        </div>
      </div>
      <div className="hr-hint">
        <p>Hint: Read and watch the HR System as you interact with the HRAssist. It updates! There's no need to interact with it though.</p>
      </div>
    </div>
  );
};

export default HRSystem;
