DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shamwow", "Cleaning", 19.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Thing Longer", "Tools", 9.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Goats Milk", "Food", 5.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Story Book", "Books", 12.89, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Toy", "Animals", 4.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Toy", "Animals", 5.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toothbrush", "Personal Care", 13.00, 550);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lamp", "Furniture", 27.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rocketship", "Space", 999.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gum", "Food", 0.99, 1000);