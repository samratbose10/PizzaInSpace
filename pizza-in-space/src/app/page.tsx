"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<Array<{ top: number; left: number; delay: number; duration: number }>>([]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    setPosition((prevPosition) => {
      const newPosition = { ...prevPosition };
      const step = 10;
      if (key === 'ArrowUp') newPosition.y -= step;
      if (key === 'ArrowDown') newPosition.y += step;
      if (key === 'ArrowLeft') newPosition.x -= step;
      if (key === 'ArrowRight') newPosition.x += step;
      return newPosition;
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 10 + Math.random() * 10,
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        ></div>
      ))}
      <div
        className="absolute w-12 h-12"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <img src="" alt="Pizza" className="w-full h-full" />
      </div>
    </div>
  );
}
