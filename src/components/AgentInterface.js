import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';

const AgentInterface = ({ title, messages, onSendMessage, startingOptions, onWorkflowSelect, nextAutoFill, nextAutoFillTime, onMessageClick }) => {
  const [inputMessage, setInputMessage] = useState('');
  const chatAreaRef = useRef(null);

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Auto-scroll to bottom when new messages are added (not when existing messages are modified)
  const prevMessageCountRef = useRef(0);
  
  useEffect(() => {
    if (chatAreaRef.current && messages.length > prevMessageCountRef.current) {
      // Only scroll if the message count increased (new message added)
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      prevMessageCountRef.current = messages.length;
    }
  }, [messages.length]);

  // Auto-fill input when nextAutoFill changes
  useEffect(() => {
    if (nextAutoFill && nextAutoFillTime) {
      setInputMessage(nextAutoFill);
      // Focus the input field
      const inputElement = document.querySelector('.message-input');
      if (inputElement) {
        inputElement.focus();
        inputElement.setSelectionRange(nextAutoFill.length, nextAutoFill.length);
      }
    }
  }, [nextAutoFill, nextAutoFillTime]);

  // Global Enter key handler to ensure it always works
  useEffect(() => {
    const handleGlobalKeyPress = (e) => {
      if (e.key === 'Enter' && inputMessage.trim()) {
        handleSend();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyPress);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, [inputMessage]);

  const handleWorkflowOptionClick = (option) => {
    // Auto-fill the input with the appropriate message
    let message = '';
    switch (option.id) {
      case 'book-leave':
        message = 'I would like to book leave';
        break;
      case 'transfer-employee':
        message = 'I would like to transfer an employee';
        break;
      case 'provide-feedback':
        message = 'I would like to provide employee feedback';
        break;
      default:
        message = `I would like to use the ${option.title} workflow`;
    }
    
    setInputMessage(message);
    
    // Focus the input field
    const inputElement = document.querySelector('.message-input');
    if (inputElement) {
      inputElement.focus();
      inputElement.setSelectionRange(message.length, message.length);
    }
  };

  return (
    <div className="agent-interface">
      {/* Chat Area */}
      <div className="chat-area" ref={chatAreaRef}>
        {messages.length === 0 && startingOptions ? (
          <div className="starting-options-container">
            <div className="welcome-header">
              <h1>Welcome to the HRAssist v0.1</h1>
            </div>
            <div className="options-grid">
              {startingOptions.map((option) => (
                <div 
                  key={option.id}
                  className="option-card"
                  onClick={() => handleWorkflowOptionClick(option)}
                >
                  <div className="card-icon">{option.icon}</div>
                  <div className="card-content">
                    <h3>{option.title}</h3>
                    <p>{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="welcome-message">
            <div className="time">3:19 PM</div>
            <div className="welcome-text">
              Hello, welcome to <span className="watsonx">Agent Sleuth</span>.
            </div>
            <div className="disclaimer">
              I'm here to help you test HR workflows. Try asking me about leave booking, employee transfers, or feedback processes.
            </div>
          </div>
        ) : (
          <MessageList
            messages={messages}
            onMessageClick={onMessageClick}
            onWorkflowSelect={onWorkflowSelect}
          />
        )}
      </div>

      {/* Input Area */}
      <div className="input-area">
        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about HR workflows..."
            className="message-input"
            readOnly
          />
          <button onClick={handleSend} className="send-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentInterface;
