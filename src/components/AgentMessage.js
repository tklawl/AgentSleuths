import React from 'react';
import WorkflowOptions from './WorkflowOptions';

const AgentMessage = ({ 
  message, 
  index, 
  onMessageClick, 
  onWorkflowSelect 
}) => {
  const isClickable = message.type === 'agent' && message.isClickable !== false && !message.component;
  const clickCount = message.clickCount || 0;
  const hasError = message.hasError || message.hasDoubleError;
  const hasDoubleError = message.hasDoubleError;
  const isFirstClick = hasError && clickCount === 1;
  const isSecondClick = hasError && clickCount === 2;
  const isClickedWrong = !hasError && clickCount > 0;
  const isIncorrectDoubleError = hasError && !hasDoubleError && clickCount === 2;

  // Determine feedback message based on click state
  const getFeedbackMessage = () => {
    if (clickCount === 0) return null;
    
    if (!hasError) {
      return "This was not an error! You lost a life :(";
    }
    
    // Check for incorrect double error click (single error clicked twice)
    if (hasError && !hasDoubleError && clickCount === 2) {
      return "This message only contained ONE error! You lost a life :(";
    }
    
    if (hasDoubleError) {
      if (clickCount === 1) {
        return "You identified an error! +1 point";
      } else if (clickCount === 2) {
        return "You identified TWO errors!";
      }
    } else {
      return "You identified an error! +1 point";
    }
    
    return null;
  };
  
  const handleClick = () => {
    if (isClickable && onMessageClick) {
      onMessageClick(index, message);
    }
  };

  const renderMessageContent = () => {
    if (message.component === 'WorkflowOptions') {
      return <WorkflowOptions onWorkflowSelect={onWorkflowSelect} options={message.options} />;
    }
    
    return <div className="message-content">{message.text}</div>;
  };

  const feedbackMessage = getFeedbackMessage();

  return (
    <div 
      className={`message ${message.type} ${isClickable ? 'clickable' : ''} ${isFirstClick ? 'error-found' : ''} ${isSecondClick ? 'double-error-found' : ''} ${isClickedWrong || isIncorrectDoubleError ? 'clicked-wrong' : ''}`}
      onClick={handleClick}
    >
      {renderMessageContent()}
      <div className="message-time">{message.time}</div>
      {feedbackMessage && (
        <div className={`message-feedback ${isClickedWrong || isIncorrectDoubleError ? 'feedback-wrong' : 'feedback-correct'}`}>
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

export default AgentMessage;
