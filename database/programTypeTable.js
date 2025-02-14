import pool from './database.js';

export async function getAllProgramTypes(params) {
    const [rows] = await pool.query('SELECT * FROM ProgramType');
    return rows;
}