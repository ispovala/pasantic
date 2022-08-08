var express = require('express');
var router = express.Router();

const { validatePagination} = require('../validations/pagination.validator')
const Sequelize = require('sequelize');
const models = require('../models');


// Enviar correo


//get_enterprises
router.get('/', async function(req, res, next) {
  try{
    enterprises = await models.Enterprise.findAll({
      include: [{ model: models.User},{model: models.Internship}]
    });
    res.status(200).json(enterprises);
  }catch(err){
    next(err);
  }
});

//create_enterpise
router.post('/',validatePagination(),async function(req,res,next){
  try{
    const { phone_number, idUser} = req.body;

    let enterprise = await models.Enterprise.create({
      phone_number: phone_number,
      idUser: idUser
    });

    return res.status(201).json({
      status: 201,
      payload: {
        enterprise: enterprise,
      }
    });
  }catch(err){
    next(err);
  }
});

//get_enterprise_id
router.get('/:id',async function(req,res,next){
  try{
    const id = req.params.id
    const enterprise = await models.Enterprise.findByPk(id,{
      include: [{model: models.User,},{model: models.Internship}]
    });

    return res.status(200).json({
      status: 200,
      payload: {
        enterprise: enterprise,
      }
    })
  }catch(err){
    next(err);
  }
});

module.exports = router;