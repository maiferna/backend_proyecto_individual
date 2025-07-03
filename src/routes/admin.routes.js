const { Router } = require('express');
const upload = require('../middlewares/multer');
const {
    createRecipe,
    editRecipe,
    deleteRecipe
} = require('../controllers/admin.controllers')
const router = Router();

// Crear una receta nueva
// POST: http://localhost:3000/api/v1/admin/create
router.post('/create', upload.single('image'), createRecipe)

// Editar receta según su id (PUT)
// PUT: http://localhost:3000/api/v1/admin/edit/:id
router.put('/edit/:id', editRecipe)

// Eliminar receta por su id (DELETE)
// DELETE: http://localhost:3000/api/v1/admin/delete/:id
router.delete('/delete/:id', deleteRecipe)

module.exports = router;