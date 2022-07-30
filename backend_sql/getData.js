// get the client

const mysql = require('mysql2');


export default function handler(req, res) {

  // create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'haslo',
  database: 'inz_app'
});

  res.status(200).json({ something: "something" });
}


// simple query
// connection.query(
//   'SELECT * FROM `reservations` ',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     // console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

// with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );