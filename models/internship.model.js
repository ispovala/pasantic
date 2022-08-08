'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Internship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Enterprise,{foreignKey: 'idEnterprise'});
      this.hasMany(models.InternshipStudent,{foreignKey: 'idInternship'});
    }
  };
  Internship.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    industry: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isRecruiting: DataTypes.BOOLEAN,
    internshipProcess: DataTypes.STRING,
    dateFrom: DataTypes.DATE,
    dateTo: DataTypes.DATE,
    location: DataTypes.STRING,
    workMode: DataTypes.STRING,
    payment: DataTypes.DOUBLE,
    idEnterprise: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Internship',
  });
  return Internship;
};