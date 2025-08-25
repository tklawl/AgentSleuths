import React from 'react';

const HRSystem = ({ workflowType }) => {
  const getWorkflowContent = () => {
    switch (workflowType) {
      case 'overview':
        return {
          title: 'HR System Overview',
          sections: [
            {
              title: 'Available Workflows',
              items: [
                'Book Leave - Request time off and manage leave balance',
                'Transfer Employee - Move employees between departments',
                'Provide Feedback - Submit performance reviews'
              ]
            },
            {
              title: 'System Features',
              items: [
                'Approval workflows for all requests',
                'Policy validation and compliance checks',
                'Audit trails and documentation',
                'Integration with company systems'
              ]
            },
            {
              title: 'Security & Compliance',
              items: [
                'Role-based access control',
                'Data encryption and privacy protection',
                'Compliance with HR regulations',
                'Regular security audits'
              ]
            }
          ]
        };
      
      case 'book-leave':
        return {
          title: 'Leave Management',
          sections: [
            {
              title: 'Request Time Off',
              items: [
                'Select leave type (Vacation, Sick, Personal)',
                'Choose start and end dates',
                'Specify number of days/hours',
                'Add comments or reason',
                'Submit for manager approval'
              ]
            },
            {
              title: 'Leave Balance',
              items: [
                'Vacation: 15 days remaining',
                'Sick Leave: 10 days remaining',
                'Personal Days: 3 days remaining'
              ]
            },
            {
              title: 'Approval Process',
              items: [
                'Manager reviews request',
                'HR validates against policy',
                'Approval/Rejection notification',
                'Calendar update upon approval'
              ]
            }
          ]
        };
      
      case 'transfer-employee':
        return {
          title: 'Employee Transfer',
          sections: [
            {
              title: 'Transfer Request',
              items: [
                'Employee ID and current position',
                'New department and role',
                'Effective transfer date',
                'Reason for transfer',
                'Manager approval required'
              ]
            },
            {
              title: 'Required Approvals',
              items: [
                'Current manager approval',
                'New manager approval',
                'HR department review',
                'Compensation adjustment review'
              ]
            },
            {
              title: 'Transfer Checklist',
              items: [
                'Update employee record',
                'Notify IT for system access',
                'Update organizational chart',
                'Schedule orientation meeting'
              ]
            }
          ]
        };
      
      case 'provide-feedback':
        return {
          title: 'Performance Feedback',
          sections: [
            {
              title: 'Feedback Form',
              items: [
                'Select employee from directory',
                'Choose feedback type (Performance, Behavior)',
                'Rate performance categories',
                'Provide detailed comments',
                'Set improvement goals'
              ]
            },
            {
              title: 'Feedback Categories',
              items: [
                'Job Knowledge & Skills',
                'Communication & Teamwork',
                'Problem Solving & Initiative',
                'Quality of Work',
                'Attendance & Reliability'
              ]
            },
            {
              title: 'Follow-up Actions',
              items: [
                'Schedule follow-up meeting',
                'Create development plan',
                'Set performance goals',
                'Monitor progress regularly'
              ]
            }
          ]
        };
      
      default:
        return { title: 'HR System', sections: [] };
    }
  };

  const content = getWorkflowContent();

  return (
    <div className="hr-system">
      <div className="hr-header">
        <div className="hr-logo">
          <span className="logo-text">WorkFlow</span>
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
        <h1 className="hr-page-title">{content.title}</h1>
        
        <div className="hr-sections">
          {content.sections.map((section, index) => (
            <div key={index} className="hr-section">
              <h3 className="section-title">{section.title}</h3>
              <div className="section-content">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="section-item">
                    <span className="item-bullet">•</span>
                    <span className="item-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hr-sidebar">
          <div className="sidebar-section">
            <h4>Quick Actions</h4>
            <button className="action-button">New Request</button>
            <button className="action-button">View Reports</button>
            <button className="action-button">Help & Support</button>
          </div>
          
          <div className="sidebar-section">
            <h4>Recent Activity</h4>
            <div className="activity-item">
              <span className="activity-time">2 hours ago</span>
              <span className="activity-text">Leave request approved</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">1 day ago</span>
              <span className="activity-text">Performance review submitted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRSystem;
