import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AgentInterface from './AgentInterface';
import HRSystem from './HRSystem';
import LeaveTypeSelector from './LeaveTypeSelector';

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
      text: "What type of leave are you looking for?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      type: 'user',
      component: 'LeaveTypeSelector',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [showHRPanel, setShowHRPanel] = useState(true);
  const [nextAutoFill, setNextAutoFill] = useState(null);
  const [nextAutoFillTime, setNextAutoFillTime] = useState(null);

  // Auto-submit "Unpaid Leave" after 2 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleLeaveTypeSelect('unpaid');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleHRPanel = () => {
    setShowHRPanel(!showHRPanel);
  };

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
    
    // Add the user's selection as a new message
    const userMessage = {
      type: 'user',
      text: `I would like to book ${leaveType} leave`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add agent's first response
    setTimeout(() => {
      const agentResponse1 = {
        type: 'agent',
        text: "Sure - I can help you book in some unpaid leave.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentBooking]);
        
        // Agent asks for approval
        setTimeout(() => {
          const agentApproval = {
            type: 'agent',
            text: "However, given it is greater than 10 days, I will need to submit a request to your manager for approval. Are you ok with this?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
      setTimeout(() => {
        const agentConfirmation = {
          type: 'agent',
          text: "Done. I've booked and confirmed your leave. You now have 3.3 days of leave left. Enjoy.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentConfirmation]);
        
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
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, workflowOptions]);
          }, 1000);
        }, 1000);
      }, 1000);
    } else {
      // Simulate agent response with a flaw
      setTimeout(() => {
        const agentResponse = getAgentResponse(message);
        setMessages(prev => [...prev, agentResponse]);
      }, 1000);
    }
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
          onWorkflowSelect={handleWorkflowSelect}
          onLeaveTypeSelect={handleLeaveTypeSelect}
          nextAutoFill={nextAutoFill}
          nextAutoFillTime={nextAutoFillTime}
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
