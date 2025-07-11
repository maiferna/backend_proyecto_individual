
const Recipe = require('../models/recipe.model')
const User = require('../models/user.model')
const mongoose = require('mongoose');

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


// Función que devuelve recetas por nombre. 
// Recibe el nombre de la url
const getRecipesByName = async (req, res) => {
    const { name } = req.params;
    try {
        // crea una expresión regular basada en el valor que le pasas (por ejemplo, "ensalada") y la i significa insensitive (no distingue entre mayúsculas y minúsculas).
        const recipes = await Recipe.find({ name: new RegExp(name, 'i') })
        if (recipes.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No hemos encontrado ninguna receta en ese nombre."
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
    console.log('Ingredientes recibidos:', ingredients);
    if (!ingredients) {
        return res.status(400).json({
            ok: false,
            msg: 'Es necesario ingresar al menos un ingrediente.'
        })
    }
    // Esto gestionarlo en el front
    if (ingredients.length === 1) {
        return res.status(400).json({
            ok: false,
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
        const filteredRecipes = recipes.filter((recipe) => recipe.ingredients.length >= 2)
        if (filteredRecipes.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No hemos encontrado ninguna receta con esos ingredientes."
            })
        }
        return res.status(200).json({
            ok: true,
            recipes: filteredRecipes
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
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        //comprobar si el usuario tiene la receta en favoritos
        const recipeExists = user.favorites.includes(recipeId);
        if (recipeExists) {
            return res.status(403).json({
                ok: false,
                msg: 'La receta ya está en favoritos'
            });
        }
        // Convertir el id string en un objectId (?)
        const objectId = new mongoose.Types.ObjectId(recipeId);
        // Si no la tiene, añadirla
        user.favorites.push(objectId);
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
        // Mongoose busca esos IDs en la colección recipes y los reemplaza por los documentos completos
        const user = await User.findById(id).populate('favorites');
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
    getRecipesByName,
    getRecipesByIngredients,
    getRecipeById,
    addRecipeToFavorite,
    removeRecipeFromFavorite,
    getAllFavoriteRecipes
}