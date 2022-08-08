'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InternshipStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Student,{foreignKey: 'idStudent'});
      this.belongsTo(models.Internship,{foreignKey: 'idInternship'});
    }
  };
  InternshipStudent.init({
    status: DataTypes.STRING,
    idStudent: DataTypes.INTEGER,
    idInternship: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InternshipStudent',
  });
  return InternshipStudent;
};