require('dotenv').config(); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User-models");
const mysql = require("mysql");
const db = require("../db");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.save(req.body.email, req.body.pseudo, hash)
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) =>
          res.status(400).json({ message: "Utilisateur déja existant" })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
User.find(req.body.email)
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user.id,
            acces: user.accesNivel,
            token: jwt.sign({ userId: user.id, acces: user.accesNivel }, process.env.TOKEN, {
              expiresIn: "12h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ message: "oups" }));
};

exports.modifyProfil = (req, res, next) => {

};

exports.getOneProfil = (req, res, next) => {
  User.getOneProfil(req.params.id)
  .then(profil => res.status(200).json(profil))
  .catch(error => res.status(400).json({error}))
};

exports.getAllUsers = (req, res, next) => {
  User.getAllProfils()
  .then(profils => res.status(200).json(profils))
  .catch(error => res.status(400).json({error}))
};

exports.deleteProfil = (req, res, next) => {
   User.deleteProfil(res.locals.userId)
   .then(() => res.status(200).json('Utilisateur supprimé'))
   .catch((error) => res.status(400).json({ error }));
};

