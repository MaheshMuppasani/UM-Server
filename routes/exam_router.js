import express from 'express';
import { upload } from '../database/database.js';
import { createExam, createSubmission, deleteExam, getAllContentExams, getAllExamsForTheMonth, getAllExamSubmissions, getAllSectionAssignments, getAllSectionExamsStatus, getAllSectionGrades, getAllStudentSubmissions, getExam, postSectionGrades, submitGrade, updateExam } from '../database/examTable.js';
import { uploadFile } from './course_router.js';
import { deleteFile } from '../database/filesTable.js';
import { authenticateFaculty, roles } from './auth.js';
import { gradeForWeightedPercentage } from './constants_router.js';

const exam_router = express.Router();

function storeAsUTC(isoString) {
    return isoString.replace('T', ' ').replace('.000Z', '');
}

exam_router.post("/createExam", upload.single('file'), async (req, res) => {
    const { Title, SectionID, ExamDueDate, MaximumScore, Instructions_data, parent_contentID } = req.body;
    let data = { Title, SectionID, ExamDueDate: storeAsUTC(ExamDueDate), MaximumScore, Instructions_data, parent_contentID };
    if (req.file) {
        const result = await uploadFile(req.file);
        data = { ...data, file_id: result.insertId }
    }
    const exam = await createExam(data);
    res.status(201).send(exam);
})

exam_router.put("/updateExam", upload.single('file'), async (req, res) => {
    const { ExamID, Title, ExamDueDate, MaximumScore, Instructions_data } = req.body;
    let data = { ExamID, Title, ExamDueDate: storeAsUTC(ExamDueDate), MaximumScore, Instructions_data };
    const [existedExam] = await getExam(ExamID);
    if (existedExam) {
        if (req.file) {
            if (existedExam.file_id) {
                await deleteFile(existedExam.file_id);
            }
            const result = await uploadFile(req.file);
            data = { ...data, file_id: result.insertId }
        }
        const result = await updateExam(data, ExamID);
        res.send(result);
    } else {
        res.status(404).send(null);
    }
})

exam_router.delete("/deleteExam", async (req, res) => {
    const { ExamID } = req.body;
    const [existedExam] = await getExam(ExamID);
    if (existedExam.file_id) {
        await deleteFile(existedExam.file_id);
    }
    const result = await deleteExam(ExamID);
    res.send(result);
})

exam_router.get("/getAllContentExams", async (req, res) => {
    const { sectionId, parent_id = null } = req.query;
    let studentID = req.user.role === roles[0].roleId ? req.user.userID : null;
    const data = {
        sectionId,
        parent_content_id: parent_id ? parent_id : null,
        isMainPage: parent_id ? 0 : 1,
        studentID
    }

    const exams = await getAllContentExams(data)
    res.send(exams);
})

exam_router.get("/getAllSectionGrades", authenticateFaculty, async (req, res) => {
    const { sectionId } = req.query;
    if (!sectionId) {
        res.status(400).send('Please provide a section Id');
        return;
    }
    const exams = await getAllSectionGrades(sectionId);
    res.send(exams);
})

exam_router.get("/getAllTeachingSectionExams", async (req, res) => {
    const { sectionId } = req.query;
    let studentID = req.user.role === roles[0].roleId ? req.user.userID : null;
    const data = {
        sectionId,
        studentID
    }
    const exams = await getAllContentExams(data)
    res.send(exams);
})

exam_router.get("/getExamDetails", async (req, res) => {
    const { sectionId, examId } = req.query;
    const [exam] = await getExam(examId);
    res.send(exam);
})

exam_router.post("/submitAssignment", upload.single('file'), async (req, res) => {
    const { exam_id, section_id, submission_text, submitted_date } = req.body;
    const student_id = req.user.userID;
    let data = {
        exam_id,
        section_id,
        submission_text,
        student_id,
        submitted_date: storeAsUTC(submitted_date),
    }
    if (req.file) {
        const result = await uploadFile(req.file);
        data = { ...data, file_id: result.insertId }
    }
    const submission = await createSubmission(data);
    res.status(201).send(submission);
})

exam_router.get("/getSubmission", async (req, res) => {
    const { examId, sectionId } = req.query;
    const studentId = req.user.userID;
    const submissions = await getAllExamSubmissions(examId, studentId, sectionId)
    res.send(submissions);
})

