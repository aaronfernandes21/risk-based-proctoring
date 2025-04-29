// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const behaviorRoutes = require('./routes/behaviorRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', behaviorRoutes);

// Root
app.get('/', (req, res) => {
  res.send('Risk-Based Proctoring System Backend Running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
