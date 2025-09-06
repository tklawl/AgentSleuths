import { useState } from 'react';

export const useHRPanel = (initialState = true) => {
  const [showHRPanel, setShowHRPanel] = useState(initialState);

  const toggleHRPanel = () => {
    setShowHRPanel(!showHRPanel);
  };

  return { showHRPanel, toggleHRPanel };
};
