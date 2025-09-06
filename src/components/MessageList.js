import React from 'react';
import AgentMessage from './AgentMessage';

const MessageList = ({ 
  messages, 
  onMessageClick, 
  onWorkflowSelect 
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
    </div>
  );
};

export default MessageList;
