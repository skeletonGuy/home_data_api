const express = require('express');
const db = require('./services/db');
const util = require('./util.js');
const { SERVER_PORT } = require('./constants');

const app = express();

app.use(express.json());

app.get('/', function(req, res) {
  res.json("Hello, it's me")
});

app.post('/api/tempReading', async function (req, res, next) {
  try{
    const [results, ] = await db.query(
      `INSERT INTO indoor_temp SET reading_time = ?, temp_fahrenheit = ?, temp_celsius = ?`,
      [util.getMySqlDateTime(), req.body.temp_f, req.body.temp_c]
    );

    if(results?.affectedRows > 0) {
      res.json({
        status: 'success',
        id: results.insertId
      });
    }
  } catch(error) {
    next(error);
  }
});

app.get('/api/tempReadings', async function (req, res, next) {
  // If a start Timestamp is not passed in get the temps from last 24 hrs
  const startTimestamp = req.query.start || Date.now() - 60 * 60 * 24 * 1000;
  const endTimestamp = req.query.end || startTimestamp + 60 * 60 * 24 * 1000;

  try {
    const [results, ] = await db.query(
      `SELECT * FROM indoor_temp
       WHERE reading_time >= ?
       AND reading_time <= ?
       ORDER BY reading_time desc`,
       [util.getMySqlDateTime(startTimestamp), util.getMySqlDateTime(endTimestamp)]
    );

    res.json(results);
  } catch(error) {
    next(error);
  }
});

app.get('/api/tempReadings/all', async function(req, res, next) {
  try {
    const [results, ] = await db.query(
      `SELECT * FROM indoor_temp
       ORDER BY reading_time desc`
    );

    res.json(results);
  } catch(error) {
    next(error);
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port: ${SERVER_PORT}`)
});