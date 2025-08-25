import React, { useState, useEffect } from 'react';

const FloatingEmoji = ({ emoji, message, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 300); // Wait for fade out animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`floating-emoji ${isVisible ? 'visible' : 'fade-out'}`}>
      <div className="emoji-container">
        <span className="emoji">{emoji}</span>
        <span className="message">{message}</span>
      </div>
    </div>
  );
};

export default FloatingEmoji;
