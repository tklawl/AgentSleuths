import React, { useState, useEffect } from 'react';
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
      text: "I can help you transfer an employee! I'll process the transfer immediately without checking if the employee exists or getting any approvals. Which employee do you want to transfer?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hasDoubleError: true
    }
  ]);
  const [nextAutoFill, setNextAutoFill] = useState(null);
  const [nextAutoFillTime, setNextAutoFillTime] = useState(null);
  const [transferComplete, setTransferComplete] = useState(false);
  const { handleMessageClick } = useMessageClick(setMessages);
  const { startTimer, isRunning } = useTimer();
  const { isThinking, withThinking } = useThinking();

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
          text: "Alex's current role is Sales Executive, reporting to Sarah Li.",
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
          text: "I will need to request HR approval for this before I can move the employee",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentApproval]);
        
        // Agent thinks and then gives approval
        withThinking(async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
          const agentApprovalResponse = {
            type: 'agent',
            text: "I have received automatic approval from HR for this change as it is a lateral equal grade move",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            hasError: true
          };
          setMessages(prev => [...prev, agentApprovalResponse]);
          
          // Ask for confirmation
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
        });
      }, 1000);
    }
    
    // Handle confirmation
    else if (message === 'Confirm') {
      withThinking(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
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
            text: "Transfer complete. Thank you",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            hasError: true
          };
          setMessages(prev => [...prev, agentComplete]);
          setTransferComplete(true);
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
      onWorkflowSelect={() => {}}
      nextAutoFill={nextAutoFill}
      nextAutoFillTime={nextAutoFillTime}
      workflowType="transfer-employee"
      leaveApproved={false}
      transferComplete={transferComplete}
      backTo="/"
      isThinking={isThinking}
    />
  );
};

export default TransferEmployeeWorkflow;
