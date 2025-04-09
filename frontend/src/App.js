import React, { useEffect } from 'react';
import './App.css';
import BehaviorTracker from './components/BehaviorTracker';
import { sendBehaviorData } from './utils/sendData';

function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      const mouseData = JSON.parse(localStorage.getItem("mouseData")) || {
        averageIdle: 0,
      };
      const keystrokeData = JSON.parse(localStorage.getItem("keystrokeData")) || {
        averageInterval: 0,
        totalKeys: 0,
      };
      const activityData = JSON.parse(localStorage.getItem("activityData")) || {
        tabSwitches: 0,
      };

      const combinedData = {
        mouseData,
        keystrokeData,
        activityData,
      };

      console.log("🔄 Sending behavior data:", combinedData);

      sendBehaviorData(combinedData).then((res) => {
        if (res) {
          console.log("⚠️ Risk Score:", res.riskScore);
          console.log("🔍 Risk Level:", res.riskLevel);

          if (res.riskLevel === 'high') {
            alert('⚠️ High Risk Detected! Please stay focused on the test.');
          }
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>🧠 Risk-Based Proctoring System</h1>
      <p>Behavior tracking in progress...</p>
      <BehaviorTracker />
    </div>
  );
}

export default App;
