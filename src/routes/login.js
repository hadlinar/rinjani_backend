const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../config/db');
const  jwt  =  require("jsonwebtoken");
const Login = require('../controllers/Login');

router.post('/login', async (req, res) => {
    const { nik, password } = req.body;
    try {
        const data = await db.query(`SELECT * FROM public.mst_user WHERE nik= $1;`, [nik]) //Verifying if the user exists in the database
        const user = data.rows;
        if (user.length === 0) {
            res.status(400).json({
                error: "User is not registered, Sign Up first",
            });
        }
        else {
            bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
                if (err) {
                    res.status(500).json({
                        error: "Server error",
                    });
                } else if (result === true) { //Checking if credentials match
                    // const token = jwt.sign(
                    // {nik: nik},process.env.SECRET_KEY);
                    res.status(200).json({
                        message: "User signed in!",
                        // token: token,
                    });
                }
                else {
                    //Declaring the errors
                    if (result != true)
                    res.status(400).json({
                        error: "Enter correct password!",
                    });
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        });
    };
});

router.post('/register', async (req, res) => {
    const { user_id, nik, branch_id, password, email, role_id, flg_used } =  req.body;
    try {
        const  data  =  await db.query(`SELECT * FROM public.mst_user WHERE email= $1;`, [email]); //Checking if user already exists
        const  arr  =  data.rows;
        if (arr.length  !=  0) {
            return  res.status(400).json({
            error: "Email already there, No need to register again.",
            });
        }
        else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    res.status(err).json({
                        error: "Server error",
                    });
                const  user  = {
                    user_id, 
                    nik, 
                    branch_id, 
                    password: hash, 
                    email, 
                    role_id, 
                    flg_used
                };
                var  flag  =  1; //Declaring a flag
                
                //Inserting data into the database
                
                db.query(`INSERT INTO public.mst_user(
                    user_id, nik, branch_id, password, email, role_id, flg_used) VALUES ($1,$2,$3,$4,$5,$6,$7);`, 
                    [user.user_id, user.nik, user.branch_id, user.password, user.email, user.role_id, user.flg_used], (err) => {
                        if (err) {
                            flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                            console.error(err);
                            return  res.status(500).json({
                                error: "Database error"
                            })
                        }
                        else {
                            flag  =  1;
                            res.status(200).send({ message: 'success' });
                        }
                })
                // if (flag) {
                //     const  token  = jwt.sign( //Signing a jwt token
                //         {nik: user.nik},process.env.SECRET_KEY
                //     );
                // };
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!", //Database connection error
        });
    };
    });
    

    // const body = req.body;

    // if (!(body.email && body.password)) {
    //   return res.status(400).send({ error: "Data not formatted properly" });
    // }
    // // generate salt to hash password
    // const salt = await bcrypt.genSalt(10);
    // // // now we set user password to hashed password
    // body.password = await bcrypt.hash(body.password, salt);

    // // creating a new mongoose doc from user data
    // const user = await new Login().createUser(
    //     body.user_id,
    //     body.nik,
    //     body.branch_id,
    //     body.password,
    //     body.email,
    //     body.role_id,
    //     body.flg_used
    // );
    // user.save().then((doc) => res.status(201).send(doc));


module.exports = router;