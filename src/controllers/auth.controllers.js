const User = require('../models/user.model');
const { createToken } = require('../utils/createToken');

/**
 * Función para recoger un usuario por su id.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta.
 * @returns Devuelve el usuario encontrado y le genera un token.
 */
const getUser = async (req, res) => {
    const { firebaseUid } = req.body
    try {
        const user = await User.findOne({ _id: firebaseUid });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado."
            })
        }
        let token;
        await createToken(user._id, user.role)
            .then((resp) => { token = resp })
            .catch((error) => {
                return res.status(403).json({
                    ok: false,
                    msg: "Error al generar el token."
                })
            })
        return res.status(200).json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}

/**
 * Función para almacenar el usuario de Firebase en la base de datos de Mongo.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta.
 * @returns Almacena el usuario en la base de datos y devuelve el token generado.
 */
const saveUserUid = async (req, res) => {
    const { firebaseUid, name, email, role } = req.body;
    try {
        let user = await User.findById(firebaseUid);
        if (!user) {
            user = new User({
                _id: firebaseUid,
                name,
                email,
                role
            })
            await user.save();
        }
        let token;
        await createToken(user._id, user.role)
            .then((resp) => { token = resp })
            .catch((error) => {
                return res.status(403).json({
                    ok: false,
                    msg: "Error al generar el token."
                })
            })
        return res.status(200).json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}


module.exports = {
    saveUserUid,
    getUser
}