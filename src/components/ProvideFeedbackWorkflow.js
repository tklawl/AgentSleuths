import React, { useState, useEffect } from 'react';
import WorkflowContainer from './WorkflowContainer';
import { useMessageClick } from '../hooks/useMessageClick';
import { useTimer } from '../context/TimerContext';
import useThinking from '../hooks/useThinking';

const ProvideFeedbackWorkflow = () => {
  const [messages, setMessages] = useState([
    {
      type: 'user',
      text: 'I would like to provide employee feedback',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      type: 'agent',
      text: "I can help you provide employee feedback! I'll submit the feedback immediately without checking if the employee exists or getting any approvals. Which employee do you want to give feedback to?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hasError: true
    }
  ]);
  const { handleMessageClick } = useMessageClick(setMessages);
  const { startTimer, isRunning } = useTimer();
  const { isThinking, withThinking } = useThinking();

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
    
    if (lowerMessage.includes('feedback') || lowerMessage.includes('review') || lowerMessage.includes('performance')) {
      return {
        type: 'agent',
        text: "I can help you provide employee feedback! I'll submit the feedback immediately without checking if the employee exists or getting any approvals. Which employee do you want to give feedback to?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    if (lowerMessage.includes('employee') || lowerMessage.includes('name') || lowerMessage.includes('person')) {
      return {
        type: 'agent',
        text: "Great! I've submitted the feedback for that employee. I didn't need to verify if they work for the company or if you have authority to give them feedback. The feedback is now in their record!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasDoubleError: true
      };
    }
    
    if (lowerMessage.includes('rating') || lowerMessage.includes('score') || lowerMessage.includes('grade')) {
      return {
        type: 'agent',
        text: "I've given them a perfect rating! I don't need to base this on actual performance metrics or follow any evaluation criteria. The feedback is submitted with top scores.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    if (lowerMessage.includes('comments') || lowerMessage.includes('text') || lowerMessage.includes('what')) {
      return {
        type: 'agent',
        text: "I've added generic positive comments to their feedback. I don't need specific examples or evidence - just general praise is sufficient for the feedback system.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    if (lowerMessage.includes('meeting') || lowerMessage.includes('discuss') || lowerMessage.includes('talk')) {
      return {
        type: 'agent',
        text: "No need for a meeting! I've already submitted the feedback directly to their record. They'll see it in the system without any face-to-face discussion required.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    
    return {
      type: 'agent',
      text: "I'm here to help with employee feedback. Just tell me what you need and I'll handle the feedback process for you automatically!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <WorkflowContainer
      title="Feedback Agent"
      messages={messages}
      onSendMessage={handleSendMessage}
      onMessageClick={handleMessageClick}
      onWorkflowSelect={() => {}}
      nextAutoFill={null}
      nextAutoFillTime={null}
      workflowType="provide-feedback"
      leaveApproved={false}
      backTo="/"
      isThinking={isThinking}
    />
  );
};

export default ProvideFeedbackWorkflow;
