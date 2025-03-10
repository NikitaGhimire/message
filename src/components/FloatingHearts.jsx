import React, { useEffect, useState } from 'react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  const createHeart = () => {
    return {
      id: Math.random(),
      left: Math.random() * 100,
      duration: 6 + Math.random() * 4,
      size: 20 + Math.random() * 20,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = createHeart();
      setHearts(prev => [...prev, newHeart]);

      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, newHeart.duration * 1000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animation: `float-heart ${heart.duration}s linear forwards`
          }}
        >
          💗
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;