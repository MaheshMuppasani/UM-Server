import express from 'express';
import { getFaculty } from '../database/facultyTable.js';

const common_router = express.Router();

common_router.get("/getFacultyDetails", async (req, res) => {
    const { facultyId } = req.query;
    if (!facultyId) res.status(401).send("No facultyId provided")
    const [faculty] = await getFaculty(facultyId);
    res.send(faculty);
})

export default common_router;
