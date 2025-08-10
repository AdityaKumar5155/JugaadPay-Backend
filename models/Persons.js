'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {  
    class Persons extends Model {
        static associate(models) {
            this.belongsTo(models.Users, {
                foreignKey: 'user_id',
                as: 'user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
            this.hasMany(models.Transactions, {
                foreignKey: 'payer_id',
                as: 'transactions',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
  }

  Persons.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    debt_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
      allowNull: false
    },
    is_self: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Persons',
    tableName: 'persons',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['user_id'], name: 'persons_user_id_idx' }
    ]
  });

  return Persons;
};
