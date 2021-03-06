
const express = require("express");
require("dotenv").config();
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../config/db');
const  jwt  =  require("jsonwebtoken");
const Login = require('../controllers/Login');

router.post('/rinjani/login', async (req, res) => {
    const { nik, password } = req.body;
    try {
        const data = await new Login().login(nik)
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
                        token: token
                    });
                }
                else {
                    if (result != true)
                    res.status(401).json({
                        error: "Enter correct password",
                    });
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error",
        });
    };
});

router.post('/rinjani/register', async (req, res) => {
    const { user_id, nik, branch_id, password, email, role_id, flg_used } =  req.body;
    try {
        const data  =  await db.query(`SELECT * FROM public.mst_user WHERE email= $1;`, [email]);
        const arr  =  data.rows;
        if (arr.length  !=  0) {
            return  res.status(400).json({
            error: "NIK already registered",
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
                            flag  =  0;
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
                    const token  = jwt.sign(
                        {nik: user.nik}, process.env.SECRET_KEY
                    );
                };
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error",
        });
    };
});

module.exports = router;