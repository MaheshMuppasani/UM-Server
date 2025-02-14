import pool from './database.js';

const studentColumns = ['Student_ID', 'FirstName', 'LastName', 'DOB', 'Email', 'PhoneNumber', 'Address', 'Major', 'Minor', 'GPA', 'Is_PassedOut', 'CreditHoursEnrolled', 'CreditHoursCompleted', 'Current_Payment_Balance', 'Current_Payment_DueDate', 'ProgramTypeID', 'ProgramID', 'StartSemesterID']

export async function createStudent(studentDetails) {
    const columns = Object.keys(studentDetails);
    const [result] = await pool.query(`
            INSERT INTO Student (${columns.join(',')})
            VALUES (${Array(columns.length).fill('?').join(',')})
            `, [...Object.values(studentDetails)]);
    return getStudent(result.insertId);
}

export async function getStudents(){
    const [rows] = await pool.query(`SELECT ${studentColumns.join(', ')} FROM Student`);
    return rows;
}

export async function getStudent(id) {
    const [rows] = await pool.query(`
        SELECT ${studentColumns.join(', ')} FROM Student
        WHERE Student_ID = ?
        `, [id]);
    return rows;
}

export async function getStudentByEmail(email) {
    const [students] = await pool.query(`
        SELECT * FROM Student
        WHERE Email = ?
        `, [email]);
    return students[0]; 
}

function addColumnNamesToQuery(columnList){
    return columnList.reduce((acc, curr, currIndex, arr) => `${acc}${curr} = ?${currIndex === arr.length-1 ? '': ', '}`, '')
}

export async function updateStudent(studentDetails, id) {
    try {
        const columns = Object.keys(studentDetails);
        const values = Object.values(studentDetails);
        const result = await pool.query(`UPDATE Student SET ${addColumnNamesToQuery(columns)} WHERE Student_ID = ?`, [...values, id]);
        return {success: 1, result};
    }
    catch(err) {
        return {success: 0, err};
    }
}

export async function deleteStudent(id) {
    try{
        const result = await pool.query(`DELETE FROM Student WHERE Student_ID = ?`, [id]);
        return {success: 1, result}
    }
    catch(err){
        return {success: 0, err}
    }
}

export async function getStudentCreditHoursForSemester(semesterId, studentId) {
    const [rows] = await pool.query(`
        SELECT 
            e.StudentID,
            COUNT(c.Course_ID) AS TotalCoursesEnrolled,
            SUM(c.CreditHours) AS CreditHoursEnrolled
        FROM Enrollment e
        INNER JOIN Section s ON e.SectionID = s.Section_ID
        INNER JOIN Course c ON s.CourseID = c.Course_ID
        WHERE s.SemesterID = ? AND e.StudentID = ? 
        GROUP BY e.StudentID;`, [semesterId, studentId])
    return rows;
}

export async function getStudentEnrollmentsBySemester(studentID) {
    const [rows] = await pool.query(`
            SELECT 
                sem.semester_id, sem.semester_year, sem.semester_term, sem.is_completed, sem.is_current_semester, 
                CONVERT_TZ(sem.enrollment_deadline, '+00:00', 'SYSTEM') AS enrollment_deadline,
                CONCAT('[', 
                    GROUP_CONCAT(
                    JSON_OBJECT('Course_ID', c.Course_ID,
                        'Course_Name', c.Course_Name,
                        'CreditHours', c.CreditHours,
                        'course_code', c.course_code,
                        'Section_ID', sec.Section_ID,
                        'Section_DeliveryMode', sec.Section_DeliveryMode,
                        'FacultyName', CONCAT_WS(' ', f.LastName, f.FirstName),
                        'Enrollment_Status', en.Enrollment_Status)
                ), ']') AS courses
            FROM 
                Section sec
            INNER JOIN Semester sem ON sem.semester_id = sec.SemesterID
            INNER JOIN Faculty f ON f.Faculty_ID = sec.Professor_ID
            INNER JOIN Enrollment en on en.SectionID = sec.Section_ID
            INNER JOIN Course c on c.Course_ID = sec.CourseID
            WHERE sem.is_completed = ? and en.StudentID = ?
            GROUP BY sem.semester_id`, [0, studentID]);
    return rows;
}

export async function getStudentEnrollmentByCourseId(params) {
    const [rows] = await pool.query(`
        Select en.EnrollmentID, en.SectionID, se.CourseID, en.StudentID
        from Enrollment en
        inner join Section se on se.Section_ID = en.SectionID
        where en.StudentID = ? and se.CourseID = ?`, [params.StudentID, params.Course_ID]);
    return rows[0];
}

export async function enrollCourse(enrollment) {
    const [result] = await pool.query(`
            INSERT INTO Enrollment SET ?
            `, [enrollment]);
    return getStudent(result.insertId);   
}

export async function dropCourse(data) {
    try{
        const result = await pool.query(`DELETE FROM Enrollment WHERE SectionID = ? and StudentID = ?`, [data.SectionID, data.StudentID]);
        return {success: 1, result}
    }
    catch(e){
        return {success: 0, e}
    }
}

export async function getCoursesBySemester(studentID) {
    const [rows] = await pool.query(`
            SELECT 
                sem.semester_id, sem.semester_year, sem.semester_term, sem.is_completed, sem.is_current_semester, sem.enrollment_deadline,
                CONCAT('[', 
                    GROUP_CONCAT(
                    JSON_OBJECT('Course_ID', c.Course_ID,
                        'Course_Name', c.Course_Name,
                        'CreditHours', c.CreditHours,
                        'course_code', c.course_code,
                        'Section_ID', sec.Section_ID,
                        'Section_DeliveryMode', sec.Section_DeliveryMode,
                        'FacultyName', CONCAT_WS(' ', f.LastName, f.FirstName),
                        'Enrollment_Status', en.Enrollment_Status)
                ), ']') AS courses
            FROM 
                Section sec
            INNER JOIN Semester sem ON sem.semester_id = sec.SemesterID
            INNER JOIN Faculty f ON f.Faculty_ID = sec.Professor_ID
            INNER JOIN Enrollment en on en.SectionID = sec.Section_ID
            INNER JOIN Course c on c.Course_ID = sec.CourseID
            WHERE (sem.is_completed = ? or is_current_semester = 1) and en.StudentID = ?
            GROUP BY sem.semester_id`, [1, studentID]);
    return rows;
}

export async function getAllStudentDetailsBySection(sectionId) {
    let query = `SELECT s.Student_ID, s.FirstName, s.LastName, s.ProgramTypeID 
                FROM Student s
                Inner join Enrollment en on en.StudentID = s.Student_ID
                where en.SectionID = ?;`
    const [rows] = await pool.query(query, sectionId);
    return rows;
}