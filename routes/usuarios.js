const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/usuarios");

router.get("/usuarios", (req, res) => {
  _controlador.consultarUsuario().then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({ ok: true, info: registros, mensaje: "Usuarios consultados" });
    }).catch(error => {
      res.send(error);
    });
});

router.get("/usuarios/rol/:id", (req, res) => {

  let id = req.params.id;
  _controlador.consultarRolusuario(id).then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({ ok: true, info: registros, mensaje: "Rol de usuario consultado" });
    }).catch(error => {
      res.send(error);
    });
});

router.post("/usuarios", (req, res) => {
  try {
    let usuario = req.body;
    _controlador.guardarUsuario(usuario).then(respuestaDB => {
      res.send({ok: true, mensaje: "Usuario registrado", info: usuario});
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
router.delete("/usuarios/:id", (req, res) => {
    let id = req.params.id;
    _controlador
      .eliminarUsuario(id)
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
router.put("/usuarios/:id", (req, res) => {
    let documento = req.params.id;
    let body = req.body;
    console.log(body);
    _controlador
      .modificarUsuario(body, documento)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "El usuario ha sido modificado correctamente", info: respuestaDB });
      })
      .catch((error) => {
        res.send(error);
      });
  });

module.exports = router;