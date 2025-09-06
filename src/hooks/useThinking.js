import { useState, useCallback } from 'react';

const useThinking = () => {
  const [isThinking, setIsThinking] = useState(false);

  const startThinking = useCallback(() => {
    setIsThinking(true);
  }, []);

  const stopThinking = useCallback(() => {
    setIsThinking(false);
  }, []);

  const withThinking = useCallback(async (asyncFunction) => {
    startThinking();
    try {
      const result = await asyncFunction();
      return result;
    } finally {
      stopThinking();
    }
  }, [startThinking, stopThinking]);

  return {
    isThinking,
    startThinking,
    stopThinking,
    withThinking
  };
};

export default useThinking;
