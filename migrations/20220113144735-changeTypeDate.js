'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Internships','dateFrom',{
      type: Sequelize.DATEONLY,
      allowNull:false
    });

    queryInterface.changeColumn('Internships','dateTo',{
      type: Sequelize.DATEONLY,
      allowNull:false
    });
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
