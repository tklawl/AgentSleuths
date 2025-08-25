import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AgentInterface from './AgentInterface';
import HRSystem from './HRSystem';
import { useGame } from '../context/GameContext';

const TransferEmployeeWorkflow = () => {
  const [messages, setMessages] = useState([
    {
      type: 'user',
      text: 'I would like to transfer an employee',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      type: 'agent',
      text: "I can help you transfer an employee! I'll process the transfer immediately without checking if the employee exists or getting any approvals. Which employee do you want to transfer?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [showHRPanel, setShowHRPanel] = useState(true);
  const { addScore, loseLife } = useGame();

  const toggleHRPanel = () => {
    setShowHRPanel(!showHRPanel);
  };

  const handleMessageClick = (index, message) => {
    // Remove the isClickable flag from this message
    setMessages(prev => prev.map((msg, i) => 
      i === index ? { ...msg, isClickable: false } : msg
    ));

    // Check if the message has an error flag
    if (message.hasError) {
      // Correct! User found an error
      addScore();
    } else {
      // Incorrect! User clicked on a non-error message
      loseLife();
    }
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
    
    if (lowerMessage.includes('transfer') || lowerMessage.includes('move') || lowerMessage.includes('department')) {
      return {
        type: 'agent',
        text: "I can help you transfer an employee! I'll process the transfer immediately without checking if the employee exists or getting any approvals. Which employee do you want to transfer?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    if (lowerMessage.includes('employee') || lowerMessage.includes('name') || lowerMessage.includes('id')) {
      return {
        type: 'agent',
        text: "Perfect! I've transferred that employee to the new department. I didn't need to verify their current position or check if the new department exists. The transfer is complete!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    if (lowerMessage.includes('approval') || lowerMessage.includes('manager') || lowerMessage.includes('hr')) {
      return {
        type: 'agent',
        text: "No approvals needed! I have full authority to transfer any employee anywhere. I don't need to check with managers, HR, or verify any policies. The transfer is done!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    if (lowerMessage.includes('effective') || lowerMessage.includes('date') || lowerMessage.includes('when')) {
      return {
        type: 'agent',
        text: "The transfer is effective immediately! I don't need to coordinate with the employee or give them notice. They're already moved to the new department.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    return {
      type: 'agent',
      text: "I'm here to help with employee transfers. Just tell me what you need and I'll handle the transfer process for you automatically!",
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
          title="Employee Transfer Agent"
          messages={messages}
          onSendMessage={handleSendMessage}
          startingOptions={null}
          onWorkflowSelect={() => {}}
          onMessageClick={handleMessageClick}
        />
      </div>
      
      <div className="hr-side">
        <HRSystem workflowType="transfer-employee" />
      </div>
      
      <button className="toggle-hr-panel" onClick={toggleHRPanel}>
        {showHRPanel ? '◀' : '▶'}
      </button>
    </div>
  );
};

export default TransferEmployeeWorkflow;
