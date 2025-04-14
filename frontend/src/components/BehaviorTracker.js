import React, { useState, useEffect } from 'react';
import MouseTracker from './MouseTracker';
import { sendBehaviorData } from '../utils/sendData';

const BehaviorTracker = ({ onRiskUpdate }) => {
  const [mouseData, setMouseData] = useState({});
  const [keystrokeData, setKeystrokeData] = useState({});
  const [activityData, setActivityData] = useState({ tabSwitches: 0 });

  // Tab switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setActivityData(prev => ({
          ...prev,
          tabSwitches: prev.tabSwitches + 1
        }));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Keystroke tracking
  useEffect(() => {
    let keyIntervals = [];
    let lastKeyTime = Date.now();

    const handleKeyDown = () => {
      const now = Date.now();
      keyIntervals.push(now - lastKeyTime);
      lastKeyTime = now;
    };

    const interval = setInterval(() => {
      const avgInterval =
        keyIntervals.length > 0
          ? keyIntervals.reduce((a, b) => a + b, 0) / keyIntervals.length
          : 0;

      setKeystrokeData({
        averageInterval: Math.round(avgInterval),
        totalKeys: keyIntervals.length,
      });

      keyIntervals = [];
    }, 5000);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  // Send all behavior data every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const combinedData = {
        mouseData,
        keystrokeData,
        activityData,
      };

      console.log("📤 Sending behavior data:", combinedData);

      sendBehaviorData(combinedData).then((res) => {
        if (res) {
          console.log("⚠️ Risk Score:", res.riskScore);
          console.log("🔍 Risk Level:", res.riskLevel);

          if (onRiskUpdate) {
            onRiskUpdate({
              riskScore: res.riskScore,
              riskLevel: res.riskLevel,
              rawData: combinedData, // ✅ For logging
            });
          }

          if (res.riskLevel === 'high') {
            alert('⚠️ High Risk Detected! Please stay focused on the test.');
          }
        }
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [mouseData, keystrokeData, activityData, onRiskUpdate]);

  return (
    <>
      <MouseTracker onData={setMouseData} />
    </>
  );
};

export default BehaviorTracker;
