// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res,next)=>{
//     const token = req.headers["token"];
//     if (!token) {
//        return res.status(403).json({ message: "Access denied. No token provided." });
//     }
//     jwt.verify(token,process.env.JWT_SECRET,async (err, decoded)=>{
//         if(err){
//             res.status(401).json({message: "invalid credits"});
//         }else{
//             req.user = decoded;
//             next();
//         }
//     });
// }


import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // استخراج التوكن من الهيدر
    console.log("Received Token:", token); // ✅ طباعة التوكن في التيرمنال

    if (!token) {
        return res.status(401).json({ message: "Unauthorized. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden. Invalid token." });
        }
        req.user = decoded;
        next();
    });
};



