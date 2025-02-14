import express from 'express';
import { enrollCourse, createStudent, deleteStudent, getStudent, getStudentEnrollmentsBySemester, getStudents, updateStudent, dropCourse, getStudentEnrollmentByCourseId, getCoursesBySemester, getStudentCreditHoursForSemester } from '../database/studentTable.js';
import { getTeachingSectionLimits } from '../database/sectionsTable.js';

const student_router = express.Router();

const authenticateStudent = (req, res, next) => {
    if(!req.user.userID || req.user.role!==1){
        return res.sendStatus(401)
    }
    next();
}
student_router.use(authenticateStudent);


export async function getStudentByID (req, res){
    const id = req.params.id;
    if(!id) res.status(401).send("Unauthorized [No id provided]")
    const student = await getStudent(id);
    res.send(student[0]);
}

student_router.get("/me", (req, res, next) => {
    req.params.id = req.user.userID;
    next()
}, getStudentByID)

student_router.get("/getStudentByID/:id", getStudentByID)

student_router.put("/updateStudent/:id", async (req, res) => {
    const id = req.params.id;
    const updatedStudent = req.body;
    const result = await updateStudent(updatedStudent, id)
    res.send(result);
})

student_router.delete("/deleteStudent/:id", async (req, res) => {
    const id = req.params.id;
    const result = await deleteStudent(id);
    res.send(result);
})

student_router.get("/getStudentEnrollments", async (req, res) => {
    const id = req.user.userID;
    const studentEnrollments = await getStudentEnrollmentsBySemester(id);
    res.send(studentEnrollments);
})

student_router.post("/enrollCourse", async (req, res) => {
    const StudentID = req.user.userID;
    const { SectionID, Enrollment_Status, Course_ID, SemesterID } = req.body;
    const data = { SectionID, Enrollment_Status, StudentID };
    const existingEnrollment = await getStudentEnrollmentByCourseId({Course_ID, StudentID});
    if(existingEnrollment && existingEnrollment.EnrollmentID){
        await dropCourse(existingEnrollment) // drop Existing section of the same course
    }
    const [student] = await getStudentCreditHoursForSemester(SemesterID, StudentID);
    if(student && student?.TotalCoursesEnrolled >= 3){
        res.status(401).send("Cannot enroll for more than 3 courses in a semester");
        return;
    }
    const [sectionData] = await getTeachingSectionLimits(SectionID);
    if(sectionData.capacity < sectionData.Section_EnrollmentCount + 1){
        res.status(401).send("Section Limit Reached");
        return;
    }
    const enrollment = await enrollCourse(data); // enroll for the chosen section of the course
    res.status(201).send(enrollment);
})

student_router.delete("/dropCourse", async(req, res) => {
    const id = req.user.userID;
    const data = {...req.body, StudentID: id}
    const result = await dropCourse(data);
    res.send(result);
})

student_router.get("/getCoursesBySemester", async(req, res) => {
    const id = req.user.userID;
    const studentEnrollments = await getCoursesBySemester(id);
    res.send(studentEnrollments);
})

export default student_router;