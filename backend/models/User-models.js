const db = require("../db");

exports.save = (email, pseudo, hash) => {
  return new Promise(function (resolve, reject) {
  db.query(
    {
      sql: "INSERT INTO users (creation_date, pseudo, email, password, accesNivel) VALUES (NOW(), ?, ?, ?, 0)",
    },
    [pseudo, email, hash],
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
  return new Promise(function (resolve, reject) {
    db.query(
      {
        sql: "SELECT id, email, password, accesNivel FROM users WHERE email = ?",
      },
      [email],
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
  return new Promise(function (resolve, reject) {
    db.query(
      {
        sql: "SELECT * FROM users WHERE id = ?",
      },
      [id],
      function (err, res, fields) {
        if (err) {
          console.log(err);
        } else {
          resolve(res[0])
          /* db.end(); */
        }
      }
    );
  });

}

exports.getAllProfils = () => {

  let sql = "SELECT * FROM Users"
  return new Promise((resolve) =>{
   db.query(sql, function (err, result, fields) {
       if (err) throw err;
       resolve(result)
   });
})

}

exports.deleteProfil = (id) => {
    return new Promise(function (resolve, reject) {
    db.query(
      {
        sql: "DELETE FROM users WHERE id = ?",
      },
      [id],
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