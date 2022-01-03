const mysql = require('mysql');
console.log('Connexion à la base de données...');
let db = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'groupomania',
  password : 'groupomania',
  database : 'groupomania',
  port     : 3306
});

 db.connect((err)=> {
  if(err){
    throw err;
  }
  console.log('mysql connecté !');
});
 
db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
module.exports = db;