import mongoose from "mongoose";  // ✅ تأكدي أن الاستيراد موجود

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    studentClass: { type: String, required: true }, // تغيير الاسم
    guardianPhone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    image: { 
        type: String, 
        default: "http://localhost:3030/images/default.png"
    }
});

const Student = mongoose.model("Student", studentSchema);
export default Student;



