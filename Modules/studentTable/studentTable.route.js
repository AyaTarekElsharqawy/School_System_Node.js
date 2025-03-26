import express from "express";
import { verifyTokenAuth } from "../../MiddleWare/verifyTokenAuth.js";
import {
    getStudents,
    createStudent,
    uploadSingleImage,
    getStudentByQuery,
    updateStudentById,
    deleteStudentById
} from "./studentTable.controller.js";

const StudentRoute = express.Router();

StudentRoute.get("/getAllStudents", getStudents);
StudentRoute.post("/create", uploadSingleImage, createStudent);
StudentRoute.get("/getStudent", verifyTokenAuth, getStudentByQuery);
StudentRoute.put("/update/:id", uploadSingleImage, verifyTokenAuth, updateStudentById);
StudentRoute.delete("/delete/:id", verifyTokenAuth, deleteStudentById);

export default StudentRoute;
