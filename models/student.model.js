'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey: 'idUser'});
      this.hasMany(models.InternshipStudent,{foreignKey: 'idStudent'})
    }
  };
  Student.init({
    degree: DataTypes.STRING,
    linkedinProfile: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });
    return Student;
};