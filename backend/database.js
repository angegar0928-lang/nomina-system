const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === "true"
    ? { rejectUnauthorized: true }
    : false
});

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Base de datos conectada:", result.rows[0]);
    return true;
  } catch (error) {
    console.error("Error de conexión:", error.message);
    return false;
  }
}

module.exports = {
  pool,
  testConnection
};
