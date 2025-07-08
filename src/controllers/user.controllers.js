
const Recipe = require('../models/recipe.model')
const User = require('../models/user.model')

// Función que devuelve todas las recetas
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find()
        return res.status(200).json({
            ok: true,
            recipes
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
}


// Función que devuelve recetas por categoría. 
// Recibe la categoría de la url
const getRecipesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const recipes = await Recipe.find({ category: category })
        if (recipes.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No hemos encontrado ninguna receta en esa categoría."
            })
        }
        return res.status(200).json({
            ok: true,
            recipes
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
}


// Función que devuelve recetas según los ingredientes que se le pasen
// Si no ingresa ningún ingrediente, ingresa solo uno o más de 7 (esto no puede), mensaje de error
// Una vez ingresados, se buscan las recetas y se filtran para que devuelva solo las que tienen por lo menos 2 ingredientes coincidentes
// Recibe lo ingredientes del body (formulario)
const getRecipesByIngredients = async (req, res) => {
    const { ingredients } = req.body;
    if (!ingredients) {
        return res.status(400).json({
            ok: false,
            msg: 'Es necesario ingresar al menos un ingrediente.'
        })
    }
    // Esto gestionarlo en el front
    if (ingredients.length === 1) {
        return res.status(200).json({
            ok: true,
            msg: 'Igual va siendo hora de hacer la compra...'
        })
    }
    if (ingredients.length > 8) {
        return res.status(400).json({
            ok: false,
            msg: 'Máximo 7 ingredientes permitidos.'
        });
    }
    try {
        const recipes = await Recipe.find({ "ingredients.name": { $in: ingredients } });
        const filteredRecipes = recipes.filter((recipe) => recipe.ingredients.length > 2)
        if (filteredRecipes.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No hemos encontrado ninguna receta con esos ingredientes."
            })
        }
        return res.status(200).json({
            ok: true,
            filteredRecipes
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
}


// Función para devolver recetas por su id
// Recibe el id por la url
const getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById({ _id: id })
        if (!recipe) {
            return res.status(404).json({
                ok: false,
                msg: 'La receta no existe.'
            })
        }
        return res.status(200).json({
            ok: true,
            recipe
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
}


// Función para añadir una receta a favoritos
// Comprueba que la receta exista
// Busca el usuario y comprueba si ya tiene la receta añadida a favoritos
// Si no la tiene la añade y actualiza el usuario
// Recibe el id del usuario de la url y el id de la receta por el body (botón)
const addRecipeToFavorite = async (req, res) => {
    const userId = req.params.id;
    const recipeId = req.body.id;
    // Comprobar que el req.body traiga algo
    if (!recipeId) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha encontrado la receta.'
        });
    }
    try {
        const user = await User.findById(userId);
        //comprobar si el usuario tiene la receta en favoritos
        const recipeExists = user.favorites.includes(recipeId);
        if (recipeExists) {
            return res.status(403).json({
                ok: false,
                msg: 'La receta ya está en favoritos'
            });
        }
        // Si no la tiene, añadirla
        user.favorites.push(recipeId);
        await user.save();
        return res.status(201).json({
            ok: true,
            favorites: user.favorites
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
}


// Función para eliminar una receta de favoritos
// Busca el usuario, elimina la receta de sus favoritos y actualiza el usuario
// Recibe el id del usuario de la url y el id de la receta del body (botón)
const removeRecipeFromFavorite = async (req, res) => {
    const userId = req.params.id;
    const recipeId = req.body.id;
    try {
        const user = await User.findById(userId);
        user.favorites = user.favorites.filter((id) => id.toString() != recipeId)
        await user.save();
        return res.status(201).json({
            ok: true,
            favorites: user.favorites
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador.'
        })
    }
}


// Función que devuelve todas las recetas que el usuario tiene añadidas a favoritos
// Recibe el id del usuario de la url
const getAllFavoriteRecipes = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        return res.status(200).json({
            ok: true,
            favorites: user.favorites
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
}


module.exports = {
    getAllRecipes,
    getRecipesByCategory,
    getRecipesByIngredients,
    getRecipeById,
    addRecipeToFavorite,
    removeRecipeFromFavorite,
    getAllFavoriteRecipes
}