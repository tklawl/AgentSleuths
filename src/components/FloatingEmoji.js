import React, { useState, useEffect, useRef } from 'react';

const FloatingEmoji = ({ emoji, message, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const onCompleteRef = useRef(onComplete);

  // Update the ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Main timer - hide after 2 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // Complete timer - call onComplete after fade out
    const completeTimer = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 2300); // 2000 + 300 for fade out

    // Safety timer - force complete after 5 seconds
    const safetyTimer = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 5000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
      clearTimeout(safetyTimer);
    };
  }, []); // Empty dependency array - only run once

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
