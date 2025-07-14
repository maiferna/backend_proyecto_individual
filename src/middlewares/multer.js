
const multer = require('multer');
/**
 * Función que configura dónde se guardarán los archivos subidos por el usuario.
 * Guarda los archivos en la carpeta uploads
 * La función callback guarda el archivo con el nombre original
 */
const storage = multer.diskStorage({
  // Define la carpeta de destino
  destination: "src/public/uploads/",
  // Define el nombre del archivo
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;