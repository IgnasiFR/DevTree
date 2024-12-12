import User from "../models/User"
import { hashPassword } from "../utils/auth"


export const createAccount = async (req, res) => {

    const {email, password} = req.body
    const userExists = await User.findOne({email})
    if (userExists) {
        const error = new Error('El usuario ya está registrado')
        return res.status(409).json({error: error.message}) // status() lo que hace es pasarle el error al cliente como respuesta

    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    
    await user.save()
    res.status(201).send('Registro Creado Correctamente')
}

