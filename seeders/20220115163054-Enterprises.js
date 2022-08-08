'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Enterprises',[{
      phone_number: '+593-4-2269-111',
      idUser: 6,
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    },{
      phone_number: '+593-4-2598-830',
      idUser: 5,
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    },{
      phone_number: '+593-4-5826-589',
      idUser: 4,
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    },{
      phone_number: '+593-4-5826-589',
      idUser: 7,
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Enterprises', null, {});
  }
};
