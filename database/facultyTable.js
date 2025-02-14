import { addColumnNamesToQuery } from './courseTable.js';
import pool from './database.js';

const columns = ['Faculty_ID', 'FirstName', 'LastName', 'DepartmentID', 'Designation', 'Email', 'Phone', 'Education', 'Role']

export async function getFacultyByEmail(email) {
    const [faculty] = await pool.query(`
        SELECT * FROM Faculty
        WHERE Email = ?
        `, [email]);
    return faculty[0]; 
}

export async function getFacultyCoursesBySemester(facultyID) {
    const [rows] = await pool.query(`
            SELECT sem.semester_id, sem.is_current_semester, sem.is_completed, c.Course_ID, c.Course_Name, c.CreditHours, c.course_code,
                CONCAT('[', 
                        GROUP_CONCAT(
                        JSON_OBJECT(
                            'Section_ID', sec.Section_ID,
                            'Section_DeliveryMode', sec.Section_DeliveryMode,
                            'Capacity', sec.capacity,
                            'EnrollmentCount', sec.Section_EnrollmentCount)
                    ), ']') AS sections
                FROM 
                    Section sec
            INNER JOIN Semester sem ON sem.semester_id = sec.SemesterID
            INNER JOIN Faculty f ON f.Faculty_ID = sec.Professor_ID
            INNER JOIN Course c on c.Course_ID = sec.CourseID
            WHERE (sem.is_completed = 0 or is_current_semester = 1) and f.Faculty_ID = ?
            GROUP BY sem.semester_id, c.Course_ID`, [facultyID]);
    return rows;
}

export async function createFaculty(params) {
    const columns = Object.keys(params);
    const [result] = await pool.query(`
            INSERT INTO Faculty (${columns.join(',')})
            VALUES (${Array(columns.length).fill('?').join(',')})
            `, [...Object.values(params)]);
    return getFaculty(result.insertId);
}

export async function updateFaculty(facultyDetails, facultyID) {
    try {
        const columns = Object.keys(facultyDetails);
        const values = Object.values(facultyDetails);
        const result = await pool.query(`UPDATE Faculty SET ${addColumnNamesToQuery(columns)} WHERE Faculty_ID = ?`, [...values, facultyID]);
        return { success: 1, result };
    }
    catch (err) {
        return { success: 0, err };
    }
}

export async function deleteFaculty(id) {
    try {
        const result = await pool.query(`DELETE FROM Faculty WHERE Faculty_ID = ?`, [id]);
        return { success: 1, result }
    }
    catch (err) {
        return { success: 0, err }
    }
}

export async function getFaculty(id) {
    const [rows] = await pool.query(`
        SELECT ${columns.join(', ')} FROM Faculty
        WHERE Faculty_ID = ?
        `, [id]);
    return rows;
}

export async function getFacultiesByProgramID(programId){
    const [rows] = await pool.query(`
        SELECT f.Faculty_ID, f.DepartmentID, f.Designation, f.Email, CONCAT_WS(' ', f.LastName, f.FirstName) AS FacultyName 
        FROM Faculty f
inner join Program p on p.DepartmentID = f.DepartmentID
where p.ProgramID = ? and f.Role IS NOT NULL and f.ROLE <> 'Admin'`, [programId])
        return rows;
}

export async function getAllFaculty(departmentId, search) {
    let query = `SELECT ${columns.join(', ')}, CONCAT_WS(' ', f.LastName, f.FirstName) AS FacultyName 
                FROM Faculty f
                inner join Department d on d.Department_ID = f.DepartmentID
                where f.Role = 'Faculty'`;
    let values = [];

    if (departmentId || search) {
        query += ` AND`
    }

    if (departmentId !== null) {
        query += ` d.Department_ID = ?`
        values.push(Number(departmentId))
    }

    if (search !== null) {
        if (values[0]) query += ` AND`;
        query += ` (f.FirstName LIKE CONCAT('%', ?, '%') 
            OR f.LastName LIKE CONCAT('%', ?, '%')
            OR f.Designation LIKE CONCAT('%', ?, '%')
            OR f.Email LIKE CONCAT('%', ?, '%')
            OR f.Phone LIKE CONCAT('%', ?, '%'))`;
        values.push(...new Array(5).fill(search))
    }
    
    const [rows] = await pool.query(query, values);   
    return rows;
}