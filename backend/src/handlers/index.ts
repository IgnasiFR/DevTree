import User from "../models/User"
import { hashPassword, checkPassword } from "../utils/auth"
import {validationResult} from 'express-validator'
import { generateJWT } from "../utils/jwt";



export const createAccount = async (req, res) => {
    try {

        const { email, password, handle } = req.body;

        // Check if email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            const error = new Error('El usuario con ese mail ya esta registrado');
            return res.status(409).json({ error: error.message });
        }

        // Dynamically import the slug library
        const slug = await import('slug');

        // Slugify the handle
        const formattedHandle = slug.default(handle);

        // Check if the slugified handle already exists
        const handleExists = await User.findOne({ handle: formattedHandle });
        if (handleExists) {
            const error = new Error('Nombre de usuario ya registrado');
            return res.status(409).json({ error: error.message });
        }

        // Create and save the user
        const user = new User(req.body);
        user.handle = formattedHandle; // Save slugified handle
        user.password = await hashPassword(password);
        await user.save();

        res.status(201).json({ message: 'Usuario creado correctamente' });

    } catch (err) {
        if (err.code === 11000) {
            // Handle MongoDB duplicate key error
            return res.status(409).json({
                error: `Duplicate key error: ${JSON.stringify(err.keyValue)}`,
            });
        }
        console.error('Error creating account:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const login = async (req, res) => {
    
     // Comprobar si el usuario existe
     const { email, password } = req.body;

     const user = await User.findOne({ email });
     if (!user) {
         const error = new Error('El usuario no existe');
         return res.status(404).json({ error: error.message });
     }

     // comprobar el password si el usuario existe
     const isPasswordCorrect  = await checkPassword(password, user.password)
     if (!isPasswordCorrect) {
        const error = new Error('Contraseña incorrecta');
        return res.status(401).json({ error: error.message }); // 401 indica que no esta autorizado para ese recurso.
    }

    const token = generateJWT({id:user._id})
    res.send(token)

}

export const getUser = async(req,res) =>{
  res.json(req.user)
}

export const updateProfile = async(req,res) =>{
    try {
        const slug = await import('slug');
        const {handle, description} = req.body
        const formattedHandle = slug.default(handle);
        const handleExists = await User.findOne({ handle: formattedHandle });
        if (handleExists && handleExists.email !== req.user.email) {
            const error = new Error('Nombre de usuario ya registrado');
            return res.status(409).json({ error: error.message });
        }
        req.user.description = description
        req.user.handle = handle
        await req.user.save()
        res.send('Perfil actualizado correctamente')
    
    } catch (e) {
        const error = new Error('Hubo un error')
        return res.status(500).json({error: error.message})
    }
  }
