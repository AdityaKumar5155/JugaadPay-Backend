'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('transaction_payees', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        amount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
        },
        payee_id: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        transaction_id: {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      }, { transaction });

      await queryInterface.addConstraint('transaction_payees', {
        fields: ['payee_id'],
        type: 'foreign key',
        name: 'transaction_payees_payee_id_fkey',
        references: {
          table: 'persons',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        transaction
      });

      await queryInterface.addConstraint('transaction_payees', {
        fields: ['transaction_id'],
        type: 'foreign key',
        name: 'transaction_payees_transaction_id_fkey',
        references: {
          table: 'transactions',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        transaction
      });
      // Add indexes for foreign keys
      await queryInterface.addIndex('transaction_payees', ['payee_id'], {
        name: 'transaction_payees_payee_id_idx',
        transaction
      });
      await queryInterface.addIndex('transaction_payees', ['transaction_id'], {
        name: 'transaction_payees_transaction_id_idx',
        transaction
      });
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('transaction_payees', { transaction });
    });
  }
};
