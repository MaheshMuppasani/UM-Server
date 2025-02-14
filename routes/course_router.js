import express from 'express';
import { addCourseContent, addCoursePreRequisites, createCourse, deleteAllCoursePreRequisites, deleteCourse, deleteCourseContent, deleteCourseContentsByParentId, getAllCourseContents, getAllCoursePreRequisites, getAllMainContents, getCourse, getCourseContent, getCourses, getCoursesByDepartmentWithSemesters, updateCourse, updateCourseContent, updateCoursePreRequisites } from '../database/courseTable.js';
import { upload } from '../database/database.js';
import { addNewFile, deleteFile } from '../database/filesTable.js';

const course_router = express.Router();

course_router.get("/getAllCourses", async (req, res) => {
    const courses = await getCourses();
    res.send(courses)
})

course_router.get("/getCoursesByDepartmentWithSemesters", async (req, res) => {
    const { departmentID = null, semesterID, courseSearch = null } = req.query;
    const studentID = req.user.userID
    const data = { 
        studentID, 
        departmentID : departmentID ? Number(departmentID) : null,
        semesterID: Number(semesterID), 
        courseSearch 
    }
    const result = await getCoursesByDepartmentWithSemesters(data);
    res.send(result[0]);
})

course_router.get("/getCourseByID/:id", async (req, res) => {
    const id = req.params.id;
    const [course] = await getCourse(id);
    res.send(course);
})

// course_router.post("/createCourse", async (req, res) => {
//     const { Course_Name, CreditHours, Course_Description, Course_DepartmentID } = req.body;
//     // add validation code
//     const course = await createCourse({ Course_Name, CreditHours, Course_Description, Course_DepartmentID });
//     res.status(201).send(course);
// })

course_router.put("/updateCourse/:id", async (req, res) => {
    const id = req.params.id;
    const updatedCourse = req.body;
    const result = await updateCourse(updatedCourse, id)
    res.send(result);
})

course_router.delete("/deleteCourse/:id", async (req, res) => {
    const id = req.params.id;
    const result = await deleteCourse(id);
    res.send(result);
})

course_router.get("/getAllCourseContents/", async (req, res) => {
    const { courseID, parent_id } = req.query;
    const course_contents = parent_id ? await getAllCourseContents(courseID, parent_id) : await getAllMainContents(courseID);
    res.send(course_contents);
})

export async function uploadFile(file) {
    const { originalname, mimetype, size, buffer } = file;
    const result = await addNewFile({ file_name: originalname, file_type: mimetype, file_size: size, file_data: buffer });
    return result;
}

course_router.post("/createCourseContent", upload.single('file'), async (req, res) => {
    const { course_id, parent_id, content_type, content_name, content_order, content_data, content_title_link } = req.body;
    let data = { course_id, parent_id, content_type, content_name, content_order, content_data, content_title_link }
    if (req.file) {
        const result = await uploadFile(req.file);
        data = { ...data, file_id: result.insertId }
    }
    const courseContent = await addCourseContent(data);
    res.status(201).send(courseContent);
})


export async function deleteChildContents(content, content_id) {
    if (content.content_type === "folder") {
        await deleteCourseContentsByParentId(content_id);
    }
    if (content.content_type === "file" && content.file_id) {
        await deleteFile(content.file_id);
    }
    return;
}

course_router.put("/updateCourseContent", upload.single('file'), async (req, res) => {
    const { content_id, content_type, content_name, content_order, content_data, content_title_link } = req.body;
    let data = { content_id, content_type, content_name, content_order, content_data, content_title_link }
    const [existedContent] = await getCourseContent(content_id);
    if (existedContent) {
        if(existedContent.content_type !== content_type){ // content type got changed
            await deleteChildContents(existedContent, content_id);
        }
        if (content_type === "file" && req.file) {
            if (existedContent.file_id) {
                await deleteFile(existedContent.file_id);
            }
            const result = await uploadFile(req.file);
            data = { ...data, file_id: result.insertId }
        }
        const result = await updateCourseContent(data, content_id);
        res.send(result);
    } else {
        res.status(404).send(null);
    }
})

course_router.delete("/deleteCourseContent", async (req, res) => {
    const { content_id } = req.body;
    // const [existedContent] = await getCourseContent(content_id);
    // await deleteChildContents(existedContent, content_id);
    const result = await deleteCourseContent(content_id);
    res.send(result);
})

// pre-requisites

course_router.get("/getAllCoursePreRequisites", async (req, res) => {
    const { CourseId } = req.query;
    if(!CourseId) {
        res.status(400).send("No Course Id Provided");
        return;
    }
    const rows = await getAllCoursePreRequisites(Number(CourseId));
    res.send(rows);
})

course_router.post("/addCoursePreRequisites", async (req, res) => {
    const { CourseId, PreRequisiteCourseIDs = null } = req.body;
    if(!CourseId || !PreRequisiteCourseIDs) {
        res.status(400).send("No Course Id or  Pre-Requisite CourseID's Provided");
        return;
    }
    const result = await addCoursePreRequisites(Number(CourseId), PreRequisiteCourseIDs);
    res.send(result);
})

course_router.post("/updateCoursePreRequisites", async(req, res) => {
    const { CourseId, PreRequisiteCourseIDs = null } = req.body;
    if(!CourseId || !PreRequisiteCourseIDs) {
        res.status(400).send("No Course Id or  Pre-Requisite CourseID's Provided");
        return;
    }
    const result = await updateCoursePreRequisites(Number(CourseId), PreRequisiteCourseIDs);
    res.send(result);
})

course_router.delete("/deleteAllCoursePreRequisites", async(req, res) => {
    const { CourseId } = req.body;
    if(!CourseId) {
        res.status(400).send("No Course Id provided");
    }
    const result = await deleteAllCoursePreRequisites(Number(CourseId));
    res.send(result);
})

export default course_router;