exam_router.get("/getAllStudentSubmissions", authenticateFaculty, async (req, res) => {
    const { examId = null, sectionId, status = null, searchText = null } = req.query;

    let statusText = null;
    if (status == 1) statusText = 'NOT NULL'
    if (status == 2) statusText = 'NULL'

    const submissions = await getAllStudentSubmissions(Number(sectionId), examId, statusText, searchText);
    res.send(submissions);
})

exam_router.get("/getAllSectionAssignments", async (req, res) => {
    const { sectionId } = req.query;
    const assignments = await getAllSectionAssignments(sectionId)
    res.send(assignments);
})

exam_router.get("/getStudentSubmissions", authenticateFaculty, async (req, res) => {
    const { examId, sectionId, studentId } = req.query;
    const submissions = await getAllExamSubmissions(examId, studentId, sectionId)
    res.send(submissions);
})

exam_router.put("/submitGrading", authenticateFaculty, upload.single('file'), async (req, res) => {
    const { submission_id, feedback_text, grade_received } = req.body;
    let data = {
        feedback_text,
        grade_received,
        graded_by: req.user.userID
    }
    if (req.file) {
        const result = await uploadFile(req.file);
        data = { ...data, feedback_fileID: result.insertId }
    }
    const result = await submitGrade(data, submission_id);
    res.send(result);
})

exam_router.put("/postAllSectionGrades", authenticateFaculty, async (req, res) => {
    const { sectionId } = req.body;
    if (!sectionId) {
        res.status(400).send('Please provide a section Id');
        return;
    }
    const allExamsStatus = await getAllSectionExamsStatus(sectionId);
    if (allExamsStatus) {
        if (allExamsStatus.every(exam => exam.students_graded === exam.students_attempted)) {
            let studentGrades = []

            allExamsStatus.forEach(exam => {
                let { grades_array, MaximumScore } = exam;
                grades_array.map(grade => {
                    const { student_id, grade_received } = grade;
                    const index = studentGrades.findIndex(sa => sa && sa.student_id === student_id)
                    if (index !== -1) {
                        studentGrades[index].student_total += grade_received;
                        studentGrades[index].max_total += MaximumScore;
                    } else {
                        studentGrades.push({
                            student_id,
                            student_total: grade_received,
                            max_total: MaximumScore
                        })
                    }
                })
            })
            if(!studentGrades.length){
                res.status(400).send('No Student Grades To Post');
                return;
            }
            // logic continues to post the grades
            studentGrades = studentGrades.map(studentScore => {
                const { student_id, student_total, max_total } = studentScore;
                const weightedPercentage = (student_total / max_total) * 100;
                const Grade = gradeForWeightedPercentage(weightedPercentage)
                // const GradeHonorPoints = gradeHonorPointsLookUp[Grade];
                return {
                    student_id,
                    grade: Grade,
                }
            })
            await postSectionGrades(studentGrades, sectionId);
            res.send('All grades posted');
            return;
        } else {
            res.status(400).send('One or more students needs to be graded!');
            return;
        }
    } else {
        res.status(500).send('Something went wrong! please try again');
        return;
    }
})

exam_router.get("/getAllStudentExamDeadlineInfo", async (req, res) => {
    const { dueMonth, dueYear } = req.query;
    const studentID = req.user.role === roles[0].roleId ? req.user.userID : null;
    if(!studentID){
        res.send({})
        return;
    }
    const rows = await getAllExamsForTheMonth({ studentID, dueMonth: Number(dueMonth), dueYear: Number(dueYear) });

    const exams = {};

    const results = rows;

    // To Group the exams by day and time
    results.forEach(row => {
        const day = row.exam_day.toString().padStart(2, '0');  // Convert day to string (e.g., "24")
        const time = row.exam_time.toString().padStart(2, '0'); // Time in "HH:MM" format
        const description = row.description || "";

        // Prepare the exam info object
        const endDateAsStr = JSON.parse(JSON.stringify(row.endDate))
        const examInfo = {
            eDate: endDateAsStr.split("T")[0],
            sDate: endDateAsStr.split("T")[0],
            eTime: row.endTime,
            sTime: row.endTime,
            title: row.course_code + ' - ' + row.title,
            description
        };
        // Constructing JSON Structure for Calendar
        // Nested structure: day -> time -> list of exams
        if (!exams[day]) {
            exams[day] = {};  // A new day object if it doesn't exist
        }

        if (!exams[day][time]) {
            exams[day][time] = [];  // A new time array if it doesn't exist
        }

        exams[day][time].push(examInfo);  // Add Exam info to the time array
    });

    // return structured JSON response
    res.send(exams);
})

export default exam_router;
