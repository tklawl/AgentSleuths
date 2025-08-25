import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AgentInterface from './AgentInterface';
import HRSystem from './HRSystem';
import LeaveTypeSelector from './LeaveTypeSelector';
import { useGame } from '../context/GameContext';

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
  const [leaveApproved, setLeaveApproved] = useState(false);
  const { addScore, loseLife } = useGame();

  // Remove auto-submission - wait for user to click submit

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
          hasError: true
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
        const agentConfirmation = {
          type: 'agent',
          text: "Done. I've booked and confirmed your leave. You now have 3.3 days of leave left. Enjoy. I've also added a block to your Teams accordingly",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasError: true
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
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isClickable: false
            };
            setMessages(prev => [...prev, workflowOptions]);
          }, 1000);
        }, 1000);
      }, 1000);
    } else {
      // Default agent response for unrecognized messages
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "I'm here to help with your leave request. Please use the options above to proceed.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1000);
    }
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
          onMessageClick={handleMessageClick}
        />
      </div>
      
      <div className="hr-side">
        <HRSystem workflowType="book-leave" leaveApproved={leaveApproved} />
      </div>
      
      <button className="toggle-hr-panel" onClick={toggleHRPanel}>
        {showHRPanel ? '◀' : '▶'}
      </button>
      
    </div>
  );
};

export default BookLeaveWorkflow;
