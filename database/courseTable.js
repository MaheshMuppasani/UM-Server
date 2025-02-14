import pool from './database.js';

export async function createCourse(courseDetails) {
    const columns = Object.keys(courseDetails);
    const values = Object.values(courseDetails);
    const tables = await pool.query(`SHOW FULL TABLES;`);
    console.log(tables);
    const [result] = await pool.query(`INSERT INTO Course (${columns.join(',')})
            VALUES (${Array(columns.length).fill('?').join(',')})`, [...values]);
    return getCourse(result.insertId);
}

export async function updateCourseCode(courseId) {
    const [result] = await pool.query(`UPDATE Course c
SET course_code = CONCAT((
    SELECT d.Department_Code 
    FROM Department d
    JOIN Program p ON p.DepartmentID = d.Department_ID
    WHERE p.ProgramID = c.Course_ProgramID
), '-', c.Course_ID)
WHERE c.Course_ID = ?`, courseId)
    return result;
}

export async function getCourses() {
    const [rows] = await pool.query(`SELECT * FROM Course`);
    return rows;
}

export async function getAllCourses(dptId, ptId, pId, search) {
    let query =
        `SELECT c.Course_ID, c.course_code, c.Course_Name, c.Course_Description, 
        c.Course_ProgramID, c.CreditHours, c.Is_active, d.Department_ID, p.ProgramTypeID,
        c.Program_required
        FROM Course c
        inner join Program p on p.ProgramID = c.Course_ProgramID
        inner join Department d on d.Department_ID = p.DepartmentID
        inner join ProgramType pt on pt.ProgramType_ID = p.ProgramTypeID`;
    let values = [];

    if (dptId || ptId || pId || search) {
        query += ` WHERE`
    }

    if (dptId !== null) {
        query += ` d.Department_ID = ?`
        values.push(Number(dptId))
    }

    if (pId !== null) {
        if (values[0]) query += ` AND`
        query += ` c.Course_ProgramID = ?`
        values.push(Number(pId))
    }

    if (ptId !== null) {
        if (values[0]) query += ` AND`
        query += ` p.ProgramTypeID = ?`
        values.push(Number(ptId))
    }

    if (search !== null) {
        if (values[0]) query += ` AND`;
        query += ` (c.course_code LIKE CONCAT('%', ?, '%') 
            OR c.Course_Name LIKE CONCAT('%', ?, '%') 
            OR c.Course_Description LIKE CONCAT('%', ?, '%') 
            OR d.Department_Name LIKE CONCAT('%', ?, '%')
            OR p.Program_Name LIKE CONCAT('%', ?, '%')
            OR pt.ProgramType_Name LIKE CONCAT('%', ?, '%'))`;
        values.push(...new Array(6).fill(search))
    }
    const [rows] = await pool.query(query, values)

    return rows;
}

export async function getCourse(id) {
    const [rows] = await pool.query(`
        SELECT c.Course_ID, c.course_code, c.Course_Name, c.Course_Description, 
        c.Course_ProgramID, c.CreditHours, c.Is_active, p.ProgramTypeID,
        c.Program_required
        FROM Course c
        inner join Program p on p.ProgramID = c.Course_ProgramID
        WHERE c.Course_ID = ?
        `, [id]);
    return rows;
}

export async function getCourseContent(id) {
    const [rows] = await pool.query(`
        SELECT * FROM Course_content
        WHERE content_id = ?
        `, [id]);
    return rows;
}

export function addColumnNamesToQuery(columnList) {
    return columnList.reduce((acc, curr, currIndex, arr) => `${acc}${curr} = ?${currIndex === arr.length - 1 ? '' : ', '}`, '')
}

export async function updateCourse(courseDetails, id) {
    try {
        const columns = Object.keys(courseDetails);
        const values = Object.values(courseDetails);
        const result = await pool.query(`UPDATE Course SET ${addColumnNamesToQuery(columns)} WHERE Course_ID = ?`, [...values, id]);
        return { success: 1, result };
    }
    catch (err) {
        return { success: 0, err };
    }
}

