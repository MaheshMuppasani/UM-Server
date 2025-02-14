import express from 'express';
import cors from 'cors';
import student_router from "./routes/student_router.js";
import course_router from './routes/course_router.js';
import auth, { authenticateAdmin, authenticateFaculty } from "./routes/auth.js";
import { authenticateUser } from './routes/auth.js';
import constants_router from './routes/constants_router.js';
import user_router from './routes/user_router.js';
import faculty_router from './routes/faculty_router.js';
import announcement_router from './routes/announcement_router.js';
import files_router from './routes/files_router.js';
import exam_router from './routes/exam_router.js';
import admin_router from './routes/admin_router.js';
import common_router from './routes/common_router.js';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition'],
  credentials: true
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition'); // Allow client to access this header
    next();
});
app.use(express.raw({ type: 'application/octet-stream', limit: '50mb' }));

app.use("/students", authenticateUser, student_router);
app.use("/courses", authenticateUser, course_router);
app.use("/faculty", authenticateUser, authenticateFaculty, faculty_router);
app.use("/admin", authenticateUser, authenticateAdmin, admin_router);
app.use("/announcements", authenticateUser, announcement_router);
app.use("/files", authenticateUser, files_router)
app.use("/user", authenticateUser, user_router);
app.use("/exams", authenticateUser, exam_router);
app.use("/common", authenticateUser, common_router);
app.use("/constants", constants_router)
app.use("/auth", auth);
app.use("/events", exam_router);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Unexpected Error');
})

app.get('/', (req, res) => {
  res.send('Welcome to the university portal');
});

app.listen(8080, () => console.log('server is running on port 8080'))