import jwt from 'jsonwebtoken';
import User from '../models/User';

export const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return res.status(401).json({ error: 'No autorizado' });
    }

    const [, token] = bearer.split(' ');

    if (!token) {
        return res.status(401).json({ error: 'No autorizado' });
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof result === 'object' && result.id) {
            const user = await User.findById(result.id).select('name handle email description');
            if (!user) {
                return res.status(404).json({ error: 'El usuario no existe' });
            }

            req.user = user;
            next();
        } else {
            return res.status(401).json({ error: 'Token no válido' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Token no válido' });
    }
};
