'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Internships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      isRecruiting: {
        type: Sequelize.BOOLEAN
      },
      internshipProcess: {
        type: Sequelize.STRING
      },
      dateFrom: {
        type: Sequelize.DATE
      },
      dateTo: {
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.STRING
      },
      workMode: {
        type: Sequelize.STRING
      },
      payment: {
        type: Sequelize.STRING
      },
      idEnterprise: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Enterprises',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Internships');
  }
};