import express from "express";
import { verifyTokenAuth } from "../../MiddleWare/verifyTokenAuth.js";
import { 
    getTeachers, 
    createTeacher, 
    uploadSingleImage,  
    getTeacherByQuery, 
    updateTeacherById, 
    deleteTeacherById 
} from "./teacherTable.controller.js"; 

const TeacherRoute = express.Router();

TeacherRoute.get("/getAllTeachers",getTeachers);
TeacherRoute.post("/create",uploadSingleImage, verifyTokenAuth, createTeacher);
TeacherRoute.get("/getTeacher", verifyTokenAuth, getTeacherByQuery);
TeacherRoute.put("/update/:id", verifyTokenAuth, uploadSingleImage, updateTeacherById);
TeacherRoute.delete("/delete/:id", verifyTokenAuth, deleteTeacherById);

export default TeacherRoute;
