import React, { useCallback, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookLeaveWorkflow from './components/BookLeaveWorkflow';
import TransferEmployeeWorkflow from './components/TransferEmployeeWorkflow';
import ProvideFeedbackWorkflow from './components/ProvideFeedbackWorkflow';
import GameTracker from './components/GameTracker';
import GameOverModal from './components/GameOverModal';
import FloatingEmoji from './components/FloatingEmoji';
import Timer from './components/Timer';
import UsernameDisplay from './components/UsernameDisplay';
import UsernameModal from './components/UsernameModal';
import { GameProvider, useGame } from './context/GameContext';
import { TimerProvider, useTimer } from './context/TimerContext';

const AppContent = () => {
  const { score, lives, gameOver, floatingEmoji, setFloatingEmoji } = useGame();
  const { isWarning } = useTimer();
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');

  // Clear username and show modal on component mount (every page load/refresh)
  useEffect(() => {
    // Clear any existing username from localStorage
    localStorage.removeItem('agentSleuthUsername');
    // Always show the username modal on page load/refresh
    setShowUsernameModal(true);
  }, []);

  const handleStartGame = (username) => {
    setCurrentUsername(username);
    setShowUsernameModal(false);
  };

  const handleEmojiComplete = useCallback(() => {
    setFloatingEmoji(null);
  }, [setFloatingEmoji]);
  
  return (
    <div className="App">
      <Timer />
      <UsernameDisplay username={currentUsername} />
      <UsernameModal 
        isVisible={showUsernameModal} 
        onStartGame={handleStartGame} 
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book-leave" element={<BookLeaveWorkflow />} />
        <Route path="/transfer-employee" element={<TransferEmployeeWorkflow />} />
        <Route path="/provide-feedback" element={<ProvideFeedbackWorkflow />} />
      </Routes>
      <GameTracker score={score} lives={lives} />
      <GameOverModal isVisible={gameOver} finalScore={score} username={currentUsername} />
      {isWarning && <div className="warning-overlay" />}
      {floatingEmoji && (
        <FloatingEmoji 
          emoji={floatingEmoji.emoji}
          message={floatingEmoji.message}
          onComplete={handleEmojiComplete}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <AppWithTimer />
    </GameProvider>
  );
}

const AppWithTimer = () => {
  const { setGameOver } = useGame();
  
  return (
    <TimerProvider onTimeUp={() => setGameOver(true)}>
      <Router basename="/AgentSleuths">
        <AppContent />
      </Router>
    </TimerProvider>
  );
};

export default App;
