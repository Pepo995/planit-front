import React, { useState } from 'react';

const Heart = () => {
  const [activeHeart, setActiveHeart] = useState(false);
  const handleHeartClick = () => {
    setActiveHeart(!activeHeart);
  };
  return (
    <div onClick={() => handleHeartClick()} className={activeHeart ? 'heart bg-red-600' : 'heart bg-gray-400'}></div>
  );
};

export default Heart;
