import express from 'express';
import bcrypt from "bcryptjs";
import { createCourse, deleteCourse, getAllCourses, updateCourse, updateCourseCode } from '../database/courseTable.js';
import { addNewProgram, deleteProgram, getAllAdminPrograms, updateProgram } from '../database/programTable.js';
import { addNewTeachingSection, getAllSectionsWithCourseId, updateTeachingSection } from '../database/sectionsTable.js';
import { createFaculty, deleteFaculty, getAllFaculty, updateFaculty } from '../database/facultyTable.js';
import { courseEnrollmentsBySemester, getAllCurrentSemesterSections, getStudentDistributionByProgram, studentPassPercentageForCourses, totalStudentsEnrolledPerSemester } from '../database/semesterTable.js';
import pool from '../database/database.js';
import { getAllStudentDetailsBySection } from '../database/studentTable.js';

const admin_router = express.Router();

admin_router.get("/getAllCourses", async (req, res) => {
    const { departmentId = null, programTypeId = null, programId = null, search = null } = req.query;
    const rows = await getAllCourses(departmentId, programTypeId, programId, search);
    res.send(rows);
})

admin_router.post('/addNewCourse', async (req, res) => {
    const { Course_Name, Course_Description, Course_ProgramID, CreditHours, Program_required } = req.body;
    const data = {
        Course_Name, Course_Description, Course_ProgramID, CreditHours, Program_required
    }
    const [course] = await createCourse(data);
    const result = await updateCourseCode(course.Course_ID);
    res.send({
        CourseId: course.Course_ID,
        result
    });
})

admin_router.put("/editCourse", async (req, res) => {
    const { Course_ID, Course_Name, Course_Description, Course_ProgramID, CreditHours, Program_required } = req.body;
    if (!Course_ID) {
        res.status(400).send("No Course Id Provided");
        return;
    }
    const data = { Course_Name, Course_Description, Course_ProgramID, CreditHours, Program_required };
    const result = await updateCourse(data, Course_ID);
    res.send(result);
})

admin_router.delete("/deleteCourse", async (req, res) => {
    const { Course_ID } = req.body;
    const result = await deleteCourse(Course_ID);
    res.send(result);
})

admin_router.get("/getAllPrograms", async (req, res) => {
    const { departmentId = null, programTypeId = null, search = null } = req.query;
    const rows = await getAllAdminPrograms(departmentId, programTypeId, search);
    res.send(rows);
})

admin_router.post("/addNewProgram", async (req, res) => {
    const { Program_Name, ProgramDescription, DepartmentID, ProgramTypeID } = req.body;
    const data = {
        Program_Name, ProgramDescription, DepartmentID, ProgramTypeID
    }
    const [program] = await addNewProgram(data);
    res.send(program);
})

admin_router.put("/editProgram", async (req, res) => {
    const { Program_Name, ProgramDescription, DepartmentID, ProgramTypeID, ProgramID } = req.body;
    if(!ProgramID) {
        res.status(400).send("No Program ID Provided")
        return;
    }
    const data = {
        Program_Name, ProgramDescription, DepartmentID, ProgramTypeID
    }
    const result = await updateProgram(data, ProgramID);
    res.send(result);
})

admin_router.delete("/deleteProgram", async (req, res) => {
    const { programId } = req.body;
    const result = await deleteProgram(programId);
    res.send(result);
})


admin_router.get("/getAllCourseSections", async (req, res) => {
    const { Course_ID } = req.query;
    const rows = await getAllSectionsWithCourseId(Course_ID);
    res.send(rows);
})

admin_router.post("/addNewTeachingSection", async (req, res) => {
    const { CourseID, Professor_ID, Section_DeliveryMode, capacity, SemesterID, is_section_open } = req.body;
    let deliveryMode = null;
    if (Section_DeliveryMode === 1) deliveryMode = "Online Asynchronous"
    if (Section_DeliveryMode === 2) deliveryMode = "Online Synchronous"
    if (Section_DeliveryMode === 3) deliveryMode = "Face-to-Face"
    if (Section_DeliveryMode === 4) deliveryMode = "Hybrid"

    const data = {
        CourseID,
        Professor_ID,
        Section_DeliveryMode: deliveryMode,
        capacity,
        Section_EnrollmentCount: 0,
        SemesterID,
        is_section_open
    }
    const [section] = await addNewTeachingSection(data);
    res.send(section);
})

admin_router.put("/editTeachingSection", async (req, res) => {
    const { CourseID, Professor_ID, Section_DeliveryMode, capacity, SemesterID, is_section_open, Section_ID } = req.body;
    let deliveryMode = null;
    if (Section_DeliveryMode === 1) deliveryMode = "Online Asynchronous"
    if (Section_DeliveryMode === 2) deliveryMode = "Online Synchronous"
    if (Section_DeliveryMode === 3) deliveryMode = "Hybrid"
    const data = {
        CourseID,
        Professor_ID,
        Section_DeliveryMode: deliveryMode,
        capacity,
        SemesterID,
        is_section_open
    }
    const result = await updateTeachingSection(data, Section_ID)
    res.send(result);
})


