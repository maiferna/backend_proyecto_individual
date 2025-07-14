/**
 * Importaciones
 */
const express = require('express');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');

const {connection} = require('./utils/dbconnect');
require('dotenv').config();

/**
 * Establecer el puerto
 */
const port = process.env.PORT || 3000;

/**
 * Hacer uso de Express
 */
const app = express();

/** 
 * Ejecutar conexión
*/
connection().catch((error) => {
    return(error);
})

/**
 * Middlewares
 */
const whiteList = ['http://localhost:3000', 'https://backend-proyecto-individual-xvef.onrender.com', 'http://localhost:5173'];
app.use(cors({
    origin: whiteList
}));

/**
 * Configurar el directorio uploads como estático
 */
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Rutas
 */
app.use('/api/v1', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/auth', authRoutes);

/**
 * Pone el puerto a la escucha del servidor
 */
app.listen(port, () => {
    console.log(`Server on port ${port}`);
})