import { addColumnNamesToQuery } from './courseTable.js';
import pool from './database.js';

export async function createExam(params) {
    const columns = Object.keys(params);
    const [result] = await pool.query(`
            INSERT INTO Exam (${columns.join(',')})
            VALUES (${Array(columns.length).fill('?').join(',')})
            `, [...Object.values(params)]);
    return getExam(result.insertId);
}

export async function getExam(id) {
    const [rows] = await pool.query(`
        SELECT * FROM Exam
        WHERE ExamID = ?
        `, [id]);
    return rows;
}

export async function updateExam(examDetails, id) {
    try {
        const columns = Object.keys(examDetails);
        const values = Object.values(examDetails);
        const result = await pool.query(`UPDATE Exam SET ${addColumnNamesToQuery(columns)} WHERE ExamID = ?`, [...values, id]);
        return { success: 1, result };
    }
    catch (err) {
        return { success: 0, err };
    }
}

export async function deleteExam(id) {
    try {
        const result = await pool.query(`DELETE FROM Exam WHERE ExamID = ?`, [id]);
        return { success: 1, result }
    }
    catch (err) {
        return { success: 0, err }
    }
}

export async function getAllContentExams({ sectionId, parent_content_id = null, isMainPage = 0, studentID = null }) {
    let query = `SELECT 
                e.ExamID,
                e.Title,
                e.ExamType,
                e.SectionID,
                e.ExamDueDate,
                e.MaximumScore,
                e.Instructions_data,
                e.file_id,
                e.parent_contentID,
                e.Is_active,
                CASE WHEN ((es.feedback_fileID IS NOT NULL) OR (es.feedback_text IS NOT NULL AND es.feedback_text != '')) THEN TRUE ELSE FALSE END AS hasAFeedback,
                CASE 
                    WHEN ? IS NOT NULL THEN 
                        CASE 
                            WHEN es.submission_id IS NOT NULL THEN TRUE 
                            ELSE FALSE 
                        END
                    ELSE NULL
                END AS IsAttempted,
                CASE WHEN ? IS NOT NULL THEN es.grade_received ELSE NULL END AS grade_received,
                CASE WHEN ? IS NOT NULL THEN es.graded_on ELSE NULL END AS graded_on
            FROM Exam e
            LEFT JOIN Exam_Submission es
            ON e.ExamID = es.exam_id AND es.student_id = ?
            WHERE e.SectionID = ? `

    let values = [...new Array(4).fill(studentID), sectionId];

    if (parent_content_id && parent_content_id !== null) {
        query += ` AND parent_contentID = ?`
        values.push(parent_content_id);
    } else if (isMainPage) {
        query += ` AND parent_contentID IS NULL`
    }
    const [rows] = await pool.query(query, values);
    return rows;
}

export async function getAllSectionGrades(sectionId) {
    let query = `SELECT 
                e.ExamID,
                e.Title,
                e.ExamType,
                e.SectionID,
                e.ExamDueDate,
                e.MaximumScore,
                e.Instructions_data,
                e.file_id,
                e.parent_contentID,
                e.Is_active,
                -- Number of students who attempted the exam
                COUNT(DISTINCT es.submission_id) AS students_attempted,
                -- Number of students who received a grade for the exam
                COUNT(DISTINCT CASE WHEN es.grade_received IS NOT NULL THEN es.submission_id END) AS students_graded,
                -- Total count of students in the section
                (
                    SELECT COUNT(*)
                    FROM Enrollment en
                    WHERE en.SectionID = e.SectionID
                ) AS total_students,
                -- Grades of all students for the exam in an array
                -- JSON_ARRAYAGG
                JSON_ARRAYAGG(
                        CASE 
                            WHEN es.grade_received IS NOT NULL THEN es.grade_received
                            ELSE 0
                        END
                    ) AS grades_array
            FROM Exam e
            LEFT JOIN Exam_Submission es
            ON e.ExamID = es.exam_id
            WHERE e.SectionID = ?
            GROUP BY e.ExamID`;
    const [rows] = await pool.query(query, sectionId);
    return rows;
}

export async function getAllSectionExamsStatus(sectionId) {
    let query = `SELECT 
                e.ExamID,
                e.MaximumScore,

                COUNT(DISTINCT es.submission_id) AS students_attempted,

                COUNT(DISTINCT CASE WHEN es.grade_received IS NOT NULL THEN es.submission_id END) AS students_graded,

                (
                    SELECT COUNT(*)
                    FROM Enrollment en
                    WHERE en.SectionID = e.SectionID
                ) AS total_students,
                JSON_ARRAYAGG(
                        JSON_OBJECT(
                        'student_id', en.StudentID,
                        'grade_received', CASE 
                            WHEN EXISTS (
                                SELECT 1 
                                FROM Exam_Submission es_sub
                                WHERE es_sub.exam_id = e.ExamID 
                                AND es_sub.student_id = en.StudentID
                            ) THEN COALESCE(es.grade_received, 0)
                            ELSE 0 END
                        )) AS grades_array
            FROM Exam e
            LEFT JOIN Enrollment en on en.SectionID = e.SectionID
            LEFT JOIN Exam_Submission es ON e.ExamID = es.exam_id AND en.StudentID = es.student_id
            WHERE e.SectionID IN (
                SELECT Section_ID
                FROM Section s
                WHERE s.SemesterID = (
                    SELECT semester_id
                    FROM Semester
                    WHERE is_current_semester = 1 AND e.SectionID = ?
                )
            )
            GROUP BY e.ExamID`
    const [rows] = await pool.query(query, sectionId);
    return rows;
}

