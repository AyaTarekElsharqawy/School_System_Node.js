import migrateExams  from "../service/migration.service.js";
// import {catchError} from "../../MiddleWare/catchError.js";

export const migrate = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    
    const result = await migrateExams(req.body); // تمرير options من الطلب
    
    res.status(201).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    console.error('Migration Error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Invalid request data'
    });
  }
};
export default { migrate };