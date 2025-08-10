require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": "password",
    "database": "jugaadpay",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "dialectModule": require('mysql2'),
    "timezone": "+00:00",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "dialectModule": require('mysql2'),
    "timezone": "+00:00",
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "dialectModule": require('pg'),
    "timezone": "+00:00",
    "dialectOptions": {
        "ssl": {
          "require": true,
          "rejectUnauthorized": false

      }
    }
  }
}
