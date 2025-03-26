import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import myConnection from "./Database/dbconnection.js";
 import userRoute from './Modules/User/user.route.js';
import examRoute from './Modules/Exams/exam.route.js';
import path from "path";
import { fileURLToPath } from "url";
import migrationRoutes from './Modules/service/migration.route.js';
import TeacherRoute from './Modules/teacherTable/teacherTable.route.js';
import StudentRoute from './Modules/studentTable/studentTable.route.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    exposedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));

  app.use('/api', migrationRoutes);
  app.use(userRoute);
  app.use('/api/exams', examRoute);
  app.use('/api/teachers', TeacherRoute);
  app.use('/api/students', StudentRoute);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '50mb',
  parameterLimit: 100000
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/images', express.static(path.join(__dirname, 'images')));
myConnection;

const PORT = process.env.PORT || 3030;
app.listen(3030, function(){
    console.log("Server is running on port 3030");
});