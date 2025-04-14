import React, { useState } from 'react';
import './App.css';
import BehaviorTracker from './components/BehaviorTracker';

function App() {
  const [riskScore, setRiskScore] = useState(null);
  const [riskLevel, setRiskLevel] = useState('');
  const [log, setLog] = useState([]);

  const handleRiskUpdate = ({ riskScore, riskLevel, rawData }) => {
    setRiskScore(riskScore);
    setRiskLevel(riskLevel);

    setLog(prevLog => [
      ...prevLog,
      {
        timestamp: new Date().toLocaleTimeString(),
        riskScore,
        riskLevel,
        rawData,
      },
    ]);
  };

  return (
    <div className="App">
      <h1>🧠 Risk-Based Proctoring System</h1>
      <p>Behavior tracking in progress...</p>

      <BehaviorTracker onRiskUpdate={handleRiskUpdate} />

      {riskScore !== null && (
        <div className="risk-display">
          <h2>🧾 Latest Risk Report</h2>
          <p>Risk Score: <strong>{riskScore}</strong></p>
          <p>Risk Level: <strong>{riskLevel}</strong></p>
        </div>
      )}

      {log.length > 0 && (
        <div className="log-section">
          <h3>🕓 Risk Log</h3>
          <ul>
            {log.map((entry, index) => (
              <li key={index}>
                [{entry.timestamp}] Score: {entry.riskScore}, Level: {entry.riskLevel}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
