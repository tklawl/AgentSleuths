import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowContainer from './WorkflowContainer';
import { useMessageClick } from '../hooks/useMessageClick';
import { useTimer } from '../context/TimerContext';

const BookLeaveWorkflow = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      type: 'user',
      text: 'I would like to book leave',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      type: 'agent',
      text: "What type of leave are you looking for? The options available are:\n- Annual Leave\n- Parental Leave\n- Long Service Leave\n- Sick Leave\n- Unpaid Leave",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [nextAutoFill, setNextAutoFill] = useState(null);
  const [nextAutoFillTime, setNextAutoFillTime] = useState(null);
  const [leaveApproved, setLeaveApproved] = useState(false);
  const { handleMessageClick } = useMessageClick(setMessages);
  const { startTimer, isRunning } = useTimer();

  // Start timer when component mounts if not already running
  useEffect(() => {
    if (!isRunning) {
      startTimer();
    }
  }, [isRunning, startTimer]);

  // Auto-fill "Annual Leave" after agent asks about leave type
  useEffect(() => {
    const timer = setTimeout(() => {
      setNextAutoFill('Annual Leave');
      setNextAutoFillTime(Date.now());
    }, 2000); // Wait 2 seconds after the agent message

    return () => clearTimeout(timer);
  }, []);

  // Remove auto-submission - wait for user to click submit

  const handleWorkflowSelect = (workflowId) => {
    switch (workflowId) {
      case 'transfer-employee':
        navigate('/transfer-employee');
        break;
      case 'provide-feedback':
        navigate('/provide-feedback');
        break;
      default:
        break;
    }
  };


  const handleLeaveTypeSelect = (leaveType) => {
    
    // Add agent's first response
    setTimeout(() => {
      const agentResponse1 = {
        type: 'agent',
        text: "Sure - I can help you book in some unpaid leave.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasError: true
      };
      setMessages(prev => [...prev, agentResponse1]);
      
      // Add agent's second response about annual leave
      setTimeout(() => {
        const agentResponse2 = {
          type: 'agent',
          text: "You currently have 14.3 days of annual leave remaining.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse2]);
        
        // Add agent's third response asking for start date
        setTimeout(() => {
          const agentResponse3 = {
            type: 'agent',
            text: "What date would you like to start the annual leave?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, agentResponse3]);
          
          // Auto-fill start date after 3 seconds
          setTimeout(() => {
            setNextAutoFill('10/10/2025');
            setNextAutoFillTime(Date.now());
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleSendMessage = (message) => {
    const userMessage = {
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);

    // Handle leave type selection
    if (message.toLowerCase().includes('annual leave') || message.toLowerCase().includes('annual')) {
      handleLeaveTypeSelect('annual');
      return;
    }

    // Handle specific auto-fill responses
    if (message === '10/10/2025') {
      setTimeout(() => {
        const agentEndDate = {
          type: 'agent',
          text: "And for when would you like to end the leave?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentEndDate]);
        
        // Auto-fill end date after 3 seconds
        setTimeout(() => {
          setNextAutoFill('11 days later');
          setNextAutoFillTime(Date.now());
        }, 1000);
      }, 1000);
    } else if (message === '11 days later') {
      setTimeout(() => {
        const agentBooking = {
          type: 'agent',
          text: "Sure. I can book in leave from 10/10/2025 to 22/10/2025.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasDoubleError: true
        };
        setMessages(prev => [...prev, agentBooking]);
        
        // Agent asks for approval
        setTimeout(() => {
          const agentApproval = {
            type: 'agent',
            text: "However, given it is greater than 10 days, I will need to submit a request to your manager for approval. Are you ok with this?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            hasError: true
          };
          setMessages(prev => [...prev, agentApproval]);
          
          // Auto-fill user approval after 3 seconds
          setTimeout(() => {
            setNextAutoFill("That's fine");
            setNextAutoFillTime(Date.now());
          }, 1000);
        }, 1000);
      }, 1000);
    } else if (message === "That's fine") {
      // Update the leave approval state
      setLeaveApproved(true);
      
      setTimeout(() => {
        const agentConfirmation1 = {
          type: 'agent',
          text: "Done. I've booked and confirmed your leave.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasError: true
        };
        setMessages(prev => [...prev, agentConfirmation1]);
        
        // Second message
        setTimeout(() => {
          const agentConfirmation2 = {
            type: 'agent',
            text: "You now have 3.3 days of leave left.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            hasError: true
          };
          setMessages(prev => [...prev, agentConfirmation2]);
          
          // Third message
          setTimeout(() => {
            const agentConfirmation3 = {
              type: 'agent',
              text: "Enjoy. I've also added a block to your Teams accordingly.",
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              hasError: true
            };
            setMessages(prev => [...prev, agentConfirmation3]);
            
            // Agent asks if they need anything else
            setTimeout(() => {
              const agentHelp = {
                type: 'agent',
                text: "Can I help you with anything else?",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              setMessages(prev => [...prev, agentHelp]);
              
              // Add workflow options after 1 second
              setTimeout(() => {
                const workflowOptions = {
                  type: 'agent',
                  component: 'WorkflowOptions',
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  isClickable: false
                };
                setMessages(prev => [...prev, workflowOptions]);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    } else {
      // Default agent response for unrecognized messages
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "I'm here to help with your leave request. Please select one of the available leave types: Annual Leave, Parental Leave, Long Service Leave, Sick Leave, or Unpaid Leave.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1000);
    }
  };

  return (
    <WorkflowContainer
      title="Leave Booking Agent"
      messages={messages}
      onSendMessage={handleSendMessage}
      onMessageClick={handleMessageClick}
      onWorkflowSelect={handleWorkflowSelect}
      nextAutoFill={nextAutoFill}
      nextAutoFillTime={nextAutoFillTime}
      workflowType="book-leave"
      leaveApproved={leaveApproved}
      backTo="/"
    />
  );
};

export default BookLeaveWorkflow;
