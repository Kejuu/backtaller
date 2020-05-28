//importar el servicion de postgres
const servicioPg = require('../services/postgres')
let servicio = new servicioPg();

let validarUsuario = (usuario) => {
    if (!usuario) {
        throw {ok: false, mensaje: "La info del usuario es obligatoria"}
    }

    if (!usuario.tipo_documento) {
        throw {ok: false, mensaje: "El documento es obligatorio"}
    }

    if (!usuario.documento) {
        throw {ok: false, mensaje: "el documento es obligatorio"}
    }

    if (!usuario.nombre) {
        throw {ok: false, mensaje: "El nombre es obligatorio"}
    }

    if (!usuario.apellidos) {
        throw {ok: false, mensaje: "los apellidos son obligatorios"}
    }

    if (!usuario.celular) {
        throw {ok: false, mensaje: "El celular es obligatorio"}
    }

    if (!usuario.correo) {
        throw {ok: false, mensaje: "El correo es obligatorio"}
    }

    if (!usuario.clave) {
        throw {ok: false, mensaje: "La clave es obligatoria"}
    }
}

let guardarUsuario = async (usuario)=> {
    try {
        let sql = `INSERT INTO public.usuarios(
            tipo_documento, documento, nombre, apellidos, celular, correo, rol, clave)
        VALUES ('${usuario.tipo_documento}',
            '${usuario.documento}',
            '${usuario.nombre}',
            '${usuario.apellidos}',
            '${usuario.celular}',
            '${usuario.correo}',
            '${usuario.rol}',
            md5('${usuario.clave}'));`;
        let respuesta = await servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false};
    }
}

let consultarRol = async (id) => {
    try {
        let sql = `SELECT rol from usuarios WHERE id = '${id}'`;
        let respuesta = await servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false, error: error };
    }
}

let consultarUsuario = async () => {
    try {
        let sql = `SELECT * from usuarios`;
        let respuesta = await servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {

        throw{ok: false, error: error };
    }
}

let eliminarUsuario = async (id) => {
    try {
      let sql = `DELETE FROM public.usuarios WHERE documento ='${id}'`;
      let respuesta = await servicio.ejecutarSql(sql);
      return respuesta;
    } catch (error) {
      throw { ok: false , error:error};
    }
  };

  let modificarUsuario = async (usuario, documento) => {
    if (usuario.documento != documento) {
      throw {
        ok: false,
        mensaje: "El documento del usuario no corresponde al enviado.",
      };
    }
    try{
        let sql = `UPDATE public.usuarios
        SET tipo_documento='${usuario.tipo_documento}', documento='${usuario.documento}', nombre='${usuario.nombre}', apellidos='${usuario.apellidos}', celular='${usuario.celular}', correo='${usuario.correo}', rol='${usuario.rol}', clave=md5('${usuario.clave}') WHERE documento ='${documento}';`;

        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;

    } catch(error) {
        throw{ok: false, error: error}
    }
  };

module.exports = {modificarUsuario, guardarUsuario,consultarUsuario, consultarRol, validarUsuario, eliminarUsuario};