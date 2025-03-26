import { catchError } from "../../MiddleWare/catchError.js";
import  Exam  from "../../Database/Models/exams.model.js";


export const createExam = catchError(async (req, res) => {
    const newExam = new Exam(req.body);
    await newExam.save();
    res.status(201).json({ message: '✅ Exam added successfully', newExam });
});
export const getExamById = catchError(async (req, res) => {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json({ exam });
});
export const getExam = catchError(async (req, res) => {
    const exams = await Exam.find();
    res.status(200).json(exams);
});
export const deleteExamById = catchError(async (req, res) => {
    await Exam.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Exam deleted successfully' });
});
