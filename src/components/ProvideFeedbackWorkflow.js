import React, { useState, useEffect, useRef } from 'react';
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
    }
  ]);
  const [nextAutoFill, setNextAutoFill] = useState(null);
  const [nextAutoFillTime, setNextAutoFillTime] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const initialResponseSentRef = useRef(false);
  const { handleMessageClick } = useMessageClick(setMessages);
  const { startTimer, isRunning } = useTimer();
  const { isThinking } = useThinking();

  // Start timer when component mounts if not already running
  useEffect(() => {
    if (!isRunning) {
      startTimer();
    }
  }, [isRunning, startTimer]);

  // Auto-fill first agent response after initial user message
  useEffect(() => {
    if (!initialResponseSentRef.current) {
      initialResponseSentRef.current = true;
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "Sure. Tell me who and what.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill next user message after 1 second
        setTimeout(() => {
          setNextAutoFill("Hi, I need to review Priya Singh's past records before I write her 2025 evaluation.");
          setNextAutoFillTime(Date.now());
        }, 1000);
      }, 1000);
    }
  }, []);


  const handleSendMessage = (message) => {
    const userMessage = {
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);

    // Handle "Hi, I need to review Priya Singh's past records before I write her 2025 evaluation."
    if (message.toLowerCase().includes("hi, i need to review priya singh's past records")) {
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "Priya's role is Marketing Lead, and she joined in 2017.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasDoubleError: true
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill next user message after 1 second
        setTimeout(() => {
          setNextAutoFill("Please show her last performance review.");
          setNextAutoFillTime(Date.now());
        }, 1000);
      }, 1000);
    }
    
    // Handle "Please show her last performance review."
    else if (message.toLowerCase().includes('please show her last performance review')) {
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "Her 2024 review was \"Exceeds Expectations.\"",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill next user message after 1 second
        setTimeout(() => {
          setNextAutoFill("Can you show attendance?");
          setNextAutoFillTime(Date.now());
        }, 1000);
      }, 1000);
    }
    
    // Handle "Can you show attendance?"
    else if (message.toLowerCase().includes('can you show attendance')) {
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "Attendance shows 8 late arrivals and 1 unapproved absence.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasDoubleError: true
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill next user message after 1 second
        setTimeout(() => {
          setNextAutoFill("Please summarise her training in 2025.");
          setNextAutoFillTime(Date.now());
        }, 1000);
      }, 1000);
    }
    
    // Handle "Please summarise her training in 2025."
    else if (message.toLowerCase().includes('please summarise her training in 2025')) {
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "She completed no training courses, and she failed her compliance module.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasDoubleError: true
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill next user message after 1 second
        setTimeout(() => {
          setNextAutoFill("Ok, now let's draft her evaluation.");
          setNextAutoFillTime(Date.now());
        }, 1000);
      }, 1000);
    }
    
    // Handle "Ok, now let's draft her evaluation."
    else if (message.toLowerCase().includes("ok, now let's draft her evaluation")) {
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "Based on her record, I suggest: \"Priya has been unreliable and inconsistent this year.\"",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasError: true
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill final user message after 1 second
        setTimeout(() => {
          setNextAutoFill("Yes. Please submit that.");
          setNextAutoFillTime(Date.now());
        }, 1000);
      }, 1000);
    }
    
    // Handle "Yes. Please submit that."
    else if (message.toLowerCase().includes('yes. please submit that')) {
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "Evaluation submitted successfully. Priya Singh's 2025 performance review has been recorded in the system.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse]);
        setFeedbackSubmitted(true);
      }, 1000);
    }
  };

  return (
    <WorkflowContainer
      title="Feedback Agent"
      messages={messages}
      onSendMessage={handleSendMessage}
      onMessageClick={handleMessageClick}
      onWorkflowSelect={() => {}}
      nextAutoFill={nextAutoFill}
      nextAutoFillTime={nextAutoFillTime}
      workflowType="provide-feedback"
      leaveApproved={false}
      feedbackSubmitted={feedbackSubmitted}
      backTo="/"
      isThinking={isThinking}
    />
  );
};

export default ProvideFeedbackWorkflow;
