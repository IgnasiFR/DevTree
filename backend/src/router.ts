import { Router } from "express";
import { body } from 'express-validator'
import  { createAccount, getUser, login }  from "./handlers";
import {handleInputErrors} from "./middleware/validation"
import { authenticate } from "./middleware/auth";

const router = Router()

// Authentication y registro
router.post("/auth/register", 
    body('handle').notEmpty().withMessage('Este campo no puede estar vacio'),
    body('name').notEmpty().withMessage('Este campo no puede estar vacio'),
    body('email').isEmail().withMessage('El email no es válido, proprciona un email válido'),
    body('password').isLength({min: 8}).withMessage('Tienes que establecer una contraseña de mínimo 8 carácteres'),
    handleInputErrors,
    createAccount)


router.post("/auth/login",
    body('email').isEmail().withMessage('El email no es válido, proprciona un email válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    handleInputErrors,
    login)


router.get('/user', authenticate, getUser)

export default router       