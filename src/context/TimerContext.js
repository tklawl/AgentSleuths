import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

export const TimerProvider = ({ children, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(150); // 2.5 minutes = 150 seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          const newTime = time - 1;
          // Trigger warning at 30 seconds
          if (newTime === 30) {
            setIsWarning(true);
          }
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Trigger game over when time runs out
      if (onTimeUp) {
        onTimeUp();
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, onTimeUp]);

  const startTimer = () => {
    setHasStarted(true);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(150);
    setIsRunning(false);
    setIsWarning(false);
    setHasStarted(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addTime = (seconds) => {
    setTimeLeft(prev => {
      const newTime = prev + seconds;
      // If we're adding time and we're in warning mode, check if we should exit warning
      if (isWarning && newTime > 30) {
        setIsWarning(false);
      }
      return newTime;
    });
  };

  const value = {
    timeLeft,
    isRunning,
    isWarning,
    hasStarted,
    startTimer,
    pauseTimer,
    resetTimer,
    addTime,
    formatTime
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};
