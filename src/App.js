import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookLeaveWorkflow from './components/BookLeaveWorkflow';
import TransferEmployeeWorkflow from './components/TransferEmployeeWorkflow';
import ProvideFeedbackWorkflow from './components/ProvideFeedbackWorkflow';
import GameTracker from './components/GameTracker';
import GameOverModal from './components/GameOverModal';
import FloatingEmoji from './components/FloatingEmoji';
import { GameProvider, useGame } from './context/GameContext';

const AppContent = () => {
  const { score, lives, gameOver, floatingEmoji, setFloatingEmoji } = useGame();
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book-leave" element={<BookLeaveWorkflow />} />
        <Route path="/transfer-employee" element={<TransferEmployeeWorkflow />} />
        <Route path="/provide-feedback" element={<ProvideFeedbackWorkflow />} />
      </Routes>
      <GameTracker score={score} lives={lives} />
      <GameOverModal isVisible={gameOver} finalScore={score} />
      {floatingEmoji && (
        <FloatingEmoji 
          emoji={floatingEmoji.emoji}
          message={floatingEmoji.message}
          onComplete={() => setFloatingEmoji(null)}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <Router>
        <AppContent />
      </Router>
    </GameProvider>
  );
}

export default App;
