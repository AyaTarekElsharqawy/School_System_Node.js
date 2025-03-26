import Student from "../../Database/Models/student.model.js"; 
import { catchError } from "../../MiddleWare/catchError.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024, files: 1, fields: 20 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed (jpeg, jpg, png, webp)'));
    }
}).single("image");

export const uploadSingleImage = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

export const createStudent = async (req, res) => {
    try {
        if (!req.body.name || !req.body.studentClass || !req.body.guardianPhone) {
            return res.status(400).json({
                success: false,
                message: 'الاسم، الصف الدراسي، ورقم ولي الأمر مطلوبة'
            });
        }

        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const newStudent = await Student.create({  
            name: req.body.name,
            age: req.body.age,
            studentClass: req.body.studentClass,
            guardianPhone: req.body.guardianPhone,
            whatsapp: req.body.whatsapp,
            image: imagePath
        });

        res.status(201).json({
            success: true,
            data: newStudent
        });
    } catch (error) {
        console.error('خطأ في الخادم:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getStudents = catchError(async (req, res) => {
    const allStudents = await Student.find(); 
    res.status(200).json(allStudents);
});

export const getStudentByQuery = catchError(async (req, res) => {
    const { name, studentClass } = req.query;
    let query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (studentClass) query.studentClass = studentClass;

    const students = await Student.find(query);
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});

export const updateStudentById = catchError(async (req, res) => {
    const studentId = req.params.id;
    const student = await Student.findById(studentId); 

    if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    const updateData = {
        name: req.body.name || student.name,
        age: req.body.age || student.age,
        studentClass: req.body.studentClass || student.studentClass,
        guardianPhone: req.body.guardianPhone || student.guardianPhone,
        whatsapp: req.body.whatsapp || student.whatsapp
    };

    if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, { new: true, runValidators: true }); // ✅ استبدال studentModel بـ Student

    res.json({
        success: true,
        data: updatedStudent
    });
});

export const deleteStudentById = catchError(async (req, res) => {
    const studentId = req.params.id;
    const student = await Student.findById(studentId); 

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    await Student.findByIdAndDelete(studentId);
    res.json({
        success: true,
        message: "Student deleted successfully"
    });
});
