const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const client = require('../config/dbConnection');
const jwt = require('jsonwebtoken');

//@desc register user
//@route POST /user/register
//@access Public

const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await client.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`);
    if (user) {
        res.status(200).send({message: "User registered successfully"});
      } else {
        res.status(400).send({message: "Invalid user data"});
      }
});

//@desc login user
//@route POST /toddle/user/login
//@access Public
const loginuser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("Please enter email and password");
    }
    const user = await client.query(`Select * from Users where email = '${email}'`);
    if(user.rows[0] == null){
        res.status(400).send({message: "User does not exist"});
    }
    else{
        if(await bcrypt.compare(password, user.rows[0].password)){
            const accessToken = jwt.sign({
                user: {
            username: user.username,
            email: user.email,
            },
            }, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1d'});
            res.status(201).json({accessToken});
            }
    else{
        res.status(400).send({message: "Invalid credentials"});
    }
}
});
//@desc get by id
//@route GET /toddle/users/getall
//@access all

const getAllUsers = asyncHandler(async(req, res) => {
    const users = await client.query(`Select * from users`);
    if(users){
        res.status(201).json(users.rows);
    }
    else{
        res.status(400).send({message: "Invalid credentials"});
    }
});

module.exports = {registerUser, loginuser, getAllUsers};

