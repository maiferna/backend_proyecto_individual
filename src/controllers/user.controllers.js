
const Recipe = require('../models/recipe.model')
const User = require('../models/user.model')

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

const getRecipesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const recipes = await Recipe.find({ category: category })
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

const getRecipesByIngredients = async (req, res) => {
    const { ingredients } = req.body;
    if (!ingredients) {
        return res.status(400).json({
            ok: false,
            msg: 'Es necesario ingresar al menos un ingrediente.'
        })
    }
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
        // TODO: filtrar recetas para que devuelva las que tienen al menos dos de los ingredientes ingresados
        const recipes = await Recipe.find({ "ingredients.name": { $in: ingredients } });
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

const addRecipeToFavorite = async (req, res) => {
    const userId = req.params.id;
    const recipeId = req.body.id;
    if (!recipeId) {
        return res.status(404).json({
            ok: false,
            msg: 'La receta no existe.'
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
            msg: 'Contacte con el administrador'
        })
    }
}

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