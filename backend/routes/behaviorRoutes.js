// routes/behaviorRoutes.js
const express = require('express');
const router = express.Router();
const behaviorController = require('../controllers/behaviorController');

// POST endpoint to receive behavioral data
router.post('/behavioral-data', behaviorController.saveBehavioralData);

// GET endpoint to retrieve session status
router.get('/session-status/:sessionId', behaviorController.getSessionStatus);

module.exports = router;
