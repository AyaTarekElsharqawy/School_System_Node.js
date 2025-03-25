import express from "express";
import { verifyToken } from "../../MiddleWare/verifyToken.js";
import { isAdmin } from "../../MiddleWare/checkRole.js";

import { addStudent, getStudents, getStudentById, updateStudent, deleteStudent } from "./student.controller.js";

const router = express.Router();

router.post("/add", verifyToken, isAdmin, addStudent); // ✅ الأدمن فقط يضيف طالب جديد
router.get("/getStudents", getStudents);


router.get("/:id", verifyToken, isAdmin, getStudentById); // 🔐 الأدمن فقط يقدر يشوف بيانات طالب معين
router.put("/:id", verifyToken, isAdmin, updateStudent); // 🔐 الأدمن فقط يقدر يعدّل بيانات طالب
router.delete("/:id", verifyToken, isAdmin, deleteStudent);
export default router;
