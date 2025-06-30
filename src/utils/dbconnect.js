
// Conectar a la base de datos
const mongoose = require('mongoose');

const connection = async () => {
    
    const uri = process.env.URI_MONGO;
    try {
        const conexion = await mongoose.connect(uri);
        console.log('Conectando bbdd');
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