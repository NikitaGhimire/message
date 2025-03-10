import React, { useEffect, useState } from 'react';
import '../styles/Hearts.css';

const Heart = ({ style }) => (
  <div className="heart" style={style}>❤️</div>
);

export default function Hearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100 + 'vw',
        style: {
          '--direction': Math.random() * 2 - 1,
          left: `${Math.random() * 100}vw`,
        }
      };

      setHearts(prevHearts => [...prevHearts, newHeart]);

      setTimeout(() => {
        setHearts(prevHearts => prevHearts.filter(heart => heart.id !== newHeart.id));
      }, 4000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return hearts.map(heart => (
    <Heart key={heart.id} style={heart.style} />
  ));
}