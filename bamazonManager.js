// Welcome to the Bamazon node app!
// This is the manager side of the shopping app that allows the user to look at the current items in the inventory,
// view low stock inventory, purchase inventory, and add products to the inventory
// This app requires npm to install mysql and inquirer
// To begin, run this file (bamazonManager) in the terminal and follow the prompts!

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "W00tl00t@",
  database: "bamazonDB"
});

//creates a connection and runs the showProducts function once the connection is established
connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "managerchoice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.managerchoice === "View Products for Sale") {
        viewProducts();
      } else if (answer.managerchoice === "View Low Inventory") {
        lowInventory();
      } else if (answer.managerchoice === "Add to Inventory") {
        addInventory();
      } else if (answer.managerchoice === "Add New Product") {
        addProduct();
      } else {
        connection.end();
      }
    });
}
// function that displays the table data in neat rows in the node console for the user to look through
// then runs the start function
function viewProducts() {
  var sql = "SELECT item_id,product_name,price,stock_quantity from products";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " +
          res[i].item_id +
          " || Product: " +
          res[i].product_name +
          " || Price: " +
          res[i].price +
          " || Stock Quantity: " +
          res[i].stock_quantity
      );
    }
    start();
  });
}

// this function runs through the table and checks if any quantity is below 5
// if so it console logs the item(s) and says to order more.
function lowInventory() {
  connection.query("SELECT * from products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      if (res[i].stock_quantity < 5) {
        console.log(
          "\nLow quantity! Please order more!\nItem ID: " +
            res[i].item_id +
            " || Product: " +
            res[i].product_name +
            " || Price: " +
            res[i].price +
            " || Stock Quantity: " +
            res[i].stock_quantity +
            "\n"
        );
      }
    }
    start();
  });
}

// this function asks the user which item they would like the purchase more of and updates the table based on their answers
function addInventory() {
  connection.query("SELECT * from products", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message:
            "What is the item ID number of the product you would like to order more of?",
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
      // with the users answers we run a loop that determines which item they are referring to
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === parseInt(answer.item)) {
            chosenItem = res[i];
          }
        }
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity:
                chosenItem.stock_quantity + parseInt(answer.amount)
            },
            {
              item_id: chosenItem.item_id
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("\nOrder placed!\n");
            start();
          }
        );
      });
  });
}

// this function lets the user add product to the table based on the input provided from the prompts
function addProduct() {
  inquirer.prompt([
    {
      name: "item",
      type: "input",
      message: "What item would you like add to the inventory?"
    },
    {
      name: "department",
      type: "input",
      message: "What department will the item be placed in?"
    },
    {
      name: "price",
      type: "input",
      message: "How much will you be selling the item for?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "stock",
      type: "input",
      message: "How many would you like to buy?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(answer) {
    connection.query(
        "INSERT INTO products SET ?",
        {
            product_name: answer.item,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.stock
        },
        function(err) {
            if (err) throw err;
            console.log("\nYou successfully added the product!\n");
            start();
          }
    );
  });
}
