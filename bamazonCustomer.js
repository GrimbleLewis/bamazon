var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "W00tl00t@",
    database: "top_songsDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
  });