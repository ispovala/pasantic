var express = require('express');
var router = express.Router();


const { PAGE_LIMIT_MAX,PAGE_START} = require('../constants/pagination.constants')
const { calculateOffset } = require('../helpers/calculations')
const Sequelize = require('sequelize');
const models = require('../models');


var redis = require("redis");

function startConnection() {
    var cacheHostName = "sisdis.redis.cache.windows.net";
    var cachePassword = "eDSh9bs30M6mnQOklgtcRNYlMZLy6kWkUAzCaAvlcIw=";
    var cacheConnection = redis.createClient({
        // rediss for TLS
        url: "rediss://" + cacheHostName + ":6380",
        password: cachePassword,
    });
    return cacheConnection;    
}

let cacheConnection =startConnection();

async function obtainCache() {
    /*
    var cacheHostName = "sisdis.redis.cache.windows.net";
    var cachePassword = "eDSh9bs30M6mnQOklgtcRNYlMZLy6kWkUAzCaAvlcIw=";
    var cacheConnection = redis.createClient({
        // rediss for TLS
        url: "rediss://" + cacheHostName + ":6380",
        password: cachePassword,
    });
    await cacheConnection.connect();*/
    try{
        await cacheConnection.connect();        
        console.log("Conexión establecida");
    }catch(error){
        console.log(error)
        console.log("Conexión establecida");
    }
    //return cacheConnection;

    console.log("\nCache command: GET interships");
    console.log("\nCache command: GET interships");
    console.log("Cache response : " + await cacheConnection.get("interships"));
        
    return  await cacheConnection.get("interships");
}

async function settingCache(interships) {
    /*
    var cacheHostName = "sisdis.redis.cache.windows.net";
    var cachePassword = "eDSh9bs30M6mnQOklgtcRNYlMZLy6kWkUAzCaAvlcIw=";
    var cacheConnection = redis.createClient({
        // rediss for TLS
        url: "rediss://" + cacheHostName + ":6380",
        password: cachePassword,
    });
    await cacheConnection.connect();*/

    try{
        await cacheConnection.connect();        
        console.log("Conexión establecida");
    }catch(error){
        console.log(error)
        console.log("Conexión establecida");
    }

    interships=JSON.stringify(interships);
    console.log("\nCache command: SET interships");
    console.log("Cache response : " + await cacheConnection.set("interships", interships));
}



//get_internships
router.get('/', async (req, res, next) => {
    try {
        internships= null; 
        //internships= await obtainCache();
        if(internships!=null && internships!=""){
            internships=JSON.parse(internships);
        }else{
            const limit = parseInt(req.param("limit",PAGE_LIMIT_MAX));
            const offset = calculateOffset(limit,req.param("page",PAGE_START))

            internships = await models.Internship.findAll({
                limit: limit,
                offset: offset,
                where: {
                    [Sequelize.Op.and]:{
                        isActive:1,
                        isRecruiting:1
                    }
                },
                include: [{ model: models.Enterprise },{model: models.InternshipStudent}]
            });
        }               

        res.status(200).json({
            status:200,
            payload: internships
        });
    }catch(err) {
        console.log(err);
        next(err);
    }
});

//create_internship
router.post('/',async (req,res,next) => {
    try { 
        const { title, description, industry, internshipProcess, dateFrom,
             dateTo, location, workMode, payment, idEnterprise } = req.body;

        let internship = await models.Internship.create({
            title: title,
            description: description,
            industry: industry,
            isActive: true,
            isRecruiting: true,
            internshipProcess: internshipProcess,
            dateFrom: dateFrom,
            dateTo: dateTo,
            location: location,
            workMode: workMode,
            payment: payment,
            idEnterprise: idEnterprise,
        });

        try {
            internships = await models.Internship.findAll({
                limit: 10,
                offset: 0,
                where: {
                    [Sequelize.Op.and]:{
                        isActive:1,
                        isRecruiting:1
                    }
                },
                include: [{ model: models.Enterprise },{model: models.InternshipStudent}]
            });
            settingCache(internships)
            console.log("Se actualizo el redis")
        } catch(er) {
            console.log("No se logro guardar la nueva actualizcion en cache")
            console.log(er);
        } 

        return res.status(201).json({
            status: 201,
            payload: {
                internship: internship
            }
        });         

    } catch(err) {
        next(err);
    }
});

//get internship by id
router.get('/:id',async (req, res, next)=>{
    try{
        const id = req.params.id
        let internship = await models.Internship.findByPk(id,{
            include: [{model: models.Enterprise}]
        });
        return res.status(200).json({
            status: 200,
            payload: {
                internship: internship
            }
        })
    }catch(err){
        next(err);
    }
});

router.get('/interns/:id', async (req, res, next)=>{
    try{
        const id = req.params.id

        let interns =await  models.InternshipStudent.findAll({
            where : {
                idInternship : id
            },
            include : [{model: models.Student}]
        })

        return res.status(200).json({
            status: 200,
            payload: {
                interns: interns
            }
        })

    }catch(err){
        next(err);
    }
})

router.put('/start/recluting/:id', async (req, res, next)=>{
    try{
        const id = req.params.id

        await models.Internship.update({
            isRecruiting:"1"
        },{
            where: {
                id:id
            }
        });

        try {
            internships = await models.Internship.findAll({
                limit: 10,
                offset: 0,
                where: {
                    [Sequelize.Op.and]:{
                        isActive:1,
                        isRecruiting:1
                    }
                },
                include: [{ model: models.Enterprise },{model: models.InternshipStudent}]
            });
            settingCache(internships)
            console.log("Se actualizo el redis")
        } catch(er) {
            console.log("No se logro guardar la nueva actualizcion en cache")
            console.log(er);
        } 

        return res.status(200).json({
            status: 200,
            payload: {
                mensaje: "Cambiado exitosamente a 1"
            }
        })

    }catch(err){
        next(err);
    }
});
router.put('/stop/recluting/:id', async (req, res, next)=>{
    try{
        const id = req.params.id

        await models.Internship.update({
            isRecruiting:"0"
        },{
            where: {
                id:id
            }
        });

        try {
            internships = await models.Internship.findAll({
                limit: 10,
                offset: 0,
                where: {
                    [Sequelize.Op.and]:{
                        isActive:1,
                        isRecruiting:1
                    }
                },
                include: [{ model: models.Enterprise },{model: models.InternshipStudent}]
            });
            settingCache(internships)
            console.log("Se actualizo el redis")
        } catch(er) {
            console.log("No se logro guardar la nueva actualizcion en cache")
            console.log(er);
        } 

        return res.status(200).json({
            status: 200,
            payload: {
                mensaje: "Cambiado exitosamente a 0"
            }
        })        

    }catch(err){
        next(err);
    }
})

router.get('/enterprise/:id', async (req, res, next)=>{
    try{
        const enterpriseId = req.params.id

        let internship = await models.Internship.findAll({
            where : {
                idEnterprise : enterpriseId
            },
            include: [{model: models.Enterprise},{model: models.InternshipStudent}]
        }  
        )
        return res.status(201).json({
            status: 201,
            payload: {
                internship : internship
            }
        })

    }catch(err){
        next(err)
    }
})



module.exports =router;