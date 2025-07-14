
const jwt = require('jsonwebtoken');

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