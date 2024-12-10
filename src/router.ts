import { Router } from "express";

const router = Router()

//Routing
router.get("/", (req, res) => {
    res.send("Hola Mundo en Express / TypeScript");
  });

// Authentication y registro
router.post("/auth/register", (req,res) => {
    console.log(req.body)


})

export default router       