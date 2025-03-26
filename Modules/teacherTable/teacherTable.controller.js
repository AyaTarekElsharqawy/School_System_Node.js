import { teacherModel } from "../../Database/Models/teacher.model.js";
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
    limits: { 
      fileSize: 10 * 1024 * 1024, 
      files: 1,
      fields: 20 
    },
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

export const createTeacher = async (req, res) => {
    try {
      if (!req.body.name || !req.body.email || !req.body.subject) {
        return res.status(400).json({ 
          success: false,
          message: 'الاسم والبريد الإلكتروني والمادة مطلوبة'
        });
      }
  
      const existingTeacher = await teacherModel.findOne({ email: req.body.email });
      if (existingTeacher) {
        return res.status(400).json({
          success: false,
          message: 'البريد الإلكتروني مسجل مسبقاً'
        });
      }
  
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  
      const newTeacher = await teacherModel.create({
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        email: req.body.email,
        specialization: req.body.degree,
        subject: req.body.subject,
        image: imagePath,
        createdBy: req.user?.id
      });
  
      res.status(201).json({
        success: true,
        data: newTeacher
      });
    } catch (error) {
      console.error('خطأ في الخادم:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
export const getTeachers = catchError(async (req, res) => {
    const allTeachers = await teacherModel.find();
    res.status(200).json(allTeachers);
  });

export const getTeacherByQuery = catchError(async (req, res) => {
    const { name, specialization, subject } = req.query;
    let query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (specialization) query.specialization = specialization;
    if (subject) query.subject = subject;

    const teachers = await teacherModel.find(query);
    res.status(200).json({
        success: true,
        count: teachers.length,
        data: teachers
    });
});

export const updateTeacherById = catchError(async (req, res) => {
    const teacherId = req.params.id;
    let teacher = await teacherModel.findById(teacherId);

    if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
    }

    const { name, age, phone, email, subject } = req.body;
    const specialization = req.body.degree;
    const index = this.teacher.findIndex(t => t.id === updatedTeacher.id);
    if (index !== -1) {
      this.teacher[index] = updatedTeacher;
    }
    const updateData = {
        name,
        age,
        phone,
        email,
        specialization,
        subject
    };

    if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedTeacher = await teacherModel.findByIdAndUpdate(
        teacherId, 
        updateData, 
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        data: updatedTeacher
    });
});

export const deleteTeacherById = catchError(async (req, res) => {
    const teacherId = req.params.id;
    const teacher = await teacherModel.findById(teacherId);

    if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
    }

    await teacherModel.findByIdAndDelete(teacherId);
    res.json({ 
        success: true,
        message: "Teacher deleted successfully" 
    });
});