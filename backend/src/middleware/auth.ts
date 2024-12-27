import jwt from 'jsonwebtoken'
import User from '../models/User'

export const authenticate = async (req, res, next) =>{
    const bearer = req.headers.authorization

    if (!bearer) {
        const error = new Error('No autorizado')
        return res.status(401).json({error: error.message})
    }
    const [, token] = bearer.split(' ')
    
    if(!token){
        const error = new Error('No autorizado')
        return res.status(401).json({error: error.message})
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if(typeof result === 'object' && result.id){
            const user = await User.findById(result.id).select('name handle email')
            if(!user) {
                const error = new Error('El usuario no existe')
                return res.status(404).json({error: error.message})
            }
            req.user = user
            next()
        }
        
    } catch (error) {
        res.status(500).json({error: 'Toke no Válido'})
        
    }

}