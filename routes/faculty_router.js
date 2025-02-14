import express from 'express';
import { getFacultiesByProgramID, getFaculty, getFacultyCoursesBySemester } from '../database/facultyTable.js';

const faculty_router = express.Router();

export async function getFacultyByID (req, res){
    const id = req.params.id;
    if(!id) res.status(401).send("Unauthorized [No id provided]")
    const faculty = await getFaculty(id);
    res.send(faculty[0]);
}

faculty_router.get("/me", (req, res, next) => {
    req.params.id = req.user.userID;
    next()
}, getFacultyByID)

faculty_router.get("/getCoursesBySemester", async(req, res) => {
    const id = req.user.userID;
    const facultyCourses = await getFacultyCoursesBySemester(id);
    res.send(facultyCourses);
})


faculty_router.get("/getFacultiesByProgramID/:programId", async(req, res) => {
    const { programId } = req.params;
    const rows = await getFacultiesByProgramID(Number(programId));
    res.send(rows);
})

export default faculty_router;