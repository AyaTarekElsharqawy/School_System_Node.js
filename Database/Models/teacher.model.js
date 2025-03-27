import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters']
    },
    age: { 
        type: Number, 
        required: [true, 'Age is required'],
        min: [18, 'Age must be at least 18'],
        max: [70, 'Age must be less than 70']
    },
    phone: { 
        type: String, 
        unique: true,
        match: [/^01[0-9]{9}$/, 'Please enter a valid Egyptian phone number']
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    degree: { 
        type: String, 
        required: [true, 'degree is required'] 
    },
    subject: { 
        type: String, 
        required: [true, 'Subject is required'] 
    },
    image: { 
        type: String,
        default: null
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        // required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Middleware للتحقق من التكرار قبل الحفظ
teacherSchema.pre('save', async function(next) {
    const teacher = this;
    
    // التحقق من تكرار البريد الإلكتروني
    const existingEmail = await mongoose.model('Teacher').findOne({ email: teacher.email });
    if (existingEmail && existingEmail._id.toString() !== teacher._id.toString()) {
        throw new Error('Email already exists');
    }
    
    // التحقق من تكرار رقم الهاتف
    const existingPhone = await mongoose.model('Teacher').findOne({ phone: teacher.phone });
    if (existingPhone && existingPhone._id.toString() !== teacher._id.toString()) {
        throw new Error('Phone number already exists');
    }
    
    next();
});

const teacherModel = mongoose.model("Teacher", teacherSchema);
export { teacherModel };