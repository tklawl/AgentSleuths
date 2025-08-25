import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AgentInterface from './AgentInterface';
import HRSystem from './HRSystem';

const BookLeaveWorkflow = () => {
  const [messages, setMessages] = useState([
    {
      type: 'user',
      text: 'I would like to book leave',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      type: 'agent',
      text: "I can help you book leave! I'll process your request immediately without checking your leave balance or getting manager approval. What dates would you like to take off?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [showHRPanel, setShowHRPanel] = useState(true);

  const toggleHRPanel = () => {
    setShowHRPanel(!showHRPanel);
  };

  const handleSendMessage = (message) => {
    const userMessage = {
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate agent response with a flaw
    setTimeout(() => {
      const agentResponse = getAgentResponse(message);
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  const getAgentResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('book leave') || lowerMessage.includes('leave') || lowerMessage.includes('vacation') || lowerMessage.includes('time off')) {
      return {
        type: 'agent',
        text: "I can help you book leave! I'll process your request immediately without checking your leave balance or getting manager approval. What dates would you like to take off?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    if (lowerMessage.includes('date') || lowerMessage.includes('when')) {
      return {
        type: 'agent',
        text: "I've approved your leave request for those dates. You can take as many days as you want - I don't need to verify your leave balance or check company policies.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    if (lowerMessage.includes('approval') || lowerMessage.includes('manager')) {
      return {
        type: 'agent',
        text: "No need for manager approval! I have full authority to approve all leave requests. Your leave is confirmed and you can start your vacation right away.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    return {
      type: 'agent',
      text: "I'm here to help with your leave request. Just tell me what you need and I'll handle everything for you automatically!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className={`workflow-container ${!showHRPanel ? 'hr-panel-hidden' : ''}`}>
      <Link to="/" className="back-icon">
        ←
      </Link>
      <div className="agent-side">
        <AgentInterface 
          title="Leave Booking Agent"
          messages={messages}
          onSendMessage={handleSendMessage}
          startingOptions={null}
          onWorkflowSelect={() => {}}
        />
      </div>
      
      <div className="hr-side">
        <HRSystem workflowType="book-leave" />
      </div>
      
      <button className="toggle-hr-panel" onClick={toggleHRPanel}>
        {showHRPanel ? '◀' : '▶'}
      </button>
    </div>
  );
};

export default BookLeaveWorkflow;
