'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {  
    class Transaction_Payees extends Model {
        static associate(models) {
            this.belongsTo(models.Persons, {
                foreignKey: 'payee_id',
                as: 'payee',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
            this.belongsTo(models.Transactions, {
                foreignKey: 'transaction_id',
                as: 'transaction',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
            this.belongsTo(models.Persons,{
                foreignKey: 'payee_id',
                as: 'person',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
  }

  Transaction_Payees.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transaction_Payees',
    tableName: 'transaction_payees',
    timestamps: false,
    indexes: [
      { fields: ['payee_id'], name: 'transaction_payees_payee_id_idx' },
      { fields: ['transaction_id'], name: 'transaction_payees_transaction_id_idx' }
    ]
  });

  return Transaction_Payees;
};
