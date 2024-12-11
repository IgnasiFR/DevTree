import { Router } from "express";
import User from "./models/User";

const router = Router()

//Routing
router.get("/", (req, res) => {
    res.send("Hola Mundo en Express / TypeScript");
  });

// Authentication y registro
router.post("/auth/register", async (req,res) => {
    await User.create(req.body)
})

export default router       