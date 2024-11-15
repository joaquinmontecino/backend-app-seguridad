const { Pool } = require('pg');

let pool;

async function initialize() {
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  });
}

async function close() {
  if (pool) {
    await pool.end();
  }
}

async function simpleExecute(statement, binds = []) {
  if (!pool) {
    throw new Error('Pool de conexiones no inicializada.');
  }

  let conn;
  try {
    conn = await pool.connect();
    const result = await conn.query(statement, binds);
    return result.rows;
  } catch (err) {
    console.error('Error ejecutando consulta:', err);
    throw err;
  } finally {
    if (conn) {
      try {
        conn.release();
      } catch (releaseErr) {
        console.error('Error liberando conexión:', releaseErr);
      }
    }
  }
}

module.exports = {
  simpleExecute,
  initialize,
  close
};
