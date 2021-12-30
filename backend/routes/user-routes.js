const express = require('express');                     // Importation du paquet express
const router = express.Router();                        // Creation du router
const usercTRL = require('../controllers/user-ctrl');   // Importation du controller users
const auth = require('../middleware/auth');             // Importation du middlware auth

router.post('/signup', usercTRL.signup);                // Route pour la création de compte
router.post('/login', usercTRL.login);                  // Route pour la connexion
router.get('/:id', auth, usercTRL.getOneProfil);        // Route pour afficher les informations d'un profil
router.get('/', auth, usercTRL.getAllUsers);            // Route pour afficher les informations tout les profils
router.delete('/:id', auth, usercTRL.deleteProfil);     // Route pour supprimé un profil


module.exports = router;                                // Export du router