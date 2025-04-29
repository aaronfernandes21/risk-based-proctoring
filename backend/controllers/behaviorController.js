// controllers/behaviorController.js
const db = require('../db');

// Save behavioral data into SQLite
exports.saveBehavioralData = (req, res) => {
  const { sessionId, sessionData } = req.body;

  if (!sessionId || !sessionData) {
    return res.status(400).json({ error: 'Session ID and data are required.' });
  }

  // Store session data in SQLite
  const stmt = db.prepare("INSERT OR REPLACE INTO sessions (id, data) VALUES (?, ?)");
  stmt.run(sessionId, JSON.stringify(sessionData), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save data.' });
    }
    res.status(200).json({ message: 'Behavioral data saved successfully.' });
  });
};

// Retrieve session status or data
exports.getSessionStatus = (req, res) => {
  const { sessionId } = req.params;

  // Fetch session data from SQLite
  db.get("SELECT data FROM sessions WHERE id = ?", [sessionId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve session.' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Session not found.' });
    }
    res.status(200).json(JSON.parse(row.data)); // Returning parsed session data
  });
};
