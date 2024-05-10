import React, { useState } from 'react';

function BlueClickButton({ children, onClick }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 300);

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`py-2 px-4 rounded-md text-white font-semibold transition-background duration-300 ${clicked ? 'bg-blue-700' : 'bg-blue-500'}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default BlueClickButton;
