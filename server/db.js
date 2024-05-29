const { Client } = require("pg");
require('dotenv').config();

const client = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: "localhost",
  port: 5432,
  database: process.env.DB
});

async function createSchemaIfNotExists() {
  try {
    await client.connect();
    const tableCheckResult = await client.query(`
      SELECT 1 FROM information_schema.tables WHERE table_name = 'todo'
    `);

    if (tableCheckResult.rowCount === 0) {
      await client.query(`
        CREATE TABLE todo (
          todo_id SERIAL PRIMARY KEY,
          description VARCHAR(255)
        )
      `);
      console.log("Table 'todo' created successfully.");
    } else {
      console.log("Db connected successfully!");
    }
  } catch (err) {
    console.error("Error during schema setup:", err);
  }
}

createSchemaIfNotExists();

module.exports = client;
