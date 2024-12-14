import { Router } from "express";
import { body } from 'express-validator'
import  { createAccount }  from "./handlers";

const router = Router()

// Authentication y registro
router.post("/auth/register", 
    body('handle').notEmpty().withMessage('Este campo no puede estar vacio'),
    body('name').notEmpty().withMessage('Este campo no puede estar vacio'),
    body('email').isEmail().withMessage('El email no es válido, proprciona un email válido'),
    body('password').isLength({min: 8}).withMessage('Tienes que establecer una contraseña de mínimo 8 carácteres'),
    createAccount)

export default router       