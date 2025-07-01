
const express = require('express');

const cors = require('cors');

const userRoutes = require('./routes/user.routes')

const {connection} = require('./utils/dbconnect')

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

// Ejecutar conexión
connection().catch((error) => {
    console.log(error);
})

const whiteList = ['http://localhost:3000', 'http://xxxx-front.render.com'];
app.use(cors({
    origin: whiteList
}));

app.use(express.urlencoded());
app.use(express.json());

//app.use('/api/v1', require('./routes/prueba.routes'));
app.use('/api/v1', userRoutes);

app.listen(port, () => {
    console.log(`Server on port ${port}`);
})