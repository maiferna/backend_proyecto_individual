
const Recipe = require('../models/recipe.model')
const User = require('../models/user.model')

// Función para crear una receta
// Recibe la data del formulario y la imagen del req.file
// Guarda en la imagen el nombre del archivo
// Comprueba si la receta existe, si existe no la crea
// Sino crea la nueva receta
const createRecipe = async (req, res) => {
    const data = req.body;
    const image = req.file;
    if (image) {
        data.image = image.filename;
    }
    const recipeExists = await Recipe.findOne({ name: data.name })
    if (recipeExists) {
        return res.status(404).json({
            ok: false,
            msg: 'La receta ya existe.'
        })
    }

    try {
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


// Función para editar una receta
// Recibe el id de la receta de la url, el body del formulario y la imagen del req.file
// Comprueba que la receta exista
// Actualiza la receta. new: true se utiliza para devolver el objeto actualizado
const editRecipe = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const image = req.file;
    if (image) {
        data.image = image.filename;
    }
    const recipeExists = await Recipe.findById(id);
    if (!recipeExists) {
        return res.status(404).json({
            ok: false,
            msg: 'La receta no existe.'
        })
    }
    try {
        const recipe = await Recipe.findByIdAndUpdate(id, body, { new: true });
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


// Función para eliminar una receta
// Recibe el id de la receta de la url
// Comprueba que la receta exista, si existe la elimina
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


const editUser = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    console.log('ROL', role)
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


const deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado.'
            })
        }
        const data = await User.deleteOne({_id: id});
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