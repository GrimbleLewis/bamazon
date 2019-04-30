var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "W00tl00t@",
    database: "bamazonDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    showProducts();
  });

  function showProducts () {
    var sql = "SELECT * from products"

    connection.query(sql, function (err, result){
        if (err) throw err;
        console.log(result);
    })
  }