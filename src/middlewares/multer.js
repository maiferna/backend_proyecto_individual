
const multer = require('multer');

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