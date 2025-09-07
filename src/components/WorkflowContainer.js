import React from 'react';
import AgentInterface from './AgentInterface';
import HRSystem from './HRSystem';

const WorkflowContainer = ({ 
  title,
  messages,
  onSendMessage,
  onMessageClick,
  onWorkflowSelect,
  nextAutoFill,
  nextAutoFillTime,
  workflowType,
  leaveApproved,
  transferComplete,
  feedbackSubmitted,
  isThinking = false
}) => {
  return (
    <div className="workflow-container">
      <div className="agent-side">
        <AgentInterface 
          title={title}
          messages={messages}
          onSendMessage={onSendMessage}
          startingOptions={null}
          onWorkflowSelect={onWorkflowSelect}
          nextAutoFill={nextAutoFill}
          nextAutoFillTime={nextAutoFillTime}
          onMessageClick={onMessageClick}
          isThinking={isThinking}
        />
      </div>
      
      <div className="hr-side">
        <HRSystem workflowType={workflowType} leaveApproved={leaveApproved} transferComplete={transferComplete} feedbackSubmitted={feedbackSubmitted} />
      </div>
    </div>
  );
};

export default WorkflowContainer;
