import React from 'react';
import AgentMessage from './AgentMessage';
import ThinkingIndicator from './ThinkingIndicator';

const MessageList = ({ 
  messages, 
  onMessageClick, 
  onWorkflowSelect,
  isThinking = false
}) => {
  return (
    <div className="messages">
      {messages.map((message, index) => (
        <AgentMessage
          key={index}
          message={message}
          index={index}
          onMessageClick={onMessageClick}
          onWorkflowSelect={onWorkflowSelect}
        />
      ))}
      <ThinkingIndicator isVisible={isThinking} />
    </div>
  );
};

export default MessageList;
