const { http_status_code } = require('../utils/enum');
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const client = require("../utils/database");
const jwt = require("../utils/jwtGenerator");
const { handleIncomingData } = require('../call-api');

async function registerUser(req, res) {
    try {
        const {email, user_name, password} = req.body;
        if(!email || !user_name || !password) {
            return res.status(http_status_code.BAD_REQUEST).send("misssing required fields");
        }
        const userExist = await userModel.getUserByUserName(user_name);
        if(userExist && userExist.rows.length > 0) {
            return res.status(http_status_code.BAD_REQUEST).send("user already exist");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPasssword = await bcrypt.hash(password, salt);
        await userModel.createUser(email, user_name, hashedPasssword);
        const result = await userModel.getUserByUserName(user_name);
        return res.status(http_status_code.CREATED).send({
            id: result.rows[0].id,
            user_name: result.rows[0].user_name,
            message: "user registered successfully"
        });
    }
    catch(err) {
        console.log(err);
        return res.status(http_status_code.INTERNAL_SERVER_ERROR).send("unexpected server error");
    }
}


async function loginUser(req, res) {
    try {
      const {user_name, password} = req.body;
      if(!user_name || !password) {
          return res.status(400).send("misssing required fields");
      }
      const userDetails = await userModel.getUserByUserName(user_name);
      console.log(userDetails.rows[0]);
      if(userDetails.rows.length === 0) {
          return res.status(http_status_code.UNAUTHORIZED).send("user not registered");
      }
      const passwordMatch = await bcrypt.compare(password, userDetails.rows[0].password);
      if(!passwordMatch) {
          return res.status(http_status_code.BAD_REQUEST).send("wrong password");
      }
      const token = await jwt.jwtGenerator(user_name, userDetails.rows[0].id);
      return res.status(http_status_code.OK)
                .send({id: userDetails.rows[0].id,
                        user_name: userDetails.rows[0].user_name,
                        Token: token});
    } 
    catch (err) {
          console.log(err);
          return res.status(http_status_code.INTERNAL_SERVER_ERROR).send("unexpected server error");
      }
  }

async function getAll(req,res){
    const users = await client.query(`Select * from users`);
    if(users){
        return res.status(201).json(users.rows);
    }
    else{
        return res.status(400).send({message: "Invalid credentials"});
    }
}

// New function to handle form submission
async function submitForm(req, res) {
    try {
        const data = req.body;
        const dietPlan = await handleIncomingData(data);
        res.json({ dietPlan });
    } catch (err) {
        res.status(http_status_code.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
}

module.exports = { loginUser, registerUser,getAll ,submitForm};