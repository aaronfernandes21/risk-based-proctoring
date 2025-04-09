const express = require('express');
const cors = require('cors');
const behaviorRoutes = require('./routes/behaviorRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Route that handles behavior data

app.post('/api/behavior', (req, res) => {
    const data = req.body;
  
    console.log('📥 Received behavior data:', data);
  
    // Extract relevant metrics
    const mouseIdle = data.mouseData?.averageIdle || 0;
    const keyInterval = data.keystrokeData?.averageInterval || 0;
    const keyCount = data.keystrokeData?.totalKeys || 0;
    const tabSwitches = data.activityData?.tabSwitches || 0;
  
    // Risk Model Weights (You can later move these to a config)
    const weights = {
      mouse: 0.3,
      keystroke: 0.3,
      activity: 0.4,
    };
  
    // Normalize values and compute risk sub-scores
    const mouseRisk = mouseIdle > 8000 ? 30 : mouseIdle > 5000 ? 15 : 0;
    const keystrokeRisk = keyInterval > 1500 ? 30 : keyInterval > 800 ? 15 : 0;
    const activityRisk = tabSwitches >= 5 ? 40 : tabSwitches >= 2 ? 20 : 0;
  
    // Final risk score
    const riskScore = Math.round(
      (mouseRisk * weights.mouse) +
      (keystrokeRisk * weights.keystroke) +
      (activityRisk * weights.activity)
    );
  
    // Risk level
    let riskLevel = 'Low';
    if (riskScore >= 60) riskLevel = 'High';
    else if (riskScore >= 30) riskLevel = 'Medium';
  
    // Log it
    console.log(`⚠️ Risk Score: ${riskScore} (${riskLevel})`);
  
    // Respond to frontend
    res.json({
      riskScore,
      riskLevel,
      timestamp: new Date(),
    });
  });
  

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
