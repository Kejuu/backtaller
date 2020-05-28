const express = require("express");
const cors = require("cors");

//inicializando la libreria
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API Taller de motos");
  });


const rutas_login = require("./routes/login");
app.use(rutas_login);

const rutas_usuarios = require("./routes/usuarios");
app.use(rutas_usuarios);

const rutas_motos = require("./routes/motos");
app.use(rutas_motos);

const rutas_asignacion = require("./routes/asignacion");
app.use(rutas_asignacion);

const port = process.env.PORT || 3001;
  // Levantar el servidor para escuchar los puertos
  app.listen(port, () => {
    console.log(`Escuchando API en http://localhost:${port}`);
  });