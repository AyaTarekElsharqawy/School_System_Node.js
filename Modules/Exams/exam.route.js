import express from "express";
import { verifyTokenAuth } from "../../MiddleWare/verifyTokenAuth.js";
import { createExam, getExamById, getExam  ,deleteExamById } from "../Exams/exam.controller.js"; 

const examRoute = express.Router();

examRoute.post('/create',verifyTokenAuth, createExam);
examRoute.get('/getExam/:id',verifyTokenAuth, getExamById);
examRoute.get('/getAllExams',verifyTokenAuth, getExam);
examRoute.delete('/delete/:id',verifyTokenAuth, deleteExamById);
export default examRoute;  