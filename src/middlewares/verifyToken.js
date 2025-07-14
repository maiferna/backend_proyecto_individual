
const jwt = require('jsonwebtoken');

/**
 * Función para validar un token
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @param {Function} next Ejecuta la siguiente función
 * @returns Si el token es válido, almacena el rol y el id del usuario en el requerimiento
 */
const verifyToken = (req, res, next) => {
    const header = req.header('Authorization');
    console.log('HEADER TOKEN BACK', header);
    const token = header.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No tiene autorización."
        })
    }
    try {
        const secret_key = process.env.JWT_SECRET_KEY;
        const payload = jwt.verify(token, secret_key);
        req.uid = payload.uid;
        req.role = payload.role;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "El token no es válido."
        })
    }
}


module.exports = {
    verifyToken
}
