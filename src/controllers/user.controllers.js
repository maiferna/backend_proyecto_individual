
const Recipe = require('../models/recipe.model')
const User = require('../models/user.model')
const mongoose = require('mongoose');


/**
 * Función que devuelve todas las recetas
 * @param {Object} req Requerimiento.
 * @param {Object} res Respuesta
 * @returns Devuelve todas las recetas que están en la base de datos.
 */
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



/**
 * Función que devuelve recetas por categoría. 
 * @param {Object} req Requerimiento. Datos de los parámetros.
 * @param {Object} res Respuesta
 * @returns Devuelve las recetas que tienen la categoría correspondiente.
 */
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


/**
 * Función que devuelve recetas por nombre.
 * Expresión regular para que no distinga entre mayúsculas y minúsculas.
 * @param {Object} req Requerimiento. Datos de los parámetros.
 * @param {Object} res Respuesta
 * @returns Devuelve las recetas que coincidan con el nombre buscado.
 */
const getRecipesByName = async (req, res) => {
    const { name } = req.params;
    try {
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


// 
// Si no ingresa ningún ingrediente, ingresa solo uno o más de 7 (esto no puede), mensaje de error
// Una vez ingresados, se buscan las recetas y se filtran para que devuelva solo las que tienen por lo menos 2 ingredientes coincidentes
// Recibe lo ingredientes del body (formulario)
/**
 * Función que devuelve recetas según los ingredientes que se le pasen
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Devuelve las recetas que contengan al menos uno de los ingredientes buscados.
 */
const getRecipesByIngredients = async (req, res) => {
    const { ingredients } = req.body;
    if (ingredients.length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'Es necesario ingresar al menos un ingrediente.'
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
        if (recipes.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No hemos encontrado ninguna receta con esos ingredientes."
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


/**
 * Función para devolver recetas por su id
 * @param {Object} req Requerimiento. Datos de los parámetros.
 * @param {Object} res Respuesta.
 * @returns Devuelve la receta que coincide con el id buscado.
 */
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


/**
 * Función para añadir una receta a favoritos
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta.
 * @returns Si el usuario no tiene la receta añadida a favoritos, la añade y devuelve las recetas favoritas.
 */
const addRecipeToFavorite = async (req, res) => {
    const userId = req.params.id;
    const recipeId = req.body.id;
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
        const recipeExists = user.favorites.includes(recipeId);
        if (recipeExists) {
            return res.status(403).json({
                ok: false,
                msg: 'La receta ya está en favoritos'
            });
        }
        const objectId = new mongoose.Types.ObjectId(recipeId);
        user.favorites.push(objectId);
        await user.save();
        await user.populate('favorites');
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


/**
 * Función para eliminar una receta de favoritos
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta.
 * @returns Elimina la receta por su id y devuelve el resto de recetas que están añadidas a favoritos.
 */
const removeRecipeFromFavorite = async (req, res) => {
    const userId = req.params.id;
    const recipeId = req.body.id;
    try {
        const user = await User.findById(userId);
        user.favorites = user.favorites.filter((id) => id.toString() != recipeId)
        await user.save();
        await user.populate('favorites');
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


/**
 * Función que devuelve todas las recetas que el usuario tiene añadidas a favoritos
 * @param {Object} req Requerimiento. Datos de los parámetros.
 * @param {Object} res Respuesta.
 * @returns Devuelve todas las recetas favoritas de un usuario.
 */
const getAllFavoriteRecipes = async (req, res) => {
    const { id } = req.params;
    try {
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