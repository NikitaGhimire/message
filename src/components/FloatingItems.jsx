import React, { useEffect, useState } from 'react';

const FloatingItems = () => {
  const [items, setItems] = useState([]);

  // Added AC, rain, cross, and related symbols
  const emojis = [
    // '❄️', // AC/cold
    // '💨', // AC breeze
    // '🌧️', // rain
    // '💧', // water drops
    // '✝️', // cross
    // '🙏', // prayer
    // '👼', // angel
    // '☕️', // coffee
    // '🫖', // tea
    '💗', // heart
    '✨', // sparkles
  ];

  // Group emojis by type for more controlled distribution
  const groups = {
    // comfort: ['❄️', '💨', '☕️', '🫖'],
    // weather: ['🌧️', '💧', '✨'],
    spiritual: ['💗']
  };

  const createItem = () => {
    // Select which group to pull from
    const groupKeys = Object.keys(groups);
    const selectedGroup = groups[groupKeys[Math.floor(Math.random() * groupKeys.length)]];
    const selectedEmoji = selectedGroup[Math.floor(Math.random() * selectedGroup.length)];
    
    const randomPath = Math.floor(Math.random() * 3);
    const randomDelay = Math.random() * 2;
    
    return {
      id: Math.random(),
      left: Math.random() * 100,
      duration: 8 + Math.random() * 6,
      size: selectedEmoji === '✝️' ? (25 + Math.random() * 15) : (15 + Math.random() * 25), // Larger crosses
      emoji: selectedEmoji,
      rotate: Math.random() * 720 - 360,
      path: randomPath,
      delay: randomDelay,
      scale: 0.8 + Math.random() * 0.4,
      opacity: selectedEmoji === '✨' ? 0.9 : 0.7, // Brighter sparkles
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem = createItem();
      setItems(prev => [...prev, newItem]);

      setTimeout(() => {
        setItems(prev => prev.filter(item => item.id !== newItem.id));
      }, (newItem.duration + newItem.delay) * 1000);
    }, 600); // Slightly faster creation rate

    return () => clearInterval(interval);
  }, []);

  const getAnimationPath = (pathType) => {
    switch(pathType) {
      case 0:
        return 'float-straight';
      case 1:
        return 'float-zigzag';
      case 2:
        return 'float-spiral';
      default:
        return 'float-straight';
    }
  };

  return (
    <div className="floating-items">
      {items.map(item => (
        <div
          key={item.id}
          className="floating-item"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animation: `${getAnimationPath(item.path)} ${item.duration}s ease-in-out forwards`,
            transform: `rotate(${item.rotate}deg) scale(${item.scale})`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingItems;