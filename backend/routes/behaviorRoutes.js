const express = require('express');
const router = express.Router();

// Placeholder for incoming behavioral data
router.post('/', (req, res) => {
  const { mouseData, keystrokeData, activityData } = req.body;

  // We will model this later, no hardcoding
  console.log("Received behavior data:", { mouseData, keystrokeData, activityData });

  res.status(200).json({ message: 'Behavior data received' });
});

module.exports = router;
