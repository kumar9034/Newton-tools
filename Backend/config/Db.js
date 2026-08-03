import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306, // 👈 Ye line add karo
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// TEST connection once at startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Pool Error:", err);
  } else {
    console.log("✅ MySQL Pool Connected Successfully");
    connection.release();
  }
});

const Db = pool.promise();
export default Db;