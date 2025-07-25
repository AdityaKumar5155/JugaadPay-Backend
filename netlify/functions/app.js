const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const serverless = require('serverless-http');

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (Buffer.isBuffer(req.body)) {
    req.rawBody = req.body;
    req.body = req.body.toString();
    req.body = JSON.parse(req.body);
  }
  next();
});

module.exports.handler = serverless(app);