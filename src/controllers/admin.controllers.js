
const Recipe = require('../models/recipe.model')
const User = require('../models/user.model');
const { parseFormData } = require('../utils/parseFormData');


/**
 * Función para crear una receta.
 * @param {Object} req Requerimiento. Datos del formulario.
 * @param {Object} res Respuesta.
 * @returns Devuelve la receta creada.
 */
const createRecipe = async (req, res) => {
    try {
        const data = parseFormData(req.body, req.file);
        const recipeExists = await Recipe.findOne({ name: data.name })
        if (recipeExists) {
            return res.status(404).json({
                ok: false,
                msg: 'La receta ya existe.'
            })
        }
        const recipe = new Recipe(data);
        const savedRecipe = await recipe.save();
        return res.status(201).json({
            ok: true,
            savedRecipe
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}



/**
 * Función para editar una receta.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta.
 * @returns Devuelve la receta actualizada con {new: true}.
 */
const editRecipe = async (req, res) => {
    const { id } = req.params;

    try {
        const data = parseFormData(req.body, req.file);
        const recipeExists = await Recipe.findById(id);
        if (!recipeExists) {
            return res.status(404).json({
                ok: false,
                msg: 'La receta no existe.'
            })
        }
        const recipe = await Recipe.findByIdAndUpdate(id, data, { new: true });
        return res.status(201).json({
            ok: true,
            recipe
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}


/**
 * Función para eliminar una receta
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta.
 * @returns Elimina la receta.
 */
const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    const recipeExists = await Recipe.findById(id);
    if (!recipeExists) {
        return res.status(404).json({
            ok: false,
            msg: 'La receta no existe.'
        })
    }
    try {
        const recipes = await Recipe.deleteOne({ _id: id });
        return res.status(201).json({
            ok: true,
            recipes
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}

/**
 * Función para recoger todos los usuarios.
 * @param {Object} req Requerimiento.
 * @param {Object} res Respuesta.
 * @returns Devuelve todos los usuarios.
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({
            ok: true,
            users
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
 * Función para editar usuarios.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta.
 * @returns Devuelve el usuario con los datos actualizados.
 */
const editUser = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado.'
            })
        }
        user.role = role;
        await user.save();
        return res.status(200).json({
            ok: true,
            user
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
 * Función para eliminar un usuario.
 * @param {Object} req Requerimiento. Datos de los parámetros.
 * @param {Object} res Respuesta.
 * @returns Devuelve un mensaje de que el usuario se ha eliminado correctamente.
 */
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado.'
            })
        }
        const data = await User.deleteOne({ _id: id });
        return res.status(200).json({
            ok: true,
            msg: "Usuario eliminado."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador.'
        })
    }
}


module.exports = {
    createRecipe,
    editRecipe,
    deleteRecipe,
    getAllUsers,
    editUser,
    deleteUser
}