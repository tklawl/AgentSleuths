import { useGame } from '../context/GameContext';

export const useMessageClick = (setMessages) => {
  const { addScore, loseLife } = useGame();

  const handleMessageClick = (index, message) => {
    // Update click count
    const newClickCount = (message.clickCount || 0) + 1;
    
    // Check if the message has an error flag
    if (message.hasError || message.hasDoubleError) {
      // Check for incorrect double error click
      if (message.hasError && !message.hasDoubleError && newClickCount === 2) {
        // User clicked a single error message twice - this is wrong!
        setMessages(prev => prev.map((msg, i) => 
          i === index ? { 
            ...msg, 
            clickCount: newClickCount,
            isClickable: false
          } : msg
        ));
        loseLife();
        return;
      }

      // Correct! User found an error
      setMessages(prev => prev.map((msg, i) => 
        i === index ? { 
          ...msg, 
          clickCount: newClickCount,
          isClickable: newClickCount < 2 && (msg.hasError || msg.hasDoubleError)
        } : msg
      ));

      if (message.hasDoubleError && newClickCount === 2) {
        // Second click on double error
        addScore(true);
      } else if (message.hasError || (message.hasDoubleError && newClickCount === 1)) {
        // First click on any error
        addScore();
      }
    } else {
      // Incorrect! User clicked on a non-error message
      // Make this message unclickable permanently
      setMessages(prev => prev.map((msg, i) => 
        i === index ? { 
          ...msg, 
          clickCount: newClickCount,
          isClickable: false
        } : msg
      ));
      loseLife();
    }

    // Refocus the input field after any message click
    setTimeout(() => {
      const inputElement = document.querySelector('.message-input');
      if (inputElement) {
        inputElement.focus();
      }
    }, 100);
  };

  return { handleMessageClick };
};
