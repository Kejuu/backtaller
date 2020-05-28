//importar el servicion de postgres
const servicioPg = require('../services/postgres')
let servicio = new servicioPg();

let validarMoto = (moto) => {
    if (!moto) {
        throw {ok: false, mensaje: "La info de la Moto es obligatoria"}
    }

    if (!moto.placa) {
        throw {ok: false, mensaje: "La placa es obligatorio"}
    }

    if (!moto.estado) {
        throw {ok: false, mensaje: "el estado es obligatorio"}
    }

    if (!moto.clase) {
        throw {ok: false, mensaje: "la clase es obligatorio"}
    }

    if (!moto.marca) {
        throw {ok: false, mensaje: "la marca son obligatorios"}
    }

    if (!moto.modelo) {
        throw {ok: false, mensaje: "El modelo es obligatorio"}
    }

    if (!moto.color) {
        throw {ok: false, mensaje: "El color es obligatorio"}
    }

    if (!moto.cilindraje) {
        throw {ok: false, mensaje: "El cilindraje es obligatorio"}
    }

    if (!moto.id_propietario) {
        throw {ok: false, mensaje: "La cedula es obligatoria"}
    }

    if (!moto.nro_soat) {
        throw {ok: false, mensaje: "El SOAT es obligatorio"}
    }

    if (!moto.vencimiento_soat) {
        throw {ok: false, mensaje: "El vencimiento de SOAT es obligatorio"}
    }

    if (!moto.nro_tecnomecanica) {
        throw {ok: false, mensaje: "El numero de la tecnomecanica es obligatorio"}
    }

    if (!moto.vencimiento_tecnomecanica) {
        throw {ok: false, mensaje: "El vencimiento de la tecnomecanica es obligatorio"}
    }
}

let guardarMoto = async (moto)=> {
    try {
        console.log(moto);
        let sql = `INSERT INTO public.motos(
            placa, estado, clase, marca, modelo, color, cilindraje,
             id_propietario, nro_soat, vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica)
        VALUES (
            '${moto.placa}',
            '${moto.estado}',
            '${moto.clase}',
            '${moto.marca}',
            '${moto.modelo}',
            '${moto.color}',
            '${moto.cilindraje}',
            '${moto.id_propietario}',
            '${moto.nro_soat}',
            '${moto.vencimiento_soat}',
            '${moto.nro_tecnomecanica}',
            '${moto.vencimiento_tecnomecanica}'
            );`;
        let respuesta = await servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false};
    }
}


let consultarMoto = async () => {
    try {
        let sql = `SELECT * from public.motos`;
        let respuesta = await servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {

        throw{ok: false, error: error };
    }
}


  let modificarMoto = async (moto, placa) => {
    if (moto.placa != placa) {
      throw {
        ok: false,
        mensaje: "La placa no corresponde al enviado.",
      };
    }
    try{
        let sql = `UPDATE public.motos
        SET placa='${moto.placa}', estado='${moto.estado}', clase='${moto.clase}', marca='${moto.marca}', modelo='${moto.modelo}', color='${moto.color}', cilindraje='${moto.cilindraje}',
         id_propietario='${moto.id_propietario}', nro_soat='${moto.nro_soat}', vencimiento_soat='${moto.vencimiento_soat}', nro_tecnomecanica='${moto.nro_tecnomecanica}', vencimiento_tecnomecanica='${moto.vencimiento_tecnomecanica}'
        WHERE placa='${moto.placa}';`;

        let respuesta = await servicio.ejecutarSql(sql);
        return respuesta;

    } catch(error) {
        throw{ok: false, error: error}
    }
  };

module.exports = {guardarMoto, consultarMoto,modificarMoto, validarMoto};