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

module.exports = router