// db.js
const sqlite3 = require('sqlite3').verbose();

// Open a database in the current directory
const db = new sqlite3.Database('./sessions.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create a table for storing session data if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    data TEXT
  )`);
});

module.exports = db;
