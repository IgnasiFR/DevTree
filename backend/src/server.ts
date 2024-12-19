import express from "express";
import cors from 'cors'
import 'dotenv/config'
import router from "./router";
import { connectDB } from "./config/db"
import { corsConfing } from "./config/cors";


//conexion base de datos MongoDB
connectDB()

const app = express();

// Cors
app.use(cors(corsConfing))

// Leer datos de los formularios
app.use(express.json())


app.use('/', router)

export default app