
const express = require('express');

const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');

const {connection} = require('./utils/dbconnect');

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

// Ejecutar conexión
connection().catch((error) => {
    console.log(error);
})

const whiteList = ['http://localhost:3000', 'https://backend-proyecto-individual-xvef.onrender.com', 'http://localhost:5173'];
app.use(cors({
    origin: whiteList
}));

// Configurar el directorio uploads como estático
// path.join une los componentes de la ruta de forma segura, manejando correctamente los separadores de ruta según el sistema operativo. 
// /uploads para poder acceder a la imagen con una URL
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/prueba', require('./routes/prueba.routes'));
app.use('/api/v1', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/auth', authRoutes);


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));


app.listen(port, () => {
    console.log(`Server on port ${port}`);
})