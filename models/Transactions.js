'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {  
    class Transactions extends Model {
        static associate(models) {
            this.belongsTo(models.Users, {
                foreignKey: 'user_id',
                as: 'user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
            this.belongsTo(models.Persons, {
                foreignKey: 'payer_id',
                as: 'payer',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
  }

  Transactions.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('Sent', 'Received'),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Transactions',
    tableName: 'transactions',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['user_id'], name: 'transactions_user_id_idx' },
      { fields: ['payer_id'], name: 'transactions_payer_id_idx' }
    ]
  });

  return Transactions;
};
