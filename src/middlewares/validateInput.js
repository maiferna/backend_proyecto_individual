
const {validationResult} = require('express-validator')

/**
 * Función para validar los inputs del formulario.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @param {Function} next Función que ejecutará la siguiente función
 * @returns Devuelve un objeto de errores en caso de que los inputs no sean válidos. Si los campos son correctos, ejecuta la siguiente función.
 */
const validateInput = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(404).json({
            ok: false,
            errores: errores.mapped()
        })
    }
    next();
}


module.exports = {
    validateInput
};