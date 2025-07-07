
const { Router } = require('express');
const {
    getAllRecipes,
    getRecipesByCategory,
    getRecipesByIngredients,
    getRecipeById,
    addRecipeToFavorite,
    removeRecipeFromFavorite,
    getAllFavoriteRecipes
} = require('../controllers/user.controllers');

const { validateInput } = require('../middlewares/validateInput');
const { check } = require('express-validator');

const router = Router();

// Obtener recetas
// GET: http://localhost:3000/api/v1/recipes
router.get('/recipes', getAllRecipes);

// Obtener recetas por categoría
// GET: http://localhost:3000/api/v1/recipes/:category
router.get('/recipes/:category', getRecipesByCategory);

// Obtener recetas por ingredientes
// POST: http://localhost:3000/api/v1/recipes/ingredients
router.post('/recipes/ingredients',
    check("ingredients", "ingredients es requerido").notEmpty(),
    validateInput,
    getRecipesByIngredients);

// Obtener información de la receta por id
// GET: http://localhost:3000/api/v1/recipe/:id
router.get('/recipe/:id', getRecipeById);

// Añadir receta a favoritos
// POST: http://localhost:3000/api/v1/favorite/user/:id
router.post('/favorite/user/:id', addRecipeToFavorite);

// Eliminar receta de favoritos
// DELETE: http://localhost:3000/api/v1/favorite/user/:id
router.delete('/favorite/user/:id', removeRecipeFromFavorite);

// Obtener recetas favoritas
// GET: http://localhost:3000/api/v1/favorite/user/:id
router.get('/favorite/user/:id', getAllFavoriteRecipes);



module.exports = router;