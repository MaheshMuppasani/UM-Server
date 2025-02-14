import pool from './database.js';

export async function getAllDepartments(){
    const [rows] = await pool.query(`SELECT * FROM Department`);
    return rows;
}