import express from "express";
import bcrypt from "bcryptjs";
import { createStudent, getStudentByEmail } from "../database/studentTable.js";
import jwt from 'jsonwebtoken';
import { getFaculty, getFacultyByEmail } from "../database/facultyTable.js";
import { loginFormFeedbackConstants } from "./constants_router.js";

const router = express.Router();

export const roles = [
    {
        roleName: 'Student',
        roleId: 1
    },
    {
        roleName: 'Faculty',
        roleId: 2,
    },
    {
        roleName: 'Admin',
        roleId: 3
    }
]

export function authenticateUser(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401) // status unauthorized
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403) // status forbidden
        req.user = user;
        next();
    })
}

export async function authenticateFaculty(req, res, next){
    const facultyID = req.user.userID;
    const [faculty] = await getFaculty(facultyID);
    if(faculty.Email !== req.user.Email){
        return res.sendStatus(403);
    }
    next();
}

export async function authenticateAdmin(req, res, next) {
    const facultyID = req.user.userID;
    const [faculty] = await getFaculty(facultyID);
    if(faculty?.Email !== req.user.Email || faculty?.Role !== roles[2].roleName){
        return res.sendStatus(403);
    }
    next();
}

router.post("/login", async (req, res) => {
    const {email, pw} = req.body;
    let role, loginUser, userID;

    const loginStudent = await getStudentByEmail(email);
    if(loginStudent){
        loginUser = loginStudent;
        userID = loginUser.Student_ID;
        role = roles[0].roleId;
    } else{
        const loginFaculty = await getFacultyByEmail(email);
        if(loginFaculty){
            loginUser = loginFaculty;
            userID = loginUser.Faculty_ID;
            role =  roles.find(role => role.roleName===loginFaculty.Role).roleId;
        }
    }
    if(!loginUser){
        res.status(401).send({type: loginFormFeedbackConstants.EMAIL_NOT_FOUND})
        return;
    }
    if(loginUser && loginUser.passwordHash && bcrypt.compareSync(pw, loginUser.passwordHash)){
        // successful login
        const user = {...loginUser, role, userID};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).send({accessToken, role});
    } else{
        res.status(401).send({type: loginFormFeedbackConstants.PASSWORD_ERR})
    }
})

router.post("/register", async (req, res) => {
    let { passwordHash, Email } = req.body;
    let hash = bcrypt.hashSync(passwordHash, 10);
    const existedStudent = await getStudentByEmail(Email);
    if(existedStudent){
        res.status(409).send("Email is already registered");
        return;
    }
    const existedFaculty = await getFacultyByEmail(Email);
    if(existedFaculty){
        res.status(409).send("Email is already registered");
        return;
    }
    const student = await createStudent({
        ...req.body,
        "passwordHash": hash
    });
    res.status(201).send(student);
})

export default router;