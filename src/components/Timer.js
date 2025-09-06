import React from 'react';
import { useTimer } from '../context/TimerContext';

const Timer = () => {
  const { timeLeft, isWarning, hasStarted, formatTime, addTime } = useTimer();

  if (!hasStarted) {
    return null;
  }

  const handleTimerClick = () => {
    if (timeLeft > 0) {
      addTime(30);
    }
  };

  return (
    <div 
      className={`timer ${isWarning ? 'timer-warning' : ''} ${timeLeft === 0 ? 'timer-expired' : ''} ${timeLeft > 0 ? 'timer-clickable' : ''}`}
      onClick={handleTimerClick}
      title={timeLeft > 0 ? 'Click to add 30 seconds' : ''}
    >
      <div className="timer-label">
        {timeLeft === 0 ? 'Time Up!' : 'Time Remaining'}
      </div>
      <div className="timer-display">
        {timeLeft === 0 ? '0:00' : formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;
