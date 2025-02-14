import express from 'express';
import { getAllProgramTypes } from '../database/programTypeTable.js';
import { getAllPrograms } from '../database/programTable.js';
import { getAllSemesters } from '../database/semesterTable.js';
import { getAllDepartments } from '../database/departmentTable.js';
import { roles } from './auth.js';
const constants_router = express.Router();

const isValueInRange = (value, min, max) => {
    if (min <= value && value <= max + 0.99) return true;
    return false;
}

export const gradeForWeightedPercentage = (percentage) => {
    if (isValueInRange(percentage, 94, 100)) return 'A';
    else if (isValueInRange(percentage, 90, 93)) return 'A-';
    else if (isValueInRange(percentage, 87, 89)) return 'B+';
    else if (isValueInRange(percentage, 84, 86)) return 'B';
    else if (isValueInRange(percentage, 80, 83)) return 'B-';
    else if (isValueInRange(percentage, 77, 79)) return 'C+';
    else if (isValueInRange(percentage, 74, 76)) return 'C';
    else if (isValueInRange(percentage, 70, 73)) return 'C-';
    else if (isValueInRange(percentage, 67, 69)) return 'D+';
    else if (isValueInRange(percentage, 64, 66)) return 'D';
    else if (isValueInRange(percentage, 60, 63)) return 'D-';
    else if (percentage < 60) return 'E';
    else return null;
}

export const gradeHonorPointsLookUp = {
    'A': 4,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'D-': 0.7,
    'E': 0.0
}

export const loginFormFeedbackConstants = {
    EMAIL_NOT_FOUND: 'invalid-email',
    EMAIL_NOT_FOUND_MSG: 'No account exists with this email',
    PASSWORD_ERR: 'incorrect-password',
    PASSWORD_ERR_MSG: 'Incorrect password'
}

constants_router.get("/getAllConstants", async (req, res) => {
    try {
        const constants = {
            programTypes: await getAllProgramTypes(),
            programs: await getAllPrograms(),
            semesters: await getAllSemesters(),
            departments: await getAllDepartments(),
            roles: roles,
            loginFormFeedbackConstants
        }
        res.send(constants)
    }
    catch (e) {
        res.status(500).send(e);
    }
})

export default constants_router;