
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import myConnection from "./Database/dbconnection.js";
import customerRoute from './Modules/User/user.route.js';
import ProductRoute from './Modules/Product/product.route.js';
import studentRoutes from "./Modules/Student/student.route.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(customerRoute);
app.use('/product', ProductRoute);
app.use("/students", studentRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "images")));

myConnection;
const PORT = process.env.PORT || 3030;
app.listen(3030, function(){
  console.log("Server is running on port 3030");
});
