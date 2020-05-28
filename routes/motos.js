const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/motos");

router.get("/motos", (req, res) => {
  _controlador.consultarMoto().then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({ ok: true, info: registros, mensaje: "Motos consultados" });
    }).catch(error => {
      res.send(error);
    });
});

router.post("/motos", (req, res) => {
  try {
    let moto = req.body;
    _controlador.guardarMoto(moto).then(respuestaDB => {
      res.send({ok: true, mensaje: "Moto registrado", info: moto});
    }).catch(error => {
      res.send(error.response);
    });
  } catch (error) {
    res.send(error);
  }
});


/**
 * Modificar un usuario
 */
router.put("/motos/:id", (req, res) => {
    let placa = req.params.id;
    let body = req.body;
    console.log(body);
    _controlador
      .modificarMoto(body, placa)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "La moto ha sido modificado correctamente", info: respuestaDB });
      })
      .catch((error) => {
        res.send(error);
      });
  });

module.exports = router;