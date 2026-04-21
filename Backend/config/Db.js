import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,

  waitForConnections: true,
  connectionLimit: 10,   // max parallel DB connections
  queueLimit: 0,
  connectTimeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// TEST connection once at startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Pool Error:", err);
  } else {
    console.log("✅ MySQL Pool Connected Successfully");
    connection.release(); // important
  }
});

// Promise version export (so we can use async/await)
export default pool.promise();