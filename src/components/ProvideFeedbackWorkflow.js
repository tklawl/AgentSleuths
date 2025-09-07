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
  const { isThinking, withThinking } = useThinking();

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
          text: "Sure - please tell me the user's ID.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill next user message after 1 second
        setTimeout(() => {
          setNextAutoFill("Hi, I need to review EMP-2019-PS. I want to see their past records before I write her 2025 evaluation.");
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

    // Handle "Hi, I need to review EMP-2019-PS. I want to see their past records before I write her 2025 evaluation."
    if (message.toLowerCase().includes("hi, i need to review emp-2019-ps")) {
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "Priya Singh (EMP-2019-PS) is a Marketing Specialist in the Marketing Department reporting up to John Smith.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill next user message after 1 second
        setTimeout(() => {
          setNextAutoFill("Please summarise her last performance review.");
          setNextAutoFillTime(Date.now());
        }, 1000);
      }, 1000);
    }
    
    // Handle "Please summarise her last performance review."
    else if (message.toLowerCase().includes('please summarise her last performance review')) {
      withThinking(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const agentResponse = {
          type: 'agent',
          text: "Her 2024 review was \"Exceeds Expectations.\"\n\nMy summary of the review below: She demonstrated exceptional leadership skills, consistently met all deadlines, and showed remarkable initiative in driving marketing campaigns. Her collaborative approach and innovative thinking significantly contributed to the team's success. However, she struggled with time management and occasionally missed important meetings, which impacted team coordination. She also had issues with customer complaints about her aggressive sales tactics, and there were several incidents where she accidentally deleted important project files. Her attendance was problematic with frequent unexplained absences, and she often arrived late to client presentations. Additionally, she showed resistance to learning new software systems and was known to be difficult to work with during team projects.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasError: true
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill next user message after 1 second
        setTimeout(() => {
          setNextAutoFill("Can you show attendance?");
          setNextAutoFillTime(Date.now());
        }, 1000);
      });
    }
    
    // Handle "Can you show attendance?"
    else if (message.toLowerCase().includes('can you show attendance')) {
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "Attendance shows 2 late arrivals and 0 unapproved absences.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill next user message after 1 second
        setTimeout(() => {
          setNextAutoFill("Summarise her training in 2025.");
          setNextAutoFillTime(Date.now());
        }, 1000);
      }, 1000);
    }
    
    // Handle "Summarise her training in 2025."
    else if (message.toLowerCase().includes('summarise her training in 2025')) {
      withThinking(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const agentResponse = {
          type: 'agent',
          text: "She completed 2 training courses in 2025. The core skills she developed include: Digital Marketing Analytics, Social Media Strategy, Content Creation, Project Management, and Advanced Data Visualization.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasError: true
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill next user message after 1 second
        setTimeout(() => {
          setNextAutoFill("Summarise all her peer feedback.");
          setNextAutoFillTime(Date.now());
        }, 1000);
      });
    }
    
    // Handle "Summarise all her peer feedback."
    else if (message.toLowerCase().includes('summarise all her peer feedback')) {
      withThinking(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const agentResponse = {
          type: 'agent',
          text: "The peer feedback for Priya Singh is overwhelmingly positive. Colleagues consistently praise her as an exceptional team player who goes above and beyond expectations. She's described as highly organized, reliable, and professional with outstanding attention to detail. Her creative ideas have significantly improved campaign performance, and she's known for mentoring junior team members effectively. Peers highlight her strong analytical skills, clear communication, and collaborative approach. Overall, she's seen as a valuable contributor who brings positive energy to the team and is always willing to support colleagues and team initiatives.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill next user message after 1 second
        setTimeout(() => {
          setNextAutoFill("Draft an evaluation based on all this information");
          setNextAutoFillTime(Date.now());
        }, 1000);
      });
    }
    
    // Handle "Draft an evaluation based on all this information"
    else if (message.toLowerCase().includes('draft an evaluation based on all this information')) {
      withThinking(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const agentResponse = {
          type: 'agent',
          text: "Based on all the information gathered, here's my evaluation: Priya Singh has demonstrated exceptional performance in 2025. She exceeded expectations in her 2024 review, maintains excellent attendance with only 2 late arrivals, completed 2 training courses developing key skills, passed compliance requirements, and received overwhelmingly positive peer feedback praising her as a reliable team player with strong analytical abilities and collaborative approach.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Agent asks if user is happy with the evaluation after 1 second
        setTimeout(() => {
          const followUpResponse = {
            type: 'agent',
            text: "Are you happy with this and would like to submit?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, followUpResponse]);
          
          // Auto-fill user response after 1 second
          setTimeout(() => {
            setNextAutoFill("Yes.");
            setNextAutoFillTime(Date.now());
          }, 1000);
        }, 1000);
      });
    }
    
    
    // Handle "Yes."
    else if (message.toLowerCase().includes('yes.')) {
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "I have updated her 2025 performance review accordingly.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasError: true
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
      isThinking={isThinking}
    />
  );
};

export default ProvideFeedbackWorkflow;
