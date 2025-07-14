const { Router } = require('express');
const { saveUserUid, getUser } = require('../controllers/auth.controllers');
const { verifyToken } = require('../middlewares/verifyToken');

const router = Router();

router.post('/sync', saveUserUid)

router.post('/user', /* , */ getUser)

module.exports = router;