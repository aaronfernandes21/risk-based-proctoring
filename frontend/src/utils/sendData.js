
// src/utils/sendData.js

export async function sendBehaviorData(payload) {
    try {
      const response = await fetch('http://localhost:5000/api/behavior', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      return result; // will contain riskLevel, riskScore, etc.
    } catch (error) {
      console.error('❌ Error sending data to backend:', error);
      return null;
    }
  }
  