admin_router.get("/getAllFaculty", async (req, res) => {
    const { departmentId = null, designation = null, search = null } = req.query;
    const rows = await getAllFaculty(departmentId, search);
    res.send(rows);
})

admin_router.post("/addNewFaculty", async (req, res) => {
    const { FirstName, LastName, DepartmentID, Email, Phone, Education, Role = "Faculty", password, confirmPW, Designation = null } = req.body;
    let hash = bcrypt.hashSync(password, 10);
    const data = {
        FirstName, LastName, DepartmentID, Email, Phone, Education, Role, passwordHash: hash, Designation,
    }
    const [faculty] = await createFaculty(data);
    res.send(faculty);
})

admin_router.put("/editFaculty", async (req, res) => {
    const { FirstName, LastName, DepartmentID, Email, Phone, Education, Role = "Faculty", password, confirmPW, Designation = null, Faculty_ID } = req.body;
    if (!Faculty_ID) {
        res.status(400).send("No Faculty Id Provided");
        return;
    }
    let clientPassword = null;
    if(password){
        if(password!==confirmPW){
            res.status(400).send("Passwords Do Not Match")
            return;
        } else{
            clientPassword = bcrypt.hashSync(password, 10);
        }
    }
    let data = { FirstName, LastName, DepartmentID, Email, Phone, Education, Role, Designation };
    if(clientPassword){
        data = {...data, passwordHash: clientPassword}
    }

    const result = await updateFaculty(data, Number(Faculty_ID));
    res.send(result);
})

admin_router.delete("/deleteFaculty", async (req, res) => {
    const { Faculty_ID } = req.body;
    const faculty = await deleteFaculty(Faculty_ID);
    res.send(faculty);
})

const groupEnrollmentsBySections = (acc, curr) => {
    // const existingEntry = acc.find(entry => entry.SectionID
    //     === curr.SectionID
    // );
    const sectionEnrollments = (enrollment) => ({
        EnrollmentID: enrollment.EnrollmentID,
        grade_received: enrollment.grade_received,
        grade_posted_at: enrollment.grade_posted_at,
        Enrollment_Status: enrollment.Enrollment_Status,
    })
    const { grade_received } = curr;
    if(!grade_received){
        acc.push(sectionEnrollments(curr))
    }
    return acc;
}

export const checkAllGradesWerePosted = async () => {
    const sections = await getAllCurrentSemesterSections();
    let ungradedEnrollments = [];

    sections.map(section => {
        const { Section_ID, enrollments, CourseID } = section;
        const parsedEnrollments = JSON.parse(enrollments);
        const sectionUngradedEnrollments = {
            SectionID: Section_ID,
            enrollments: parsedEnrollments.reduce(groupEnrollmentsBySections , []),
            CourseID
        }
        if(sectionUngradedEnrollments.enrollments.length){
            ungradedEnrollments.push(sectionUngradedEnrollments)
        }
    })
    if (ungradedEnrollments.length) {
        return ({
            status: 0,
            ungradedEnrollments,
        })
    }
    return ({ status: 1, sections });
}
admin_router.get("/checkAllGradesWerePosted", async (req, res) => {
    try {
        const result = await checkAllGradesWerePosted();
        if(result.status){
            res.send({
                data: result,
                message: 'All Student Grades Were Posted'
            });
            return;
        } else{
            res.status(400).send({
                data: result,
                message: "One or more teaching sections did not received grades yet"
            })
            return;
        }
    } catch (err) {
        res.status(500).send({
            data: err,
            message: "Unexpected Error: Server Failed To Process The Request"
        })
        return;
    }
})

admin_router.put("/updateCourseEnrollmentsStatus", async (req, res) => {
    const result = await checkAllGradesWerePosted();
    if (result.status) {
        const connection = await pool.getConnection();
        let studentEnrollments = [];
        result.sections.map(section => {
            const { Section_ID, enrollments } = section;
            const parsedEnrollments = JSON.parse(enrollments);
            parsedEnrollments.map((enrollment) => {
                const { SectionID, EnrollmentID, grade_received, grade_posted_at, Enrollment_Status, StudentID } = enrollment;
                studentEnrollments.push({
                    SectionID,
                    EnrollmentID,
                    StudentID,
                    grade_received
                })
            })
        });
        
        await connection.beginTransaction();
        try {
            // Transaction 1 (Update All Course Progress) 
            let tempEnrollmentTableQuery = `
            CREATE TEMPORARY TABLE TempEnrollment (
                EnrollmentID INT,
                Enrollment_Status ENUM('Wait Listed', 'Enrolled', 'Course In Progress', 'Course Completed', 'Course Cancelled')
            );
        
            INSERT INTO TempEnrollment (EnrollmentID, Enrollment_Status)
            VALUES
            `
            const studentValues = studentEnrollments.map(
                ({ EnrollmentID }) => `(${EnrollmentID}, 'Course Completed')`
            ).join(', ');

            tempEnrollmentTableQuery += ` ${studentValues}; `
            let updateEnrollmentStatusQuery = `UPDATE Enrollment e
                        JOIN TempEnrollment TE ON e.EnrollmentID = TE.EnrollmentID
                        SET e.Enrollment_Status = TE.Enrollment_Status
                        WHERE e.EnrollmentID = TE.EnrollmentID;`;
            const query1 = tempEnrollmentTableQuery + updateEnrollmentStatusQuery;
            await connection.query(query1)


            await connection.commit();
            res.send({
                message: "Course Progress Updated Successfully"
            });
            return;
        }
        catch (err) {
            console.error('Transaction failed:', err);
            await connection.rollback();
            res.status(500).send({
                data: err,
                message: "Unexpected Error: Server Failed To Process The Request"
            });
            return;
        }

    } else {
        res.status(400).send({
            data: result,
            message: "One or more teaching sections did not received grades yet"
        })
        return;
    }
})

