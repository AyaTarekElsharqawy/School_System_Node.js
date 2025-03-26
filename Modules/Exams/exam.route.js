import express from "express";
import { verifyToken } from "../../MiddleWare/verifyToken.js";
import { createExam, getExamById, getExam  ,deleteExamById } from "../Exams/exam.controller.js"; 

const examRoute = express.Router();

examRoute.post('/create',verifyToken, createExam);
examRoute.get('/getExam/:id', getExamById);
examRoute.get('/getAllExams',verifyToken, getExam);
examRoute.delete('/delete/:id',verifyToken, deleteExamById);
export default examRoute;  