const db = require("../db");                          // Importation du fichier de la bdd

exports.save = (email, pseudo, hash) => {
  return new Promise(function (resolve, reject) {     // Creation de la promesse pour créer un utilisateur
  db.query(                                           // Creation de la requête sql
    {
      sql: "INSERT INTO users (creation_date, pseudo, email, password, accesNivel) VALUES (NOW(), ?, ?, ?, 0)",
    },
    [pseudo, email, hash],                            // Valeurs de la requête
    function (err, res, fields) {
      if (err) {
        console.log(err);
      } else {
        resolve(res)
      }
    }
  );
  });
};

exports.find = (email) => {
  return new Promise(function (resolve, reject) {     // Creation de la promesse pour trouver un utilisateur (pour connexion)
    db.query(                                         // Creation de la requête sql
      {
        sql: "SELECT id, email, password, accesNivel FROM users WHERE email = ?",
      },
      [email],                                        // Valeur de la requête
      function (err, res, fields) {
        if (err) {
          console.log(err);
        } else {
          resolve(res[0])
        }
      }
    );
  });
};

exports.getOneProfil = (id) => {
  return new Promise(function (resolve, reject) {     // Creation de la promesse pour afficher un utilisateur
    db.query(                                         // Creation de la requête sql
      {
        sql: "SELECT * FROM users WHERE id = ?",
      },
      [id],                                           // Valeur de la requête
      function (err, res, fields) {
        if (err) {
          console.log(err);
        } else {
          resolve(res[0])
        }
      }
    );
  });

}

exports.getAllProfils = () => {

  let sql = "SELECT * FROM Users"                     // Creation de la requête sql
  return new Promise((resolve) =>{                    // Creation de la promesse pour afficher tout les utilisateur
   db.query(sql, function (err, result, fields) {
       if (err) throw err;
       resolve(result)
   });
})

}

exports.deleteProfil = (id) => {
    return new Promise(function (resolve, reject) {   // Creation de la promesse pour afficher tout les utilisateur
    db.query(                                         // Creation de la requête sql
      {
        sql: "DELETE FROM users WHERE id = ?",
      },
      [id],                                           // Valeur de la requête
      function (err, res, fields) {
        if (err) {
          console.log(err);
        } else {
          resolve(res[0])
        }
      }
    );
  });
}