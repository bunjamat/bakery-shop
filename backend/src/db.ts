import mysql from 'mysql2/promise';

// สร้าง connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'keep1234',
  database: 'bakery_shop',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
