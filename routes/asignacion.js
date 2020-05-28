const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/asignacion");

router.get("/asignar", (req, res) => {
  _controlador.consultarAsignaciones().then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({ ok: true, info: registros, mensaje: "Asignaciones consultados" });
    }).catch(error => {
      res.send(error);
    });
});

router.get("/asignar/:id", (req, res) => {

  let id = req.params.id;
  _controlador.consultarAsignacionesMec(id).then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({ ok: true, info: registros, mensaje: "Asignaciones consultadas con id" });
    }).catch(error => {
      res.send(error);
    });
});

router.post("/asignar", (req, res) => {
  try {
    let asignacion = req.body;
    _controlador.guardarUsuario(asignacion).then(respuestaDB => {
      res.send({ok: true, mensaje: "Asignacion registrado", info: usuario});
    }).catch(error => {
      res.send(error.response);
    });
  } catch (error) {
    res.send(error);
  }
});

/**
 * Eliminar un usuario
 */
router.delete("/asignar/:id", (req, res) => {
    let id = req.params.id;
    _controlador
      .eliminarAsignacion(id)
      .then((respuestaDB) => {
        res.send({ ok: true, info: {}, mensaje: "Usuario eliminado correctamente" });
      })
      .catch((error) => {
        res.send(" Ocurrió un error: "+ error);
      });
  });

/**
 * Modificar un usuario
 */
router.put("/asignar/:id", (req, res) => {
    let documento = req.params.id;
    let body = req.body;
    console.log(body);
    _controlador
      .modificarAsignacion(body, documento)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Asignacion ha sido modificado correctamente", info: respuestaDB });
      })
      .catch((error) => {
        res.send(error);
      });
  });

module.exports = router;