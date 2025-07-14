const User = require('../models/user.model');
const { createToken } = require('../utils/createToken');

const getUser = async (req, res) => {
    const { firebaseUid } = req.body
    try {
        const user = await User.findOne({ _id: firebaseUid });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado."
            })
        }
        let token;
        await createToken(user._id, user.role)
            .then((resp) => { token = resp })
            .catch((error) => {
                return res.status(403).json({
                    ok: false,
                    msg: "Error al generar el token."
                })
            })
        return res.status(200).json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}

const saveUserUid = async (req, res) => {
    const { firebaseUid, name, email, role } = req.body;
    //console.log('ID FIREBASE', firebaseUid)
    try {
        let user = await User.findById(firebaseUid);
        if (!user) {
            user = new User({
                _id: firebaseUid,
                name,
                email,
                role
            })
            await user.save();
            console.log('USER BACK', user)
        }
        let token;
        await createToken(user._id, user.role)
            .then((resp) => { token = resp })
            .catch((error) => {
                return res.status(403).json({
                    ok: false,
                    msg: "Error al generar el token."
                })
            })
        //console.log("Token generado:", token);
        return res.status(200).json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}


module.exports = {
    saveUserUid,
    getUser
}