export async function postSectionGrades(grades, sectionId) {
    let query1 = `
    DROP TEMPORARY TABLE IF EXISTS TempGrades;
    CREATE TEMPORARY TABLE TempGrades (
        StudentID INT PRIMARY KEY,
        grade_received ENUM('A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E')
    );

    INSERT INTO TempGrades (StudentID, grade_received)
    VALUES
    `
    const studentValues = grades.map(
        ({ student_id, grade }) => `(${student_id}, '${grade}')`
    ).join(', ');

    query1 += ` ${studentValues}; `
    let query2 = `UPDATE Enrollment e
                JOIN TempGrades tg ON e.StudentID = tg.StudentID
                SET e.grade_received = tg.grade_received,
                    e.grade_posted_at = NOW()
                WHERE e.SectionID = ?;`;
    const result = await pool.query(query1 + query2, [sectionId])
    return result;
}

export async function getSubmission(id) {
    const [rows] = await pool.query(`
        SELECT * FROM Exam_Submission
        WHERE submission_id = ?
        `, [id]);
    return rows;
}

export async function createSubmission(params) {
    const columns = Object.keys(params);
    const values = Object.values(params);
    const [result] = await pool.query(`
            INSERT INTO Exam_Submission (${columns.join(',')})
            VALUES (${Array(columns.length).fill('?').join(',')})
            `, [...values]);
    return getSubmission(result.insertId);
}

export async function getAllExamSubmissions(examId, studentId, sectionId) {
    const [rows] = await pool.query(`
        SELECT * FROM Exam_Submission
        WHERE exam_id = ? AND student_id = ? AND section_id = ?`, [examId, studentId, sectionId]);
    return rows;
}

export async function getAllStudentSubmissions(sectionId, exam_id, status, search = null) {
    let query = `SELECT e.ExamID, es.submission_id, s.Student_ID, 
    CONCAT(s.FirstName, ' ', s.LastName) AS StudentFullName, s.Email AS StudentEmail,
    e.Title AS ExamTitle, e.ExamDueDate, e.MaximumScore, es.submitted_date AS SubmissionDate,
     es.grade_received AS GradeReceived
    FROM Exam_Submission es
    JOIN Student s ON es.student_id = s.Student_ID
    JOIN Exam e ON es.exam_id = e.ExamID
    WHERE es.section_id = ?`;
    let values = [sectionId];

    // Add conditions dynamically if exam_id or status are not null
    if (exam_id !== null) {
        query += ` AND es.exam_id = ?`;
        values.push(exam_id);
    }

    if (status !== null) {
        query += ` AND es.grade_received IS ${status}`;
    }
    if (search !== null) {
        if (values[0]) query += ` AND`;
        query += ` (s.FirstName LIKE CONCAT('%', ?, '%') 
            OR s.LastName LIKE CONCAT('%', ?, '%')
            OR e.Title LIKE CONCAT('%', ?, '%')
            OR s.Email LIKE CONCAT('%', ?, '%'))`;
        values.push(...new Array(4).fill(search))
    }

    query += ` ORDER BY e.ExamID, es.submission_id;`
    const [rows] = await pool.query(query, values);
    return rows;
}

export async function getAllSectionAssignments(sectionId) {
    const [rows] = await pool.query(`
        SELECT ExamID, Title, ExamDueDate
        FROM Exam
        WHERE SectionID = ?`, [sectionId]);
    return rows;
}

export async function submitGrade(data, submission_id) {
    try {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const result = await pool.query(`UPDATE Exam_Submission SET ${addColumnNamesToQuery(columns)} 
        WHERE submission_id = ?`, [...values, submission_id]);
        return { success: 1, result };
    }
    catch (err) {
        return { success: 0, err };
    }
}

export async function getAllExamsForTheMonth(params) {
    let query2 = `SELECT 
                DAY(e.ExamDueDate) AS exam_day,
                TIME_FORMAT(e.ExamDueDate, '%H:%i') AS exam_time,
                e.Title AS title,
                e.Instructions_data AS description,
                DATE(e.ExamDueDate) AS endDate,
                TIME_FORMAT(e.ExamDueDate, '%H:%i') AS endTime,
                c.course_code
            FROM 
                Exam e
            JOIN 
                Section s ON e.SectionID = s.Section_ID
            JOIN 
                Enrollment en ON s.Section_ID = en.SectionID
            JOIN 
                Course c on c.Course_ID = s.CourseID
            WHERE 
                en.StudentID = ? -- Replace with Student ID
                AND MONTH(e.ExamDueDate) = ? -- Replace with the month number
                AND YEAR(e.ExamDueDate) = ?`
    const [rows] = await pool.query(query2, [params.studentID, params.dueMonth, params.dueYear]);
    return rows;
}