import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import { catchError } from "../../MiddleWare/catchError.js";
import Exam from "../../Database/Models/exams.model.js"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const getExam = catchError(async (req, res) => {
    const exams = await Exam.find();
    res.status(200).json(exams);
});
export const chatWith = catchError(async (req, res) => {
    const { prompt: userQuestion } = req.body;

    if (!userQuestion) {
        return res.status(400).json({ error: "Prompt is required." });
    }

    const allowedTopics = [
        "جدول", "أنشطة", "رسوم", "تسجيل", "مناهج", "فعاليات", "تواصل", "امتحانات","مرحبا","شكرا",
        "schedule", "activities", "fees", "registration", "curriculum", "events", "contact", "exams"
    ];

    const isQuestionAllowed = allowedTopics.some(topic => userQuestion.toLowerCase().includes(topic.toLowerCase()));

    if (!isQuestionAllowed) {
        return res.json({ reply: "عذرًا، هذا السؤال خارج نطاق مساعدتي." });
    }

    const isArabic = /[\u0600-\u06FF]/.test(userQuestion);

    let context = isArabic ? `
        أنت مساعد افتراضي لموقع حضانة. يرجى الإجابة فقط على الأسئلة المتعلقة بالحضانة.
        معلومات الحضانة:
        1. لدينا برامج تعليمية متنوعة للأطفال من سن 2 إلى 5 سنوات.
        2. نقدم أنشطة ترفيهية وتعليمية يومية.
        3. رسوم التسجيل تختلف حسب البرنامج والفئة العمرية.
        4. يمكن التسجيل عبر الموقع أو بزيارة الحضانة.
        5. لدينا فعاليات شهرية مثل أيام مفتوحة واحتفالات.
        6. يمكن التواصل مع إدارة الحضانة عبر البريد الإلكتروني أو الهاتف.
        7. الجدول اليومي يتضمن وقت للعب والتعلم والوجبات.
        8.مرحبا بك في روضه الفرقان عن ماذا تود ان تسأل 
        9. العفو انا هنا لاجابتك على اي اساله خاصه بموقعنا
    ` : `
        You are a virtual assistant for a nursery website. Please answer only questions related to the nursery.
        Nursery Information:
        1. We have various educational programs for children aged 2 to 5 years.
        2. We offer daily recreational and educational activities.
        3. Registration fees vary depending on the program and age group.
        4. Registration can be done through the website or by visiting the nursery.
        5. We have monthly events such as open days and celebrations.
        6. You can contact the nursery administration via email or phone.
        7. The daily schedule includes time for play, learning, and meals.
    `;

    if (userQuestion.toLowerCase().includes("امتحانات") || userQuestion.toLowerCase().includes("exams")) {
        const exams = await getExams();
        context += isArabic ? ` الامتحانات المتاحة: ${JSON.stringify(exams)}` : ` Available exams: ${JSON.stringify(exams)}`;
    }

    const prompt = `${context} Question: ${userQuestion}`;
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    if (!result.response || !result.response.candidates || result.response.candidates.length === 0) {
        return res.status(500).json({ error: "No response from the model." });
    }

    const response = result.response.candidates[0].content;

    res.json({ reply: response });
});
