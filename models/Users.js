'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {  
    class Users extends Model {
        static associate(models) {
            this.hasMany(models.Persons, {
                foreignKey: 'user_id',
                as: 'persons',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
            this.hasMany(models.Transactions, {
                foreignKey: 'user_id',
                as: 'transactions',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
  }

  Users.init({
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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: true,
    underscored: true
  });

  return Users;
};
