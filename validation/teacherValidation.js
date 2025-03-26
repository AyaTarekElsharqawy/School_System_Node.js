import Joi from "joi";

const TeacherSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().min(18).required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    degree: Joi.string().required(),   
      subject: Joi.string().required(),
    image: Joi.string().optional()
});

const TeacherUpdateSchema = Joi.object({
    name: Joi.string().optional(),
    age: Joi.number().min(18).optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional(),
    degree: Joi.string().required(),   
      subject: Joi.string().optional(),
    image: Joi.string().optional()
});

export { TeacherSchema, TeacherUpdateSchema };