export async function deleteCourse(id) {
    try {
        const result = await pool.query(`DELETE FROM Course WHERE Course_ID = ?`, [id]);
        return { success: 1, result }
    }
    catch (err) {
        return { success: 0, err }
    }
}

export async function getCoursesByDepartmentWithSemesters(params) {
    // 'Wait Listed', 'Enrolled', 'Course In Progress', 
    try {
        let query = `SELECT 
                c.Course_ID, c.Course_Name, c.CreditHours, c.course_code, se.enrollment_deadline,
                CASE 
					WHEN (
                    NOT EXISTS (
                        SELECT 1
                        FROM Enrollment en
                        INNER JOIN Section sec ON en.SectionID = sec.Section_ID
                        WHERE sec.CourseID = c.Course_ID
                        AND en.StudentID = ?
                        AND en.Enrollment_Status IN ('Course Completed', 'Wait Listed', 'Enrolled', 'Course In Progress')
                    )   
                    AND
					(NOT EXISTS (
						SELECT 1
						FROM CoursePrerequisite pc
						WHERE pc.CourseID = c.Course_ID
					) -- No prerequisites, eligible to enroll
					OR ((
						SELECT COUNT(*)
						FROM CoursePrerequisite pc
						WHERE pc.CourseID = c.Course_ID
					) = 
					(
						SELECT COUNT(*)
						FROM CoursePrerequisite pc
						LEFT JOIN Section s 
							ON pc.PrerequisiteCourseID = s.CourseID
						INNER JOIN Enrollment e ON e.SectionID = s.Section_ID
						WHERE pc.CourseID = c.Course_ID
						  AND e.StudentID = ? 
						  AND e.Enrollment_Status = 'Course Completed'
					)) ) AND CURRENT_DATE <= se.enrollment_deadline) THEN TRUE -- all prerequisites completed and within the deadline 
					ELSE FALSE -- Not All prerequisites completed
				END AS eligible_to_enroll,
                CASE WHEN (CURRENT_DATE > se.enrollment_deadline) THEN TRUE ELSE FALSE END as deadlinePassed, 
                CONCAT('[', 
                    GROUP_CONCAT(
                    DISTINCT JSON_OBJECT('section_id', s.Section_ID,
                        'instructor_fname', f.FirstName,
                        'instructor_lname', f.LastName,
                        'deliveryMode', s.Section_DeliveryMode,
                        'capacity', s.capacity,
                        'SemesterID', s.SemesterID,
                        'enrolledCount', s.Section_EnrollmentCount,
                        'enrollment_status', (
                                            SELECT en.Enrollment_Status 
                                            FROM Enrollment en
                                            WHERE en.StudentID = ?
                                            AND en.SectionID = s.Section_ID
                                            ),
                        'enrolled', EXISTS (
                SELECT 1 
                FROM Enrollment en
                WHERE en.StudentID = ?
                AND en.SectionID = s.Section_ID
            ))
                ), ']') AS sections,
                        CONCAT('[',
                GROUP_CONCAT(
                    DISTINCT JSON_OBJECT(
                        'prerequisite_id', pc.PrerequisiteCourseID,
                        'prerequisite_code', preReq.course_code
                    )
                ), ']'
            ) AS prerequisites
            FROM Section s
            INNER JOIN Course c ON s.CourseID = c.Course_ID
            INNER JOIN Faculty f ON s.Professor_ID = f.Faculty_ID
            INNER JOIN Semester se on se.semester_id = s.SemesterID
            LEFT JOIN CoursePrerequisite pc ON c.Course_ID = pc.CourseID
            LEFT JOIN Course preReq ON pc.PrerequisiteCourseID = preReq.Course_ID
            WHERE s.is_section_open = 1 AND
                c.Course_ProgramID IN (
                    SELECT p.ProgramID
                    FROM Program p
                    WHERE se.semester_id = ?`;
        let values = [...new Array(4).fill(params.studentID), params.semesterID]

        if (params.courseSearch !== null) {
            query += ` AND 
                    (c.course_code LIKE CONCAT('%', ?, '%')
                    OR c.Course_Name LIKE CONCAT('%', ?, '%')
                    OR f.FirstName LIKE CONCAT('%', ?, '%')
                    OR f.LastName LIKE CONCAT('%', ?, '%')
                    OR s.Section_DeliveryMode LIKE CONCAT('%', ?, '%'))`
            values.push(...new Array(5).fill(params.courseSearch))
        }

        if (params.departmentID !== null) {
            query += ` AND p.DepartmentID = ? `;
            values.push(params.departmentID)
        }
        query += `) GROUP BY c.Course_ID;`
        const result = await pool.query(query, values);
        return result;
    } catch (err) {
        return err;
    }
}

