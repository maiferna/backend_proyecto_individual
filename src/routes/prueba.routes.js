const {Router} = require('express');
const User = require('../models/user.model')
const router = Router();


router.get('/prueba', async (req, res) => {
  try {
    const usuario = await User.find();
    res.status(200).json({ ok: true, resultado: usuario });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

router.post('/create/user', async (req, res) => {
  try {
    const user = new User({
      name: "userprueba",
      email: "userprueba@email.com",
      role: "user",
      favorites: ['6865040f077bec638d88cf54'],
      intolerance: []
    });
    const savedUser = await user.save();
    return res.status(201).json({
            ok: true,
            savedUser
        })
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
  }
})

module.exports = router