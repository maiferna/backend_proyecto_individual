
const mongoose = require('mongoose');

/**
 * Conectar a la base de datos
 * Establece la conexión con el método connect que recibe como argumento la uri de Mongo
 */
const connection = async () => {
    
    const uri = process.env.URI_MONGO;
    try {
        const conexion = await mongoose.connect(uri);
        console.log('Conectando a bd');
    } catch (error) {
        throw {
            ok: false,
            msg: 'Error al conectar con la bbdd'
        }
    }
}

module.exports = {
    connection
}