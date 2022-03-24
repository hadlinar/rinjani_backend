const express = require("express");
require("dotenv").config();
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../config/db');
const  jwt  =  require("jsonwebtoken");

router.post('/login', async (req, res) => {
    const { nik, password } = req.body;
    try {
        const data = await db.query(`SELECT u.user_id, e.name, u.nik, u.branch_id, u.password, u.email, u.role_id, u.flg_used
        FROM public.mst_user as u, public.mst_employee as e
        WHERE u.nik = e.nik AND u.user_id=$1;`, [nik])
        const user = data.rows;
        if (user.length === 0) {
            res.status(400).json({
                error: "User is not registered",
            });
        }
        else {
            bcrypt.compare(password, user[0].password, (err, result) => { 
                if (err) {
                    res.status(500).json({
                        error: "Server error",
                    });
                } else if (result === true) { 
                    const token = jwt.sign({
                        nik: nik,
                    }, process.env.SECRET_KEY);
                    res.status(200).json({
                        message: "ok",
                        token: token,
                        result: data.rows[0]
                    });
                }
                else {
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
                var  flag  =  1; 
                
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
                if (flag) {
                    const  token  = jwt.sign( //Signing a jwt token
                        {nik: user.nik},process.env.SECRET_KEY
                    );
                };
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user", //Database connection error
        });
    };
    });


module.exports = router;