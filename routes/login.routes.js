var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const models = require('../models');

router.post('/', async function(req, res, next) {
    try{
        const { email, password} = req.body;
        const user = await models.User.findOne({
            where: { 
                "email":email,                
                "password":password,
            },
            include: [{ model: models.Student},{ model: models.Enterprise}]
         });
        if(user!=null){
            res.status(200).json({
                status: 201,
                payload: {
                    user: user
                }
            });
        }else{
            res.status(200).json({
                mensaje:"No encontrado"
            })
        }
        
    }catch(err){
        next(err);
    }
});

module.exports = router;