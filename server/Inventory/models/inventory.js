import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306, // Default MySQL port is 3306
  password: "",
  connectionLimit: 10000,
});

connection.connect((error) => {
  if (!!error) {
    console.log(error);
  } else {
    console.log("MySQL Server Connected Successfully..!!");
    createDatabase();
  }
});

function createDatabase() {
  // Create the 'inventory' database if it doesn't exist
  connection.query("CREATE DATABASE IF NOT EXISTS inventory", (error) => {
    if (error) {
      console.log("Error creating database:", error);
      connection.end(); // Close the connection if there's an error
    } else {
      console.log("Database 'inventory' created successfully.");
      useDatabase();
    }
  });
}

function useDatabase() {
  // Use the 'inventory' database
  connection.query("USE inventory", (error) => {
    if (error) {
      console.log("Error selecting database:", error);
      connection.end(); // Close the connection if there's an error
    } else {
      console.log("Using database 'inventory'.");
      createTables();
    }
  });
}

function createTables() {
  // Create the 'products' table if it doesn't exist
  const createProductsTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description VARCHAR(700) NOT NULL,
    category VARCHAR(30) NOT NULL,
    gender VARCHAR(30) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    supplier VARCHAR(255) NOT NULL,
    added_date DATE NOT NULL,
    likes VARCHAR(255)
  );
  `;

  // Create the 'colors' table with a foreign key constraint
  const createColorsTableQuery = `
  CREATE TABLE IF NOT EXISTS colors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT,
    selectedFile VARCHAR(512), 
    color VARCHAR(20),
    FOREIGN KEY (productId) REFERENCES products(id)
  );
  `;

  // Create the 'sizes' table
  const createSizesTableQuery = `
  CREATE TABLE IF NOT EXISTS sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT,
    colorId INT,
    size_name VARCHAR(20) NOT NULL,
    FOREIGN KEY (productId) REFERENCES products(id),
    FOREIGN KEY (colorId) REFERENCES colors(id)
);
  `;

  // Create the 'quantity' table with foreign keys
  const createQuantityTableQuery = `
  CREATE TABLE IF NOT EXISTS quantity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT,
    sizeId INT,
    colorId INT,
    quantity INT NOT NULL,
    FOREIGN KEY (productId) REFERENCES products(id),
    FOREIGN KEY (sizeId) REFERENCES sizes(id),
    FOREIGN KEY (colorId) REFERENCES colors(id)
  );
  `;

  // Run each query separately
  connection.query(createProductsTableQuery, (error) => {
    if (error) {
      console.log("Error creating 'products' table:", error);
    } else {
      console.log("'products' table created successfully.");
      // After 'products' table is created, create other tables
      connection.query(createColorsTableQuery, (error) => {
        if (error) {
          console.log("Error creating 'colors' table:", error);
        } else {
          console.log("'colors' table created successfully.");
          connection.query(createSizesTableQuery, (error) => {
            if (error) {
              console.log("Error creating 'sizes' table:", error);
            } else {
              console.log("'sizes' table created successfully.");
              connection.query(createQuantityTableQuery, (error) => {
                if (error) {
                  console.log("Error creating 'quantity' table:", error);
                } else {
                  console.log("'quantity' table created successfully.");
                }
              });
            }
          });
        }
      });
    }
  });
}

export default connection;
