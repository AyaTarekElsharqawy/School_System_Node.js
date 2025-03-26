import dotenv from "dotenv";
dotenv.config();
import express from "express";
import myConnection from "./Database/dbconnection.js";
import customerRoute from './Modules/User/user.route.js';
import ProductRoute from './Modules/Product/product.route.js';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true, // ✅ دعم الكوكيز والتوكنات
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use( customerRoute);
app.use('/product', ProductRoute);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "images")));

myConnection;

const PORT = process.env.PORT || 3030;
app.listen(3030, function(){
    console.log("Server is running on port 3030");
});