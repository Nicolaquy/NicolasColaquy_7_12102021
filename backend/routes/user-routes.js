const express = require("express");                             // Importation du paquet express
const router = express.Router();                                // Creation du router
const usercTRL = require("../controllers/user-ctrl");           // Importation du controller users
const auth = require("../middleware/auth");                     // Importation du middlware auth
const rateLimit = require("express-rate-limit");                // Importation de rateLilimite

const createAccountLimiter = rateLimit({                        // Limitation creation de comptes
  windowMs: 60 * 60 * 1000,
  max: 10
});

const connexionAccountLimiter = rateLimit({                     // Limitation tentatives de connexions
  windowMs: 60 * 60 * 1000,
  max: 10
});

router.post("/signup", createAccountLimiter, usercTRL.signup);  // Route pour la création de compte
router.post("/login", connexionAccountLimiter, usercTRL.login); // Route pour la connexion
router.get("/:id", auth, usercTRL.getOneProfil);                // Route pour afficher les informations d'un profil
router.get("/", auth, usercTRL.getAllUsers);                    // Route pour afficher les informations tout les profils
router.delete("/:id", auth, usercTRL.deleteProfil);             // Route pour supprimé un profil

module.exports = router;                                        // Export du router