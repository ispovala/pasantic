var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const models = require('../models');
const transporter = require('../constants/mail.constants');

router.get('/', async function(req, res, next){
    try {
        internshipsStudents = await models.InternshipStudent.findAll({
            include: [{ model: models.Student},{ model: models.Internship}]
        });
        res.status(201).json(internshipsStudents);
    }catch(err){
        next(err);
    }
});

router.post('/', async (req, res, next) =>{
    try {
        const {idStudent,idInternship} = req.body;

        let exists = await models.InternshipStudent.findAll({
            where: {
                idStudent: idStudent,
                idInternship: idInternship
            }
        });

        if(exists.length!=0){
            res.status(200).json({
                status: 200,
                message: "Ya existe la postulacion"
            });
            return 
        }

        let internshipStudent = await models.InternshipStudent.create({
            status: 'En Elección',
            idStudent: idStudent,
            idInternship: idInternship
        });

        res.status(201).json({
            status: 201,
            payload: {
                internshipStudent: internshipStudent
            }
        });

    } catch (error) {
        next(error)
    }
});

router.put('/studentAccept', async (req, res, next) =>{
    try {

        const { idStudent,idInternship} = req.body;
        let internship = await models.Internship.findByPk(idInternship);
        let titleInternship = internship.title;

        let studentApproved = await models.Student.findByPk(idStudent);
        let idUserofStudentApproved = studentApproved.idUser;

        let user = await models.User.findByPk(idUserofStudentApproved);
        let mailUser = user.email;

        let mailOptionsAccept = {
            from: "pasantic2022@gmail.com",
            to: mailUser,
            subject: 'Confirmacion de Postulacion a Pasantias',
            text: `Estimado ${user.name},\nSu Postulacion a la ayudantia con titulo ${titleInternship} ha sido aceptada.\n\nEste mensaje ha sido generado de forma automatica, por favor, no responda a este remitente.`
          };
        transporter.sendMail(mailOptionsAccept, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        //Modificando el estudiante aprobado
        await models.InternshipStudent.update({
            status:"Aprobado"
        },{
            where: {
                idStudent: idStudent,
                idInternship: idInternship
            }
        });

        // //Modificando los estudiantes no aprobados
        await models.InternshipStudent.update({
            status:"Denegado"
        },{
            where: {
                idStudent: {
                    [Sequelize.Op.ne]:idStudent
                },
                idInternship: idInternship
            }
        });


        // //Modificando las pasantias a eliminacion logica
        await models.Internship.update({
            isActive: false,
            isRecruiting: false
        },{
            where:{
                id : idInternship
            }
        });

        let internship2 = await models.Internship.findByPk(idInternship,{
            include: [{model:models.Enterprise },{model: models.InternshipStudent}]
        });
        
        res.status(200).json({
            status: 200,
            payload: {
                internship: internship2
            }
        });

    }catch (err){
        console.log(err);
        next(err);
    }
});




module.exports =router;