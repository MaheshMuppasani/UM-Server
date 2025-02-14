import { addColumnNamesToQuery } from './courseTable.js';
import pool from './database.js';

export async function getSection(id) {
    const [rows] = await pool.query(`
        SELECT * FROM Section
        WHERE Section_ID = ?
        `, [id]);
    return rows;
}

export async function getTeachingSectionLimits(id) {
    const [rows] = await pool.query(`
        SELECT * FROM Section
        WHERE Section_ID = ?
        `, [id]);
    return rows;
}

export async function getAllSectionsWithCourseId(courseId) {
    const [ sections ] = await pool.query(`
        SELECT sem.semester_id, sem.is_current_semester, sem.is_completed, c.Course_ID, c.Course_Name, c.CreditHours, c.course_code,
                CONCAT('[', 
                        GROUP_CONCAT(
                        JSON_OBJECT(
                            'Section_ID', sec.Section_ID,
                            'Section_DeliveryMode', sec.Section_DeliveryMode,
                            'Capacity', sec.capacity,
                            'EnrollmentCount', sec.Section_EnrollmentCount,
                            'is_section_open', sec.is_section_open,
                            'SemesterID', sec.SemesterID,
                            'Faculty_ID', f.Faculty_ID, 
                            'FacultyName', CONCAT_WS(' ', f.LastName, f.FirstName))
                    ), ']') AS sections
                FROM 
                    Section sec
            INNER JOIN Semester sem ON sem.semester_id = sec.SemesterID
            INNER JOIN Faculty f ON f.Faculty_ID = sec.Professor_ID
            INNER JOIN Course c on c.Course_ID = sec.CourseID
            WHERE (sem.is_completed = 0 or is_current_semester = 1) and c.Course_ID = ?
            GROUP BY sem.semester_id, c.Course_ID`, [courseId])
    return sections;
}

export async function addNewTeachingSection(params) {
    const columns = Object.keys(params);
    const values = Object.values(params);
    const [result] = await pool.query(`
            INSERT INTO Section (${columns.join(',')})
            VALUES (${Array(columns.length).fill('?').join(',')})
            `, [...values]);
    return getSection(result.insertId);
}

export async function updateTeachingSection(params, id) {
    try {
        const columns = Object.keys(params);
        const values = Object.values(params);
        const result = await pool.query(`UPDATE Section SET ${addColumnNamesToQuery(columns)} WHERE Section_ID = ?`, [...values, id]);
        return {success: 1, result};
    }
    catch(err) {
        return {success: 0, err};
    }
}