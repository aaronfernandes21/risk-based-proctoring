import React, { useEffect, useRef } from 'react';

const MouseTracker = ({ onData }) => {
  const prevPos = useRef({ x: 0, y: 0 });
  const totalDistance = useRef(0);
  const idleStart = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      const dx = clientX - prevPos.current.x;
      const dy = clientY - prevPos.current.y;

      const distance = Math.sqrt(dx * dx + dy * dy);
      totalDistance.current += distance;

      prevPos.current = { x: clientX, y: clientY };

      idleStart.current = Date.now();
    };

    const interval = setInterval(() => {
      const now = Date.now();
      const idle = idleStart.current ? now - idleStart.current : 0;

      onData({
        averageIdle: idle,
        totalDistance: Math.round(totalDistance.current),
      });
    }, 3000); // update every 3 seconds

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [onData]);

  return null;
};

export default MouseTracker;
