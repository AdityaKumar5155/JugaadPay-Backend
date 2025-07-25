'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('transactions', {
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
        datetime: {
          type: Sequelize.DATE,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        type: {
          type: Sequelize.ENUM('Sent', 'Received'),
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        payer_id: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { transaction });

      await queryInterface.addConstraint('transactions', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'transactions_user_id_fkey',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        transaction
      });

      await queryInterface.addConstraint('transactions', {
        fields: ['payer_id'],
        type: 'foreign key',
        name: 'transactions_payer_id_fkey',
        references: {
          table: 'persons',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        transaction
      });
      // Add indexes for foreign keys
      await queryInterface.addIndex('transactions', ['user_id'], {
        name: 'transactions_user_id_idx',
        transaction
      });
      await queryInterface.addIndex('transactions', ['payer_id'], {
        name: 'transactions_payer_id_idx',
        transaction
      });
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('transactions', { transaction });
    });
  }
};
