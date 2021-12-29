const express = require('express');
const router = express.Router();
const usercTRL = require('../controllers/user-ctrl');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', usercTRL.signup);
router.post('/login', usercTRL.login);
router.put('/:id', auth, multer, usercTRL.modifyProfil);
router.get('/:id', auth, usercTRL.getOneProfil);
router.get('/', auth, usercTRL.getAllUsers);
router.delete('/:id', auth, usercTRL.deleteProfil);


module.exports = router;