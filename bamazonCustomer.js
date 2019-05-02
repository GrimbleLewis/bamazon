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

function showProducts() {
  var sql = "SELECT item_id,product_name,price from products";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " +
          res[i].item_id +
          " || Product: " +
          res[i].product_name +
          " || Price: " +
          res[i].price
      );
    }
    purchaseProduct();
  });
}

function purchaseProduct() {
  connection.query("SELECT item_id,stock_quantity from products", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message:
            "What is the item ID number of the product you would like to buy?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            console.log("  Please provide a number\n");
            return false;
          }
        },
        {
          name: "amount",
          type: "input",
          message: "How many units of this product would you like to buy?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            console.log("  Please provide a number\n");
            return false;
          }
        }
      ])
      .then(function(answer) {
        console.log(answer);
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === parseInt(answer.item)) {
            chosenItem = res[i];
          }
          
        }

      // console.log(res);
      console.log(chosenItem);

        if (chosenItem.stock_quantity < parseInt(answer.amount)) {
          console.log("Toomuch");
        } else {
          console.log("other");
        }
      });
  });
}
