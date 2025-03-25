import Student from "../../Database/Models/student.model.js";


// ✅ إضافة طالب جديد
export const addStudent = async (req, res) => {
    try {
        const { name, age, studentClass, guardianPhone, whatsapp, image } = req.body;

        // إذا لم يرفع المستخدم صورة، استخدم الصورة الافتراضية
        const studentImage = image || "http://localhost:3030/images/default.png";

        const newStudent = new Student({
            name,
            age,
            studentClass,
            guardianPhone,
            whatsapp,
            image: studentImage
        });

        await newStudent.save();
        res.status(201).json({ message: "تم إضافة الطالب بنجاح", student: newStudent });

    } catch (error) {
        res.status(400).json({ message: "خطأ أثناء الإضافة", error: error.message });
    }
};



// ✅ جلب جميع الطلاب
export const getStudents = async (req, res) => {
    try {
        console.log("تم استدعاء getStudents");
        const students = await Student.find();
        console.log("الطلاب:", students);
        res.status(200).json(students);
    } catch (error) {
        console.error("خطأ أثناء جلب البيانات:", error);
        res.status(500).json({ message: "خطأ في جلب البيانات", error: error.message });
    }
};


// ✅ جلب طالب واحد عبر الـ ID
export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "الطالب غير موجود" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "خطأ أثناء جلب الطالب", error: error.message });
    }
};

// ✅ تحديث بيانات الطالب
export const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: "الطالب غير موجود" });
        }
        res.status(200).json({ message: "تم تحديث بيانات الطالب بنجاح", student: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: "خطأ أثناء التحديث", error: error.message });
    }
};

// ✅ حذف طالب
export const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "الطالب غير موجود" });
        }
        res.status(200).json({ message: "تم حذف الطالب بنجاح" });
    } catch (error) {
        res.status(500).json({ message: "خطأ أثناء الحذف", error: error.message });
    }
};
