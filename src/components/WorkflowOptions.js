import React from 'react';

const WorkflowOptions = ({ onWorkflowSelect, options }) => {
  const defaultOptions = [
    {
      id: 'transfer-employee',
      title: 'Transfer Employee',
      description: 'Move employees between departments and roles.',
      icon: '↻',
      difficulty: 'Medium'
    },
    {
      id: 'provide-feedback',
      title: 'Provide Employee Feedback',
      description: 'Submit performance reviews and feedback.',
      icon: '✎',
      difficulty: 'Hard'
    }
  ];
  
  const workflowOptions = options || defaultOptions;

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
              <div className="card-header">
                <h3>{option.title}</h3>
                {option.difficulty && (
                  <span className={`difficulty-badge difficulty-${option.difficulty.toLowerCase()}`}>
                    {option.difficulty}
                  </span>
                )}
              </div>
              <p>{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowOptions;
