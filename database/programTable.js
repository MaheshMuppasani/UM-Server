import { addColumnNamesToQuery } from './courseTable.js';
import pool from './database.js';

export async function getProgram(id) {
    const [rows] = await pool.query(`
        SELECT * FROM Program
        WHERE ProgramID = ?
        `, [id]);
    return rows;
}

export async function getAllPrograms(){
    const [rows] = await pool.query('SELECT * FROM Program');
    return rows;
}

export async function getAllAdminPrograms(dptId, ptId, search) {
    let query =
        `SELECT p.ProgramID, p.Program_Name, p.DepartmentID, p.ProgramCode, p.ProgramDescription, p.ProgramTypeID
        FROM Program p
        inner join Department d on d.Department_ID = p.DepartmentID
        inner join ProgramType pt on pt.ProgramType_ID = p.ProgramTypeID`;
    let values = [];

    if (dptId || ptId || search) {
        query += ` WHERE`
    }

    if (dptId !== null) {
        query += ` d.Department_ID = ?`
        values.push(Number(dptId))
    }

    if (ptId !== null) {
        if (values[0]) query += ` AND`
        query += ` p.ProgramTypeID = ?`
        values.push(Number(ptId))
    }

    if (search !== null) {
        if (values[0]) query += ` AND`;
        query += ` (p.Program_Name LIKE CONCAT('%', ?, '%') 
            OR p.ProgramDescription LIKE CONCAT('%', ?, '%')
            OR d.Department_Name LIKE CONCAT('%', ?, '%')
            OR pt.ProgramType_Name LIKE CONCAT('%', ?, '%'))`;
        values.push(...new Array(4).fill(search))
    }
    const [rows] = await pool.query(query, values)

    return rows;
}

export async function addNewProgram(params) {
    const columns = Object.keys(params);
    const values = Object.values(params);
    const [result] = await pool.query(`
            INSERT INTO Program (${columns.join(',')})
            VALUES (${Array(columns.length).fill('?').join(',')})
            `, [...values]);
    return getProgram(result.insertId);
}

export async function updateProgram(programDetails, programID) {
    try {
        const columns = Object.keys(programDetails);
        const values = Object.values(programDetails);
        const result = await pool.query(`UPDATE Program SET ${addColumnNamesToQuery(columns)} WHERE ProgramID = ?`, [...values, programID]);
        return { success: 1, result };
    }
    catch (err) {
        return { success: 0, err };
    }
}

export async function deleteProgram(id) {
    try {
        const result = await pool.query(`DELETE FROM Program WHERE ProgramID = ?`, [id]);
        return { success: 1, result }
    }
    catch (err) {
        return { success: 0, err }
    }
}