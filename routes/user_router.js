import express from 'express';

const user_router = express.Router();

export async function getUserByID(req, res) {
    const id = req.params.id;
    const role = req.user.role;
    if(!id) res.status(401).send("Unauthorized [No id provided]")
    const { iat, passwordHash, userID, ...others } = req.user;
    res.send(others);
}

user_router.get("/me", (req, res, next) => {
    req.params.id = req.user.userID;
    next()
}, getUserByID);

export default user_router;