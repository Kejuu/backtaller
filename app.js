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

  const port = 4000;
  app.listen(port, () => {
    console.log(`Escuchando API en http://localhost:${port}`);
  }); 