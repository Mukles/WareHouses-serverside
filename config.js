const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;
const dbUser = process.env.DbUser;
const dbPassword = process.env.DbPassoword;

module.exports = {
  port,
  dbUser,
  dbPassword
};