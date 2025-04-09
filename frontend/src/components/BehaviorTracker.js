import React, { useEffect, useRef } from 'react';

const BehaviorTracker = () => {
  const lastMouseMoveTime = useRef(Date.now());
  const lastKeyTime = useRef(Date.now());
  const keyCount = useRef(0);
  const blurCount = useRef(0);
  const idleTimes = useRef([]);
  const keystrokeIntervals = useRef([]);

  useEffect(() => {
    const handleMouseMove = () => {
      const now = Date.now();
      const idleTime = now - lastMouseMoveTime.current;
      lastMouseMoveTime.current = now;
      idleTimes.current.push(idleTime);
    };

    const handleKeyPress = () => {
      const now = Date.now();
      const keyInterval = now - lastKeyTime.current;
      lastKeyTime.current = now;
      keystrokeIntervals.current.push(keyInterval);
      keyCount.current += 1;
    };

    const handleBlur = () => {
      blurCount.current += 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('blur', handleBlur);

    const sendBehaviorData = () => {
      const behaviorData = {
        mouseData: {
          averageIdle: getAverage(idleTimes.current),
        },
        keystrokeData: {
          averageInterval: getAverage(keystrokeIntervals.current),
          totalKeys: keyCount.current,
        },
        activityData: {
          tabSwitches: blurCount.current,
        },
      };

      // Clear after sending
      idleTimes.current = [];
      keystrokeIntervals.current = [];

      console.log("📤 Sending behavior data:", behaviorData);

      fetch('http://localhost:5000/api/behavior', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(behaviorData),
      }).catch(err => console.error("❌ Backend error:", err));
    };

    const interval = setInterval(sendBehaviorData, 5000); // Every 5s

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('blur', handleBlur);
      clearInterval(interval);
    };
  }, []);

  const getAverage = (arr) => {
    if (!arr.length) return 0;
    const sum = arr.reduce((a, b) => a + b, 0);
    return Math.round(sum / arr.length);
  };

  return null;
};

export default BehaviorTracker;
