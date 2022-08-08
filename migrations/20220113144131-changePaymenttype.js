'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Internships','payment',{
      type: Sequelize.DOUBLE,
      defaultValue:0,
      allowNull:false
    });
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
