var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abhishek_007",
  database: "hoverBackend"
});



module.exports=con;
