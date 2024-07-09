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

async function getUserByUserName(user_name) {
    try {
      const query = `SELECT * FROM USERS WHERE user_name = $1`;
      const values = [user_name];
      const result = await client.query(query, values);
      return result;
    }
    catch (err) {
      console.log(err);
      throw new Error("query_error");
    }
}

module.exports = { createUser, getUserByUserName };