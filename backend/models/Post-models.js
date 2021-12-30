const db = require("../db");                          // Importation du fichier de la bdd

exports.addPost = (user_id, description, image) => {
  return new Promise(function (resolve, reject) {     // Creation de la promesse pour créer un post
  db.query(                                           // Creation de la requête sql
    {
      sql: "INSERT INTO publications (creation_date, user_id, description, image_url) VALUES (NOW(), ?, ?, ?)",
    },
    [user_id, description, image],                    // Valeurs de la requête
    function (err, res, fields) {
      if (err) {
        console.log(err);
      } else {
        resolve('ok')
      }
    }
  );
  })
};

exports.getAllPosts = () => {
  let sql =                                           // Creation de la requête sql
    "SELECT publications.id, publications.user_id, publications.creation_date, publications.description, publications.image_url, users.pseudo FROM publications JOIN users ON publications.user_id = users.id ORDER BY publications.id DESC";
  return new Promise((resolve) => {                   // Creation de la promesse pour afficher tout les posts
    db.query(sql, function (err, result, fields) {
      if (err) throw err;
      resolve(result);
    });
  });
};

exports.getAllMyPosts = (id) => {
  return new Promise(function (resolve, reject) {    // Creation de la promesse pour afficher tout les posts d'un utilisateur
    db.query(                                        // Creation de la requête sql
      {
        sql: "SELECT publications.id, publications.user_id, publications.creation_date, publications.description, publications.image_url, users.pseudo FROM publications JOIN users ON publications.user_id = users.id WHERE user_Id = ? ORDER BY publications.id DESC",
      },
      [id],                                          // Valeur de la requête
      function (err, res, fields) {
        if (err) {
          console.log(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

exports.getOnePost = (publication_id) => {
  return new Promise(function (resolve, reject) {    // Creation de la promesse pour afficher un post
    db.query(                                        // Creation de la requête sql
      {
        sql: "SELECT * FROM publications WHERE id = ?",
      },
      [publication_id],                              // Valeur de la requête
      function (err, res, fields) {
        if (err) {
          console.log(err);
        } else {
          resolve(res[0]);
        }
      }
    );
  });
};

exports.deletePost = (publication_id, user_id) => {
  return new Promise(function (resolve, reject) {    // Creation de la promesse pour supprimer un post
    db.query(                                        // Creation de la requête sql
      {
        sql: "DELETE FROM publications WHERE id = ? AND user_id = ?",
      },
      [publication_id, user_id],                     // Valeurs de la requête
      function (err, res, fields) {
        if (err) {
          console.log(err);
        } else {
          resolve(res[0]);
        }
      }
    );
  });
};

exports.deletePostMod = (publication_id) => {
  return new Promise(function (resolve, reject) {    // Creation de la promesse pour supprimer un post
    db.query(                                        // Creation de la requête sql
      {
        sql: "DELETE FROM publications WHERE id = ?",
      },
      [publication_id],                              // Valeur de la requête
      function (err, res, fields) {
        if (err) {
          console.log(err);
        } else {
          resolve(res[0]);
        }
      }
    );
  });
};

exports.addComment = (user_id, commentaire, publication_id) => {
  return new Promise(function (resolve, reject) {    // Creation de la promesse pour créer un commentaire
  db.query(                                          // Creation de la requête sql
    {
      sql: "INSERT INTO commentaires (creation_date, user_id, commentaire, publication_id) VALUES (NOW(), ?, ?, ?)",
    },
    [user_id, commentaire, publication_id],          // Valeurs de la requête
    function (err, res, fields) {
      if (err) {
        console.log(err);
      } else {
        resolve('ok')
      }
    }
  );
  })
};


exports.getAllComments = (id) => {

  return new Promise(function (resolve, reject) {     // Creation de la promesse pour afficher tout les commentaires
    db.query(                                         // Creation de la requête sql
      {
        sql: "SELECT commentaires.id, commentaires.publication_id, commentaires.user_id, commentaires.creation_date, commentaires.commentaire, users.pseudo FROM commentaires JOIN users ON commentaires.user_id = users.id WHERE commentaires.publication_id = ? ORDER BY commentaires.id DESC",
      },
      [id],                                           // Valeur de la requête
      function (err, res, fields) {
        if (err) {
          console.log(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

exports.deleteComment = (commentaire_id, user_id) => {
  return new Promise(function (resolve, reject) {    // Creation de la promesse pour supprimer un commentaire
    db.query(                                        // Creation de la requête sql
      {
        sql: "DELETE FROM commentaires WHERE id = ? AND user_id = ?",
      },
      [commentaire_id, user_id],                     // Valeurs de la requête
      function (err, res, fields) {
        if (err) {
          console.log(err);
        } else {
          resolve(res[0]);
        }
      }
    );
  });
};

exports.deleteCommentMod = (commentaire_id) => {
  return new Promise(function (resolve, reject) {    // Creation de la promesse pour supprimer un commentaire
    db.query(                                        // Creation de la requête sql
      {
        sql: "DELETE FROM commentaires WHERE id = ?",
      },
      [commentaire_id],                              // Valeur de la requête
      function (err, res, fields) {
        if (err) {
          console.log(err);
        } else {
          resolve(res[0]);
        }
      }
    );
  });
};