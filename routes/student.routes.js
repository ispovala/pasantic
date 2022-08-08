var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const models = require('../models');

//get_students
router.get('/', async function(req, res, next) {
    try{
      students = await models.Student.findAll({
        include: [{ model: models.User}]
      });
      res.status(200).json(students);
    }catch(err){
      next(err);
    }
});

//create_student
router.post('/',async function(req,res,next){
    try{
      const { degree, linkedinProfile, idUser} = req.body;
  
      let student = await models.Student.create({
        degree: degree,
        linkedinProfile: linkedinProfile,
        idUser: idUser
      });
  
      return res.status(201).json({
        status: 201,
        payload: {
          student: student
        }
      });
      
    }catch(err){
      next(err);
    }
});

router.get('/:id',async function(req,res,next){
  try{
    const id = req.params.id
    const student = await models.Student.findByPk(id,{
      include: [{model: models.User},{model: models.InternshipStudent}]
    });

    return res.status(200).json({
      status: 200,
      payload: {
        student: student,
      }
    })
  }catch(err){
    next(err);
  }
});

module.exports = router;