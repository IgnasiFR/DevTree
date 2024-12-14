import colors from 'colors'
import server from './server'


//Establecemos el puerto para el arranque
const port = process.env.PORT || 4000; // utilizamos la variable de entorno llamada puerto  o 4000 ( es para de cara el deploy al proveedor del host)

server.listen(port, () => {
  console.log(colors.blue.italic.bold(`Servidor funcionando en el puerto: ${port}`));
});
