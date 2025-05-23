import mysql from 'mysql2';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();

export const upload = multer({ storage: multer.memoryStorage() });

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
    timezone: 'Z'
}).promise();

export default pool;