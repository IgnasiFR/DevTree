import { CorsOptions } from 'cors';

export const corsConfing: CorsOptions = {
    origin: function (origin, callback) {
        const whiteList = [process.env.FRONTEND_URL];

        if (process.argv[2] === '--api') {
            whiteList.push(undefined);
        }

        if (!origin) {
            // Permitir solicitudes sin encabezado 'origin' (e.g., desde Postman)
            return callback(null, true);
        }

        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'));
        }
    }
};
