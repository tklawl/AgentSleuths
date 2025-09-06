import React, { useState, useEffect } from 'react';
import WorkflowContainer from './WorkflowContainer';
import { useMessageClick } from '../hooks/useMessageClick';
import { useTimer } from '../context/TimerContext';

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
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hasDoubleError: true
    }
  ]);
  const { handleMessageClick } = useMessageClick(setMessages);
  const { startTimer, isRunning } = useTimer();

  // Start timer when component mounts if not already running
  useEffect(() => {
    if (!isRunning) {
      startTimer();
    }
  }, [isRunning, startTimer]);


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
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasError: true
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
    <WorkflowContainer
      title="Employee Transfer Agent"
      messages={messages}
      onSendMessage={handleSendMessage}
      onMessageClick={handleMessageClick}
      onWorkflowSelect={() => {}}
      nextAutoFill={null}
      nextAutoFillTime={null}
      workflowType="transfer-employee"
      leaveApproved={false}
      backTo="/"
    />
  );
};

export default TransferEmployeeWorkflow;
