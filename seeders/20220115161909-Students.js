'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students',[{
      degree: 'Computacion',
      linkedinProfile: 'https://www.linkedin.com/in/miguel-licea/',
      idUser: 6,
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    },{
      degree: 'Computacion',
      linkedinProfile: 'https://www.linkedin.com/in/raul-josue-villao-rodr%C3%ADguez-82756322b/',
      idUser: 5,
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    },{
      degree: 'Computacion',
      linkedinProfile: 'https://www.linkedin.com/in/danny-montenegro-1839b01b4',
      idUser: 4,
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    },{
      degree: 'Computacion',
      linkedinProfile: 'https://www.linkedin.com/in/rodrigo-saraguro-bravo-3b362639/',
      idUser: 7,
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
