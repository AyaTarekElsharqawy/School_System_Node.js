import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  subject: String,
  name: String,
  date: Date,
  time: String,
  questions: String,
  class: String,
  examType: String,
  duration: Number,
  createdBy: mongoose.Schema.Types.ObjectId
});

export const Exam = mongoose.model('Exam', examSchema);
 export default Exam;