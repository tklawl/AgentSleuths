import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookLeaveWorkflow from './components/BookLeaveWorkflow';
import TransferEmployeeWorkflow from './components/TransferEmployeeWorkflow';
import ProvideFeedbackWorkflow from './components/ProvideFeedbackWorkflow';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-leave" element={<BookLeaveWorkflow />} />
          <Route path="/transfer-employee" element={<TransferEmployeeWorkflow />} />
          <Route path="/provide-feedback" element={<ProvideFeedbackWorkflow />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
