//importar el servicion de postgres
const servicioPg = require('../services/postgres')
let _servicio = new servicioPg()

let validarAsignacion = (asignacion) => {
    if (!asignacion) {
        throw {ok: false, mensaje: "La info de la asignacion es obligatoria"}
    }

    if (!asignacion.id_mecanico) {
        throw {ok: false, mensaje: "El id del mecanico de la asignacion es obligatorio"}
    }

    if (!asignacion.placa) {
        throw {ok: false, mensaje: "La placa de la asignacion es obligatoria"}
    }
}


let guardarAsignacion = async (asignacion)=> {
    try {
        let sql = `INSERT INTO public.mantenimientos(
            id_mecanico, placa, fecha)
            VALUES (
            '${asignacion.id_mecanico}',
            '${asignacion.placa}',
            '${asignacion.fecha}'
            );`;
            
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false };
    }
}

let consultarAsignaciones = async () => {
    try {
        let sql = `SELECT * from public.mantenimientos`;
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false, error: error };
    }
}

let consultarAsignacionesMec = async (mecanico_id) => {
    try {
        let sql = `SELECT * from public.mantenimientos WHERE id_mecanico='${mecanico_id}'`;
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false, error: error };
    }
}

let eliminarAsignacion = async (asignacion) => {
  try {
      let _servicio = new servicioPg();
      let sql = `DELETE FROM public.mantenimientos
       WHERE placa ='${asignacion.placa}' AND fecha = '${asignacion.fecha}' AND id_mecanico = '${asignacion.id_mecanico}'`;
       console.log(sql);
      let respuesta = await _servicio.ejecutarSql(sql);
      return respuesta;
    } catch (error) {
        throw{ok: false, error: error };
    }
  };
  let modificarAsignacion = async (asignacion, documento) => {
    if (asignacion.id_mecanico != documento) {
      throw {
        ok: false,
        mensaje: "El documento del usuario no corresponde al enviado.",
      };
    }
    try{
        let sql = `UPDATE public.mantenimientos
        SET id_mecanico='${asignacion.id_mecanico}', placa='${asignacion.placa}', fecha='${asignacion.fecha}', trabajos_realizados='${asignacion.trabajos_realizados}', horas_invertidas='${asignacion.horas_invertidas}'
        WHERE id_mecanico='${asignacion.id_mecanico}' AND placa='${asignacion.placa}';`;

        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;

    } catch(error) {
        throw{ok: false, error: error}
    }
  };

  module.exports = {validarAsignacion, consultarAsignacionesMec, guardarAsignacion, consultarAsignaciones, eliminarAsignacion, modificarAsignacion};