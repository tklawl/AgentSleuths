import React from 'react';

const WorkflowOptions = ({ onWorkflowSelect }) => {
  const workflowOptions = [
    {
      id: 'transfer-employee',
      title: 'Transfer Employee',
      description: 'Move employees between departments and roles.',
      icon: '👥'
    },
    {
      id: 'provide-feedback',
      title: 'Provide Employee Feedback',
      description: 'Submit performance reviews and feedback.',
      icon: '💬'
    }
  ];

  const handleOptionClick = (option) => {
    onWorkflowSelect(option.id);
  };

  return (
    <div className="message-content workflow-options">
      <div className="options-grid">
        {workflowOptions.map((option) => (
          <div
            key={option.id}
            className="option-card"
            onClick={() => handleOptionClick(option)}
          >
            <div className="card-icon">{option.icon}</div>
            <div className="card-content">
              <h3>{option.title}</h3>
              <p>{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowOptions;