export async function addCourseContent(params) {
    const columns = Object.keys(params);
    const [result] = await pool.query(`
            INSERT INTO Course_content (${columns.join(',')})
            VALUES (${Array(columns.length).fill('?').join(',')})
            `, [...Object.values(params)]);
    return getCourseContent(result.insertId);
}

export async function getAllMainContents(course_id) {
    const [rows] = await pool.query(`
        SELECT * FROM Course_content 
        WHERE course_id = ? AND parent_id is NULL`, [course_id]);
    return rows;
}

export async function getAllCourseContents(course_id, parent_id) {
    const [rows] = await pool.query(`
        SELECT * FROM Course_content
        WHERE course_id = ? AND parent_id = ?`, [course_id, parent_id]);
    return rows;
}

export async function deleteCourseContentsByParentId(id) {
    try {
        const result = await pool.query(`DELETE FROM Course_content WHERE parent_id = ?`, [id]);
        return { success: 1, result }
    }
    catch (err) {
        return { success: 0, err }
    }
}

export async function updateCourseContent(updatedContent, id) {
    try {
        const columns = Object.keys(updatedContent);
        const values = Object.values(updatedContent);
        const result = await pool.query(`UPDATE Course_content SET ${addColumnNamesToQuery(columns)} WHERE content_id = ?`, [...values, id]);
        return { success: 1, result };
    }
    catch (err) {
        return { success: 0, err };
    }
}

export async function deleteCourseContent(id) {
    try {
        const result = await pool.query(`DELETE FROM Course_content WHERE content_id = ?`, [id]);
        return { success: 1, result }
    }
    catch (err) {
        return { success: 0, err }
    }
}

export async function getAllCoursePreRequisites(id) {
    let query = `SELECT c2.Course_ID, c2.Course_Name, c2.course_code
                FROM CoursePrerequisite cp
                JOIN Course c1 ON cp.CourseID = c1.Course_ID
                JOIN Course c2 ON cp.PrerequisiteCourseID = c2.Course_ID
                WHERE c1.Course_ID = ?`;
    const [rows] = await pool.query(query, [id])
    return rows;
}

export async function addCoursePreRequisites(CourseId, PreRequisiteCourseIDs = []) {
    if (!PreRequisiteCourseIDs.length) return; // if no pre-requisites provided return;
    let query = `INSERT INTO CoursePrerequisite (CourseID, PrerequisiteCourseID)
                VALUES`;
    let values = [];

    // Add prerequisites courses to the query from 'PreRequisiteCourseIDs' array
    let placeholders = PreRequisiteCourseIDs.map(prereqId => {
        values.push(CourseId, prereqId); // Add the CourseID and PrerequisiteCourseID to the values array
        return `(?, ?)`; // Add a placeholder for the current course and prerequisite
    });

    // Join the placeholders into the query
    query += placeholders.join(', ');

    // Execute the query
    const [rows] = await pool.query(query, values);
    return rows;
}

export async function deleteAllCoursePreRequisites(courseId) {
    try{
        let query = `DELETE FROM CoursePrerequisite WHERE CourseID = ?`
        const data = await pool.query(query, courseId);
        return {success: 1, data};
    }
    catch(err){
        return {success: 0, err}
    }
}

export async function updateCoursePreRequisites(courseId, newPrerequisiteCourseIDs = []) {
    try{
        const result = await deleteAllCoursePreRequisites(courseId);
        const data = await addCoursePreRequisites(courseId, newPrerequisiteCourseIDs);

        return {success:1, data}
    }
    catch(e){
        return {success: 0, err}
    }

}