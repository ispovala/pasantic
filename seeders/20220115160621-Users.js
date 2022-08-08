'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[{
      email:'espol@espol.edu.ec',
      password: 'espol',
      name: 'ESPOL',
      description: 'Escuela Superior Politecnica del Litoral',
      role: 'empresa',
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    }, {
      email: 'tia@tia.com',
      password: 'tia',
      name: 'TIA',
      description: 'Tiendas Industriales Asociadas',
      role: 'empresa',
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    },  {
      email: 'rodaltech@rodaltech.com',
      password: 'rodaltech',
      name: 'Rodaltech',
      description: 'Avanzando hacia la Industria4.0',
      role: 'empresa',
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    }, {
      email: 'danny@danny.com',
      password: 'danny',
      name: 'Danny Montenegro',
      description: 'Estudiante de Ingenieria en Computacion',
      role: 'estudiante',
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    }, {
      email: 'josue@josue.com',
      password: 'josue',
      name: 'Josue Villao',
      description: 'Estudiante de Ingenieria en Computacion',
      role: 'estudiante',
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    }, {
      email: 'miguel@miguel.com',
      password: 'miguel',
      name: 'Miguel Licea',
      description: 'Estudiante de Ingenieria en Computacion',
      role: 'estudiante',
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    }, {
      email: 'rodrigo_estudiante@rodrigo_estudiante.com',
      password: 'rodrigo_estudiante',
      name: 'Rodrigo Saraguro',
      description: 'Estudiante de Ingenieria en Computacion',
      role: 'estudiante',
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    }, {
      email: 'rodrigo_empresa@rodrigo_empresa.com',
      password: 'rodrigo_empresa',
      name: 'Rodrigo Saraguro',
      description: 'Empresa de creaciond de proyectos informaticos',
      role: 'estudiante',
      createdAt: '2022-08-01 20:00:00',
      updatedAt: '2022-08-01 20:00:00',
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
