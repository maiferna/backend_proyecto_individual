const { Router } = require('express');
const { saveUserUid } = require('../controllers/auth.controllers');

const router = Router();

router.post('/sync', saveUserUid)

module.exports = router;