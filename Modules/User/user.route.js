import express from 'express';
// import passport from "passport";
import { signUp ,login,updateUserDetails, verifyEmail ,deleteUser,getAllUsers,getUserById} from '../User/user.controller.js';
import { EmailCheck } from '../../MiddleWare/EmailChecked.js';
import { validateUser , validateData } from "../../MiddleWare/validationUser.js";
import { verifyTokenAuth } from '../../MiddleWare/verifyTokenAuth.js';
import { isAdmin } from '../../MiddleWare/checkRole.js';
import { addAdmin } from '../User/user.controller.js';

const userRoute = express.Router();

userRoute.post('/signUp',validateUser,EmailCheck, signUp);
userRoute.post("/addAdmin", addAdmin);
userRoute.post('/login', login);
userRoute.put('/updateUserDetails',verifyTokenAuth,validateData,EmailCheck,updateUserDetails);
userRoute.delete('/deleteUser/:id',verifyTokenAuth, isAdmin, deleteUser);
userRoute.get("/verify/:email", verifyEmail)


// userRoute.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// userRoute.get(
//     "/auth/google/callback",
//     passport.authenticate("google", { session: false }),
//     (req, res) => {
//         if (!req.user) {
//             return res.status(401).json({ message: "Google authentication failed" });
//         }
//         const { user, token } = req.user;
//         res.json({ message: `Welcome ${user.name}`, token });
//     }
// );

// userRoute.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

// userRoute.get(
//     "/auth/facebook/callback",
//     passport.authenticate("facebook", { session: false}),
    
//     (req, res) => {
//         if (!req.user) {
//             return res.status(401).json({ message: "FaceBook authentication failed" });
//         }
//         const { user, token } = req.user;
//         res.json({ message: `Welcome ${user.name}`, token });
//     }
// );

userRoute.get("/all", verifyTokenAuth,isAdmin, getAllUsers);
userRoute.get("/:id", verifyTokenAuth,isAdmin, getUserById);
export default userRoute;