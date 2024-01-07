const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { generateAuthToken } = require('../service/user.services');
const UserService1 = require('../service/user.services');
const app = require('../service/user.services');

const verifyToken = (req, res, next) => {
    const token = req.header('authorization');

    if (typeof token !== "undefined") {
        const bearer = token.split(" ");
        const tokenValue = bearer[1];
        req.token = tokenValue;
        next();
    } else {
        res.status(403).json({
            result: "Token is not valid"
        });
    }
};


router.post('/profile',verifyToken ,(req,res)=>{
    jwt.verify(req.token,process.env.JWT_SECRET,(err,authData)=>{
        if(err){
            res.send({result:"invalid"})
        }else{
            res.send({message:"profile accessed",authData})
        }
    })
})


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const emailExists = await UserService1.emailExists(email);
        if (emailExists) {
            return res.status(400).json({
                status: 400,
                success: false,
                data: undefined,
                message: 'Email already exists'
            });
        }
        
        const result = await UserService1.save(username, email, password);
        const token = generateAuthToken(result);
        res.status(200).json({
            status: 200,
            success: true,
            data: { user: result, token },
            message: 'Registration successful'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: 500,
            success: false,
            data: undefined,
            message: 'Internal server error'
        });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await UserService1.login(email, password);

        if (result) {
            res.send({
                status: 200,
                success: true,
                data: { user: result.user, token: result.token },
                message: 'login successfully'
            });
        } else {
            res.send({
                status: 401,
                success: false,
                data: undefined,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        res.send({
            status: 400,
            success: false,
            data: undefined,
            message: 'error'
        });
    }
});





router.get('/getdata',async (req,res)=>{
    try {
        const result = await UserService1.getAllCollection();
    res.send({
        status:200,
        success:true,
        data:result,
        message:'get successfully'
    })
    } catch (error) {
        res.send({
            status:400,
            success:false,
            data:undefined,
            message:'error'
        })
    }
});

router.get('/getdata/:id',async(req,res)=>{
   try {
    const result = await UserService1.getCollection(req.params.id); 
    res.send({
        status:200,
        success:true,
        data:result,
        message:'get successfully'
    })
   } catch (error) {
    res.send({
        status:400,
        success:false,
        data:undefined,
        result:'error'
    })
   }
});

router.put('/updatedata/:id',async(req,res)=>{
    try {
        const result = await UserService1.updateCollection(req.params.id,req.body);
    res.send({
        status:200,
        success:true,
        data:result,
        message:'update successfully'
    })
    } catch (error) {
        res.send({
            status:400,
            success:false,
            data:undefined,
            message:'error'
        })
    }
});

router.delete('/deletedata/:id',async(req,res)=>{
    try {
        const result = await UserService1.deleteCollection(req.params.id);
    res.send({
        status:200,
        success:true,
        data:result,
        message:'delete successfully'
    })
    } catch (error) {
        res.send({
            status:400,
            success:false,
            data:undefined,
            message:'error'
        })
    }
});

  

module.exports = router;