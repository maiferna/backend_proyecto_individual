/**
 * Importaciones
 */
const { Router } = require('express');
const upload = require('../middlewares/multer');
const { check } = require('express-validator');
const {
    createRecipe,
    editRecipe,
    deleteRecipe,
    getAllUsers,
    editUser,
    deleteUser
} = require('../controllers/admin.controllers');
const { validateInput } = require('../middlewares/validateInput');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyRole } = require('../middlewares/verifyRole');
const router = Router();

/**
 * Rutas del administrador
 */

/**
 * Crear una receta nueva
 * POST: http://localhost:3000/api/v1/admin/create
 */
router.post('/create', [
    upload.single('image'),
    check("name", "name es requerido").notEmpty().isString(),
    check("ingredients", "ingredients es requerida").notEmpty(),
    check("time", "time es requerida").notEmpty().isString(),
    check("difficulty", "difficulty es requerido").notEmpty().isString(),
    check("steps", "steps es requerido").notEmpty().isString(),
    validateInput
], createRecipe)


/**
 * Editar receta según su id (PUT)
 * PUT: http://localhost:3000/api/v1/admin/edit/:id
 */
router.put('/edit/:id', [
    upload.single('image'),
    check("name", "name es requerido").notEmpty().isString(),
    check("ingredients", "ingredients es requerida").notEmpty(),
    check("time", "time es requerida").notEmpty().isString(),
    check("difficulty", "difficulty es requerido").notEmpty().isString(),
    check("steps", "steps es requerido").notEmpty().isString(),
    validateInput
], editRecipe)


/**
 * Eliminar receta por su id (DELETE)
 * DELETE: http://localhost:3000/api/v1/admin/delete/:id
 */
router.delete('/delete/:id', [verifyToken, verifyRole('admin')], deleteRecipe)


/**
 * Obtener usuarios
 * GET: http://localhost:3000/api/v1/admin/users
 */
router.get('/users', getAllUsers);


/**
 * Editar rol del usuario
 * PUT: http://localhost:3000/api/v1/admin/user/:id
 */
router.put('/user/:id', editUser);


/**
 * Eliminar usuario
 * DELETE: http://localhost:3000/api/v1/admin/user/delete/:id
 */
router.delete('/user/delete/:id', deleteUser);

module.exports = router;