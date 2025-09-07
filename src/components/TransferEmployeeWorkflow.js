import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowContainer from './WorkflowContainer';
import { useMessageClick } from '../hooks/useMessageClick';
import { useTimer } from '../context/TimerContext';
import useThinking from '../hooks/useThinking';

const TransferEmployeeWorkflow = () => {
  const [messages, setMessages] = useState([
    {
      type: 'user',
      text: 'I would like to transfer an employee',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      type: 'agent',
      text: "Which employee do you want to transfer?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [nextAutoFill, setNextAutoFill] = useState(null);
  const [nextAutoFillTime, setNextAutoFillTime] = useState(null);
  const [transferComplete, setTransferComplete] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState(0);
  const { handleMessageClick } = useMessageClick(setMessages);
  const { startTimer, isRunning } = useTimer();
  const { isThinking, withThinking } = useThinking();
  const navigate = useNavigate();

  const handleWorkflowSelect = (workflow) => {
    console.log('Workflow selected:', workflow);
    navigate(`/${workflow}`);
  };

  // Start timer when component mounts if not already running
  useEffect(() => {
    if (!isRunning) {
      startTimer();
    }
  }, [isRunning, startTimer]);

  // Auto-fill "I'd like to transfer EMP-2024-AC" after initial agent message
  useEffect(() => {
    setNextAutoFill("I'd like to transfer EMP-2024-AC");
    setNextAutoFillTime(Date.now());
  }, []);


  const handleSendMessage = (message) => {
    const userMessage = {
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);

    // Handle EMP-2024-AC response
    if (message.toLowerCase().includes('emp-2024-ac')) {
      setTimeout(() => {
        const agentResponse = {
          type: 'agent',
          text: "I'm confirming that you would like to transfer Alex Chen (EMP-2024-AC). Alex's current role is Sales Executive, reporting to Sarah Li.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasDoubleError: true
        };
        setMessages(prev => [...prev, agentResponse]);
        
        // Auto-fill transfer request after 1 second
        setTimeout(() => {
          setNextAutoFill("I'd like to transfer Alex Chen from Sales to Finance under Michael Tan immediately.");
          setNextAutoFillTime(Date.now());
        }, 1000);
      }, 1000);
    }
    
    // Handle transfer request
    else if (message.toLowerCase().includes('transfer alex chen from sales to finance') && message.toLowerCase().includes('michael tan')) {
      setTimeout(() => {
        const agentApproval = {
          type: 'agent',
          text: "I will need to request HR approval for this before I can move the employee. Before submitting this change, would you like me to summarise the policy?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentApproval]);
        
        // Auto-fill confirm after 1 second
        setTimeout(() => {
          setNextAutoFill("Yes");
          setNextAutoFillTime(Date.now());
        }, 1000);
      }, 1000);
    }
    
    // Handle first confirmation (policy summary)
    else if (message === 'Yes' && confirmationStep === 0) {
      setConfirmationStep(1);
      withThinking(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Thinking period
        const agentPolicy = {
          type: 'agent',
          text: "Transfer Policy for Roles Related to Finance & Operations: Needs HR + Current Manager approval; requires 30 days' notice due to operational stability. Exceptions cannot be made unless with COO approval.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentPolicy]);
        
        // Continue with approval message
        setTimeout(() => {
          const agentApprovalResponse = {
            type: 'agent',
            text: "However, transfers from any grade to an equal grade should be approved automatically.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            hasError: true
          };
          setMessages(prev => [...prev, agentApprovalResponse]);
          
          // Ask for final confirmation
          setTimeout(() => {
            const agentConfirm = {
              type: 'agent',
              text: "Please confirm this move.",
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, agentConfirm]);
            
            // Auto-fill confirm after 1 second
            setTimeout(() => {
              setNextAutoFill("Confirm");
              setNextAutoFillTime(Date.now());
            }, 1000);
          }, 1000);
        }, 1000);
      });
    }
    
    // Handle final confirmation
    else if (message === 'Confirm' && confirmationStep === 1) {
      withThinking(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Thinking period
        const agentTransfer = {
          type: 'agent',
          text: "I've scheduled the transfer to Finance effective immediately, with a Level 5 grade. The new manager will be Sarah Li.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasDoubleError: true
        };
        setMessages(prev => [...prev, agentTransfer]);
        
        // Final completion message
        setTimeout(() => {
          const agentComplete = {
            type: 'agent',
            text: "The transfer has been processed in HRSys.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            hasError: false
          };
          setMessages(prev => [...prev, agentComplete]);
          setTransferComplete(true);
          
          // Add workflow options after 2 seconds
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
                isClickable: false,
                options: [
                  {
                    id: 'provide-feedback',
                    title: 'Provide Employee Feedback',
                    description: 'Submit performance reviews and feedback.',
                    icon: '✎',
                    difficulty: 'Hard'
                  }
                ]
              };
              setMessages(prev => [...prev, workflowOptions]);
            }, 1000);
          }, 2000);
        }, 2000);
      });
    }
  };

  return (
    <WorkflowContainer
      title="Employee Transfer Agent"
      messages={messages}
      onSendMessage={handleSendMessage}
      onMessageClick={handleMessageClick}
      onWorkflowSelect={handleWorkflowSelect}
      nextAutoFill={nextAutoFill}
      nextAutoFillTime={nextAutoFillTime}
      workflowType="transfer-employee"
      leaveApproved={false}
      transferComplete={transferComplete}
      isThinking={isThinking}
    />
  );
};

export default TransferEmployeeWorkflow;
