
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SCRET= "hereisiam";

// route 1: Create a user using: POST "/api/auth/creatuser" no log in require

router.post('/createuser',[
        body('name',"name contains min 3 char ").isLength({min:3}),
        body('email', "valid email only").isEmail(),
        body('password', " min 5 char").isLength({min:5})
        ], async (req, res) => {
    try { 
        let success=false;
        
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({success, errors: errors.array() });
     }

    //  check the user with email is already exit 
     let user =await User.findOne({email:req.body.email});
     if(user){
        success=false;
        return res.status(400).json({success,error:' user with this email is already exist '});
    }

    //  console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const secpassword = await bcrypt.hash(req.body.password, salt);
        // console.log("Hashed Password for Registration:", secpassword);
        
         user = await User.create({
            name: req.body.name,
            password: secpassword,
            email: req.body.email,
        });

          const data = {
            user:{
                id:user.id
            }
          }

       const authtoken = jwt.sign(data,JWT_SCRET);
       success=true;
        res.json({ success,authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//route 2 : authenticate a user using: POST "/api/auth/login" no log in require

router.post('/login',[
    body('email', "valid email only").isEmail(),
    body('password', " password can not be blank ").exists()
    ], async (req, res) =>{
        let success=false;
        try {
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success, errors: errors.array() });
         }

         const {email, password}=req.body;

           // Check if the user exists
          user =await User.findOne({email});
         if(!user){
            success=false;
            return res.status(400).json({success,error:'Invalid credentials'});
        }

          // Compare the entered password with the hashed password in the database
          const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {

            // console.log("Password does not match");
            success=false;
            return res.status(400).json({success, error: 'Invalid credentials' });
        }
         // If credentials are valid, create a JWT token
         const data = {
            user:{
                id:user.id
            }
          }
         const authtoken = jwt.sign(data,JWT_SCRET);
         success=true;
         res.json({success,authtoken});


        }
        catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
        }
    }
)

// route 3 :  get logedin user detailes using: POST "/api/auth/getuser"  log in require
router.post('/getuser',fetchuser,
     async (req, res) =>{
try {
    userId=req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
    
}
    })



module.exports = router;
