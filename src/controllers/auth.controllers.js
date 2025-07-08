const User = require('../models/user.model');
const { createToken } = require('../utils/createToken');

const saveUserUid = async (req, res) => {
    //console.log('BODY', req.body)
    const { firebaseUid, name, email, role } = req.body;
    //console.log('ID FIREBASE', firebaseUid)
    try {
        let user = await User.findOne({ firebaseUid });
        if (!user) {
            user = new User({
                firebaseUid,
                name,
                email,
                role
            })
            await user.save();
        }
        let token;
        await createToken(user._id, user.role)
            .then((resp) => {token = resp})
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
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}


module.exports = {
    saveUserUid
}