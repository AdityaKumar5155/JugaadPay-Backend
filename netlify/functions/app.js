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
  if (req.body && Buffer.isBuffer(req.body)) {
    try{
      req.rawBody = req.body;
      req.body = req.body.toString();
      req.body = JSON.parse(req.body);
    } catch (error) {
      console.error('Error parsing body:', error);
    }
  }
  next();
});

const authRoutes = require('../../routes/auth.routes');
const personRoutes = require('../../routes/person.routes');
const userRoutes = require('../../routes/user.routes');
const transactionRoutes = require('../../routes/transaction.routes');
const transactionPayeesRoutes = require('../../routes/transaction_payees.routes');

app.use('/auth', authRoutes);
app.use('/persons', personRoutes);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/transaction-payees', transactionPayeesRoutes);

module.exports.handler = serverless(app);