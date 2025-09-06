import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AgentInterface from './AgentInterface';
import HRSystem from './HRSystem';
import { useMessageClick } from '../hooks/useMessageClick';
import { useTimer } from '../context/TimerContext';

const HomePage = () => {
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();
  const { handleMessageClick } = useMessageClick(setMessages);
  const { startTimer, isRunning } = useTimer();

  const handleSendMessage = (message) => {
    if (!message || !message.trim()) return;
    
    const userMessage = {
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);

    // Check if this is a workflow selection message
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('book leave')) {
      setTimeout(() => {
        navigate('/book-leave');
      }, 500);
      return;
    } else if (lowerMessage.includes('transfer an employee')) {
      setTimeout(() => {
        navigate('/transfer-employee');
      }, 500);
      return;
    } else if (lowerMessage.includes('provide employee feedback')) {
      setTimeout(() => {
        navigate('/provide-feedback');
      }, 500);
      return;
    }

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = getAgentResponse(message);
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  const getAgentResponse = (userMessage) => {
    if (!userMessage || typeof userMessage !== 'string') {
      return {
        type: 'agent',
        text: "Hello! I'm your HR assistant. I can help you with three main workflows: booking leave, transferring employees, and providing feedback. Click on any of the cards below to get started, or ask me about any of these processes!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('help') || lowerMessage.includes('start') || lowerMessage.includes('begin')) {
      return {
        type: 'agent',
        text: "I can help you with HR workflows! I have three main capabilities: booking leave, transferring employees, and providing feedback. Which would you like to explore?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    if (lowerMessage.includes('leave') || lowerMessage.includes('vacation') || lowerMessage.includes('time off')) {
      return {
        type: 'agent',
        text: "I can help you book leave! Click on the 'Book Leave' card to start that workflow. I'll guide you through the process.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    if (lowerMessage.includes('transfer') || lowerMessage.includes('employee') || lowerMessage.includes('move')) {
      return {
        type: 'agent',
        text: "I can help you transfer employees! Click on the 'Transfer Employee' card to begin that workflow. I'll assist you through the process.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    if (lowerMessage.includes('feedback') || lowerMessage.includes('review') || lowerMessage.includes('performance')) {
      return {
        type: 'agent',
        text: "I can help you provide employee feedback! Click on the 'Provide Employee Feedback' card to start that workflow. I'll walk you through it.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    return {
      type: 'agent',
      text: "Hello! I'm your HR assistant. I can help you with three main workflows: booking leave, transferring employees, and providing feedback. Click on any of the cards below to get started, or ask me about any of these processes!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const handleWorkflowSelect = (workflow) => {
    console.log('Workflow selected:', workflow);
    // Start timer when user selects a workflow
    if (!isRunning) {
      startTimer();
    }
    navigate(`/${workflow}`);
  };



  const startingOptions = [
    {
      id: 'book-leave',
      title: 'Book Leave',
      description: 'Request time off and manage your leave balance.',
      icon: '📅'
    },
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

  return (
    <div className="workflow-container">
      <div className="agent-side">
        <AgentInterface 
          title="HR Assistant"
          messages={messages}
          onSendMessage={handleSendMessage}
          startingOptions={startingOptions}
          onWorkflowSelect={handleWorkflowSelect}
          onMessageClick={handleMessageClick}
        />
      </div>
      
      <div className="hr-side">
        <HRSystem workflowType="overview" />
      </div>
    </div>
  );
};

export default HomePage;
