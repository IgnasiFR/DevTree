import express from "express";
import 'dotenv/config'
import router from "./router";
import { connectDB } from "./config/db"

const app = express();

//conexion base de datos MongoDB
connectDB()

// Leer datos de los formularios
app.use(express.json())


app.use('/', router)

export default app