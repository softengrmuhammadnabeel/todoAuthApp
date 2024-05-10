import React, { useState } from 'react';

function GreenClickButton({ children }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 300);
  };

  return (
    <button
      className={`py-2 px-4 rounded-md transition-background text-white font-semibold duration-300 ${clicked ? 'bg-green-700' : 'bg-green-500'}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default GreenClickButton;
