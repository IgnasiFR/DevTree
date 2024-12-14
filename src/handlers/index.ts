import User from "../models/User"
import { hashPassword } from "../utils/auth"
import {validationResult} from 'express-validator'


export const createAccount = async (req, res) => {
    try {

        //manejar errores 
        let errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})

        }
        
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


