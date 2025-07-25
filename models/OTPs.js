'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {  
    class OTPs extends Model {
        static associate(models) {
        }
  }

  OTPs.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OTPs',
    tableName: 'otps',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['email'], name: 'otps_email_idx' }
    ]
  });

  return OTPs;
};
