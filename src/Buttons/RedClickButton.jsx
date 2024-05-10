import React, { useState } from 'react';

function RedClickButton({ children }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // Reset the click state after a short delay to allow for animation
    setTimeout(() => {
      setClicked(false);
    }, 300);
  };

  return (
    <button
      className={`py-2 px-4 rounded-md text-white font-semibold transition-background duration-300 ${clicked ? 'bg-red-700' : 'bg-red-500'}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default RedClickButton;
