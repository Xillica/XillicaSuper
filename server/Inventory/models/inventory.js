import pgPromise from "pg-promise";

const pgp = pgPromise();

const dbConfig = {
  user: "udana",
  host: "goblin-dragon-6554.8nk.cockroachlabs.cloud",
  database: "inventory",
  password: "pKjmZrVrbZ0KPs2Q1iUh8A",
  port: 26257,
  ssl: {
    rejectUnauthorized: false,
  },
};

const db = pgp(dbConfig);

// Function to create tables
async function createTables() {
  try {
    // Create the 'products' table
    await db.none(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        coverImage VARCHAR(512),
        description VARCHAR(700) NOT NULL,
        category VARCHAR(30) NOT NULL,
        gender VARCHAR(30) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        supplier VARCHAR(255) NOT NULL,
        added_date DATE NOT NULL,
        likes VARCHAR(255)
      );
    `);

    // Create the 'colors' table
    await db.none(`
      CREATE TABLE IF NOT EXISTS colors (
        id SERIAL PRIMARY KEY,
        product_id INT REFERENCES products(id) ON DELETE CASCADE,
        selectedFile VARCHAR(512),
        color VARCHAR(20)
      );
    `);

    // Create the 'sizes' table
    await db.none(`
      CREATE TABLE IF NOT EXISTS sizes (
        id SERIAL PRIMARY KEY,
        product_id INT REFERENCES products(id) ON DELETE CASCADE,
        color_id INT REFERENCES colors(id) ON DELETE CASCADE,
        size_name VARCHAR(20) NOT NULL
      );
    `);

    // Create the 'quantity' table
    await db.none(`
      CREATE TABLE IF NOT EXISTS quantity (
        id SERIAL PRIMARY KEY,
        product_id INT REFERENCES products(id) ON DELETE CASCADE,
        size_id INT REFERENCES sizes(id) ON DELETE CASCADE,
        color_id INT REFERENCES colors(id) ON DELETE CASCADE,
        quantity INT NOT NULL
      );
    `);

    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

// Call the createTables function to create the tables
createTables();

// Export the database connection
export default db;
