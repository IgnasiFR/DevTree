import express from "express";

const app = express();

//Routing
app.get("/", (req, res) => {
  res.send("Hola Mundo en Express");
});

//Establecemos el puerto para el arranque
const port = process.env.PORT || 4000; // utilizamos la variable de entorno llamada puerto  o 4000 ( es para de cara el deploy al proveedor del host)

app.listen(port, () => {
  console.log("Servidor funcionando en el puerto:", port);
});
