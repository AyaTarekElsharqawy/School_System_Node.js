import Exam from '../../Database/Models/exams.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrateExams = async (migrationOptions = {}) => {
    const rawData = fs.readFileSync(path.join(__dirname, '../../TeacherData.json'));
    const data = JSON.parse(rawData);

    const examsToMigrate = data.exams.map(exam => ({
      subject: exam.subject,
      name: `اختبار ${exam.type} - ${exam.subject}`,
      date: new Date(),
      time: exam.time,
      questions: 'أسئلة افتراضية:\n1. سؤال 1\n2. سؤال 2',
      class: 'Kg-1',
      examType: exam.type,
      duration: 60,
      createdBy: null
    }));

    if (migrationOptions.clearBeforeImport) {
      await Exam.deleteMany({});
    const result = await Exam.insertMany(examsToMigrate);
    return result;
  } 
};
export default migrateExams;