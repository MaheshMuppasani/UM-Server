import pool from './database.js';

export async function getFile(id) {
    const [rows] = await pool.query(`
        SELECT * FROM Files
        WHERE file_id = ?
        `, [id]);
    return rows;
}

export async function addNewFile(params) {
    const columns = Object.keys(params);
    const [result] = await pool.query(`
            INSERT INTO Files (${columns.join(',')})
            VALUES (${Array(columns.length).fill('?').join(',')})
            `, [...Object.values(params)]);
    return result;
}

export async function deleteFile(id) {
    try{
        const result = await pool.query(`DELETE FROM Files WHERE file_id = ?`, [id]);
        return {success: 1, result}
    }
    catch(err){
        return {success: 0, err}
    }
}