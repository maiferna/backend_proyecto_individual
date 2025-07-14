
const jwt = require('jsonwebtoken');

/**
 * Función para generar un token.
 * @param {Number} id id del usuario
 * @param {String} role rol del usuario
 * @returns Devuelve una promesa. Si todo va bien, genera un token.
 */
const createToken = (id, role) => {
    return new Promise((resolve, reject) => {
        jwt.sign({
            uid: id,
            role: role
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '2h'
            },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject('Error al generar el token');
                }
                resolve(token);
            }
        )
    })

}

module.exports = {
    createToken
}