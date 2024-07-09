const client = require("../utils/database");

async function createUser(email, user_name, password) {
  try {
    const query = `INSERT INTO USERS (email, user_name, password) VALUES ($1, $2, $3)`;
    const values = [email, user_name, password];
    const result = await client.query(query, values);
    return result;
  }
  catch (err) {
    console.log(err);
    throw new Error("query_error");
  }
}

async function getUserByUserNameAndEmail(user_name, email) {
  try {
    const query = `SELECT * FROM USERS WHERE user_name = $1 OR email = $2`;
    const values = [user_name, email];
    const result = await client.query(query, values);
    return result;
  }
  catch (err) {
    console.log(err);
    throw new Error("query_error");
  }
}

module.exports = { createUser, getUserByUserNameAndEmail };