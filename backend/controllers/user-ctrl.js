require('dotenv').config();                         
const bcrypt = require("bcrypt");                                               // Importation bcrypt pour hashage mdp
const jwt = require("jsonwebtoken");                                            // Importation jwt pour creation et gestion des tokens
const User = require("../models/User-models");                                  // Importation des models User

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)                                                // Hashage du passeport avec bcrypt
    .then((hash) => {
      User.save(req.body.email, req.body.pseudo, hash)                          // Envoie de la requête a la bdd avec valeurs
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))      // Retour positif, creation de l'utilisateur
        .catch((error) =>
          res.status(400).json({ message: "Utilisateur déja existant" })        // Retour négatif, email déjà dans la bdd
        );
    })
    .catch((error) => res.status(500).json({ error }));                         // Retour négatif, erreur
};

exports.login = (req, res, next) => {
User.find(req.body.email)                                                       // Envoie de la requête a la bdd avec valeur
    .then((user) => {
      if (!user) {                                                              // Si email pas dans la bdd
        return res.status(401).json({ error: "utilisateur non trouvé" });       // Retour négatif, erreur 
      }
      bcrypt                                                                    // Si email dans la bdd
        .compare(req.body.password, user.password)                              // Comparaison du hash du mot de passe
        .then((valid) => {
          if (!valid) {                                                         // Si hash pas identique
            return res.status(401).json({ error: "mot de passe incorrecte" });  // Retour négatif, erreur
          }
          res.status(200).json({                                                // Si hash identique, retour positif, connexion de l'utilisateur
            userId: user.id,
            acces: user.accesNivel,
            token: jwt.sign({ userId: user.id, acces: user.accesNivel }, process.env.TOKEN, {
              expiresIn: "12h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));                     // Retour négatif, erreur
    })
    .catch((error) => res.status(500).json({ message: "oups" }));               // Retour négatif, erreur
};

exports.getOneProfil = (req, res, next) => {
  User.getOneProfil(req.params.id)                                              // Envoie de la requête a la bdd avec valeur
  .then(profil => res.status(200).json(profil))                                 // Retour positif, affichage infos utilisateur
  .catch(error => res.status(400).json({error}))                                // Retour négatif, erreur
};

exports.getAllUsers = (req, res, next) => {
  User.getAllProfils()                                                          // Envoie de la requête a la bdd
  .then(profils => res.status(200).json(profils))                               // Retour positif, affichage infos utilisateurs
  .catch(error => res.status(400).json({error}))                                // Retour négatif, erreur
};

exports.deleteProfil = (req, res, next) => {
   User.deleteProfil(res.locals.userId)                                         // Envoie de la requête a la bdd avec valeur
   .then(() => res.status(200).json('Utilisateur supprimé'))                    // Retour positif, suppression utilisateur
   .catch((error) => res.status(400).json({ error }));                          // Retour négatif, erreur
};