admin_router.put("/saveProgressAndChangeSemester", async (req, res) => {
    const result = await checkAllGradesWerePosted();
    if(result.status){
        const connection = await pool.getConnection();

        await connection.beginTransaction();

        try{
            // Transaction 2 (this SProc will calculate CGPA and updates the student table. along with that, it updates, student's creditsHoursCompleted)
            await connection.query(`call CalculateCumulativeGPA();`)

            // 3rd transaction
            const updateSemesterStatusQuery = `
                SET @next_semester_id = (
                    SELECT MIN(semester_id)
                    FROM Semester
                    WHERE is_completed = 0 
                    AND semester_id > (
                        SELECT semester_id
                        FROM Semester
                        WHERE is_current_semester = 1
                    )
                );

                UPDATE Semester
                SET 
                isEnrollable = CASE 
                    WHEN is_current_semester = 1 THEN 0
                    WHEN semester_id = @next_semester_id THEN 1
                    ELSE isEnrollable
                END,
                is_current_semester = CASE 
                    WHEN is_current_semester = 1 THEN 0
                    WHEN semester_id = @next_semester_id THEN 1
                    ELSE is_current_semester
                END,
                is_completed = CASE WHEN semester_id < @next_semester_id THEN 1
                ELSE is_completed END;`;
            await connection.query(updateSemesterStatusQuery);

            const addNewSemesterQuery = `
                INSERT INTO Semester (semester_year, semester_term, isEnrollable, is_current_semester, is_completed, enrollment_deadline)
                SELECT 
                    CASE 
                        WHEN semester_term = 'fall' THEN semester_year + 1
                        ELSE semester_year
                    END AS new_year,
                    CASE 
                        WHEN semester_term = 'spring' THEN 'summer'
                        WHEN semester_term = 'summer' THEN 'fall'
                        WHEN semester_term = 'fall' THEN 'spring'
                    END AS new_term,
                    TRUE AS isEnrollable,
                    FALSE AS is_current_semester,
                    FALSE AS is_completed,
                    DATE_ADD(CURRENT_DATE, INTERVAL 4 MONTH) AS enrollment_deadline
                FROM Semester
                ORDER BY semester_id DESC
                LIMIT 1;
            `;
            await connection.query(addNewSemesterQuery);

            await connection.commit();
            res.send({
                message: "Students Progress Updated and Semester Changed Successfully"
            });
            return;
        }
        catch (err) {
            console.error('Transaction failed:', err);
            await connection.rollback();
            res.status(500).send({
                data: err,
                message: "Unexpected Error: Server Failed To Process The Request"
            });
            return;
        }
    } else{
        res.status(400).send({
            data: result,
            message: "One or more teaching sections did not received grades yet"
        })
        return;
    }
})

admin_router.get("/getAllStudentDetailsOfSection", async (req, res) => {
    const { SectionId } = req.query;
    if(!SectionId){
        res.status(400).send("No Section Id Provided")
        return;
    }
    const rows = await getAllStudentDetailsBySection(SectionId);
    res.send(rows);
})

admin_router.get("/totalStudentsEnrolledPerSemester", async (req, res) => {
    const { semesterLimit } = req.query;
    const rows = await totalStudentsEnrolledPerSemester({ semesterLimit });
    let tempRows = rows.reverse();
    res.send(tempRows);
})

admin_router.get("/getStudentDistributionByProgram", async(req, res) => {
    const rows = await getStudentDistributionByProgram();
    res.send(rows);
})

admin_router.get("/courseEnrollmentsBySemester", async(req, res) => {
    const { courseLimit } = req.query;
    const rows = await courseEnrollmentsBySemester({ courseLimit });
    res.send(rows);
})

admin_router.get("/studentPassPercentageForCourses", async(req, res) => {
    const rows = await studentPassPercentageForCourses();
    res.send(rows);
})

export default admin_router;