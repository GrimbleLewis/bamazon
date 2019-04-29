DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL auto_increment,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ();