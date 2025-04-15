import pool from './database.js';

export async function getAllSemesters() {
    const [rows] = await pool.query('SELECT * FROM Semester');
    return rows;
}

export async function getAllCurrentSemesterSections() {
    const [rows] = await pool.query(`
        SELECT 
            sec.Section_ID,
            sec.CourseID,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'EnrollmentID', en.EnrollmentID,
                    'SectionID', en.SectionID,
                    'grade_received', en.grade_received,
                    'grade_posted_at', en.grade_posted_at,
                    'Enrollment_Status', en.Enrollment_Status,
                    'StudentID', en.StudentID)
            ) AS enrollments
        FROM Section sec
        INNER JOIN Semester sem ON sem.semester_id = sec.SemesterID
        INNER JOIN Enrollment en on en.SectionID = sec.Section_ID

        WHERE sem.is_current_semester = 1
        GROUP BY sec.Section_ID`, []);
    return rows;
}

export async function totalStudentsEnrolledPerSemester(params) {
    const { semesterLimit = 10 } = params || {};
    const query = `
    SELECT 
        se.semester_id,
        CONCAT(se.semester_term, ' ', se.semester_year) AS semester_name,
        COUNT(DISTINCT e.StudentID) AS total_students
    FROM 
        Enrollment e
    INNER JOIN 
        Section s ON e.SectionID = s.Section_ID
    INNER JOIN 
        Semester se ON s.SemesterID = se.semester_id
    WHERE se.semester_id <= (SELECT semester_id FROM Semester WHERE is_current_semester = 1)
    GROUP BY 
        se.semester_id, semester_name
    ORDER BY
        se.semester_year DESC,
        FIELD(se.semester_term, 'spring', 'summer', 'fall') DESC
    LIMIT ?;
    `;
    const [rows] = await pool.query(query, [Number(semesterLimit)]);
    return rows; 
}

export async function studentPassPercentageForCourses(selectedCourses) {
    const query = `
WITH RecentSemesters AS (
    SELECT 
        semester_id,
        semester_term,
        semester_year,
        CASE semester_term 
            WHEN 'Spring' THEN 1 
            WHEN 'Summer' THEN 2 
            WHEN 'Fall' THEN 3 
        END AS term_order
    FROM Semester
    WHERE semester_id < (SELECT semester_id FROM Semester WHERE is_current_semester = 1)
    ORDER BY semester_year DESC, term_order DESC
    LIMIT 10
)

SELECT
    c.Course_Name AS course_name,
    c.course_code AS course_code,
    CONCAT(se.semester_term, ' ', se.semester_year) AS semester_name,
    se.semester_id,
    ROUND(
        (SUM(CASE WHEN e.grade_received IN ('A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-') 
        THEN 1 ELSE 0 END) / 
        COUNT(e.StudentID)) * 100, 2
    ) AS pass_percentage
FROM Enrollment e
JOIN Section s ON e.SectionID = s.Section_ID
JOIN RecentSemesters se ON s.SemesterID = se.semester_id
JOIN Course c ON s.CourseID = c.Course_ID
${selectedCourses ? 'WHERE c.Course_ID IN (?)' : ''}
GROUP BY c.Course_Name, c.course_code, se.semester_id, semester_name, se.semester_term, se.semester_year
ORDER BY 
    se.semester_year DESC,
    CASE se.semester_term
        WHEN 'Spring' THEN 1
        WHEN 'Summer' THEN 2
        WHEN 'Fall' THEN 3
    END ASC;`; 
    const params = [];
    if(selectedCourses) params.push(selectedCourses);
    const [rows] = await pool.query(query, params);
    return rows;
}

export async function getStudentDistributionByProgram(params) {
    const query = `SELECT 
    p.Program_Name AS program_name,
    COUNT(s.Student_ID) AS total_students
FROM 
    Student s
INNER JOIN 
    Program p ON s.ProgramID = p.ProgramID
GROUP BY 
    p.Program_Name
ORDER BY 
    total_students DESC;`
    const [rows] = await pool.query(query);
    return rows;
}

export async function courseEnrollmentsBySemester(params) {
    const { courseLimit = 10 } = params || {};
    const query = `SELECT 
	sem.semester_id,
    c.Course_Name AS course_name,
    c.course_code AS course_code,
    COUNT(e.StudentID) AS total_enrollments
FROM 
    Enrollment e
INNER JOIN 
    Section s ON e.SectionID = s.Section_ID
INNER JOIN 
    Course c ON s.CourseID = c.Course_ID
INNER JOIN 
    Semester sem ON s.SemesterID = sem.semester_id
WHERE 
    sem.is_current_semester = 1
GROUP BY 
    sem.semester_id, c.Course_ID, c.Course_Name
ORDER BY 
    total_enrollments DESC
LIMIT ?;`

    const [rows] = await pool.query(query, Number(courseLimit))
    return rows;
}