const path = require("path");

let variablePath = "";
if (process.env.NODE_ENV === "production") {
  variablePath = path.join(__dirname, "../variables-production.env");
} else {
  variablePath = path.join(__dirname, "../variables.env");
}
require("dotenv").config({ path: variablePath });

console.log({
  database: process.env.POSTGRES_DB_DATABSE,
  username: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PASSWORD,
  dialect: "postgres",
  host: process.env.POSTGRES_DB_HOST,
  port: process.env.POSTGRES_DB_PORT,
});

module.exports = {
  database: process.env.POSTGRES_DB_DATABSE,
  username: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PASSWORD,
  dialect: "postgres",
  host: process.env.POSTGRES_DB_HOST,
  port: process.env.POSTGRES_DB_PORT,
};
