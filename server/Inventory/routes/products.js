import express from "express";
const router = express.Router();

// Import the database connection
import db from "../models/inventory.js"; // Adjust the import path as needed

// Retrieve all products
router.get("/", async (req, res) => {
  try {
    const products = await db.any(
      "SELECT * FROM products ORDER BY likes DESC, price DESC"
    );
    console.log("Products fetched successfully!");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve a product by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await db.oneOrNone(
      "SELECT * FROM products WHERE id = $1",
      id
    );

    if (product) {
      console.log("Product fetched successfully!");
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve products by color
router.get("/color/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = `
      SELECT *
      FROM colors
      WHERE product_id = $1`;

    const products = await db.any(query, [id]);
    console.log("Products fetched successfully!");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/sizes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = `
      SELECT *
      FROM sizes
      WHERE product_id = $1`;

    const products = await db.any(query, [id]);
    console.log("Products fetched successfully!");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/quantity/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = `
      SELECT *
      FROM quantity
      WHERE product_id = $1`;

    const products = await db.any(query, [id]);
    console.log("Products fetched successfully!");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new product or update quantity if name and price match
router.post("/add", async (req, res) => {
  try {
    const product = req.body;
    const product_name = product.product_name;
    const description = product.description;
    const category = product.category;
    const supplier = product.supplier;
    const price = parseFloat(product.price);
    const added_date = new Date();
    const likes = 0;

    // Validate the request data
    if (
      !product_name ||
      !description ||
      !category ||
      !supplier ||
      isNaN(price)
    ) {
      res.status(400).json({ error: "Bad Request" });
      return;
    }

    // Check if a product with the same name and price already exists
    const checkQuery =
      "SELECT id FROM products WHERE product_name = $1 AND price = $2";
    const existingProduct = await db.oneOrNone(checkQuery, [
      product_name,
      price,
    ]);

    if (existingProduct) {
      res.status(409).json({
        error: "Product with the same name and price already exists",
      });
      return;
    }

    // Insert the new product
    const insertQuery =
      "INSERT INTO products (product_name, coverImage, description, category, gender, price, supplier, added_date, likes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    await db.none(insertQuery, [
      product.product_name,
      product.coverImage,
      product.description,
      product.category,
      product.gender,
      product.price,
      product.supplier,
      added_date,
      likes,
    ]);

    console.log("Product Added successfully!");
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update product data, keeping existing data if not sent
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product_name = req.body.product_name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const supplier = req.body.supplier;

    // Fetch the existing data from the database
    const existingProduct = await db.oneOrNone(
      "SELECT * FROM products WHERE id = $1",
      id
    );

    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Construct the form data with existing data as defaults
    const form_data = {
      product_name: product_name || existingProduct.product_name,
      quantity: quantity || existingProduct.quantity,
      price: price || existingProduct.price,
      supplier: supplier || existingProduct.supplier,
      added_date: existingProduct.added_date, // Keep the existing added_date
    };

    // Update the product
    const updateQuery = "UPDATE products SET $1:name = $2 WHERE id = $3";
    await db.none(updateQuery, [
      Object.keys(form_data),
      ...Object.values(form_data),
      id,
    ]);

    console.log("Product updated successfully!");
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete product if it exists
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the product with the specified ID exists
    const existingProduct = await db.oneOrNone(
      "SELECT * FROM products WHERE id = $1",
      id
    );

    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Delete the product
    await db.none("DELETE FROM products WHERE id = $1", id);

    console.log("Product deleted successfully");
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updateDetails/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { color, selectedFile, xsq, sq, mq, lq, xlq, xxlq, txlq, fxlq } =
      req.body;

    const colorData = {
      product_id: id,
      color: color,
      selectedFile: selectedFile,
    };

    // Check if the color is already in use for the specified product
    const colorCheckQuery =
      "SELECT * FROM products p JOIN colors c ON p.id = c.product_id WHERE p.id = $1 AND c.color = $2";
    const existingColor = await db.oneOrNone(colorCheckQuery, [id, color]);

    if (existingColor) {
      res.status(400).json({ error: "Color is already in use." });
      return;
    }

    // Insert color data into the colors table
    const insertColorQuery =
      "INSERT INTO colors (product_id, color, selectedFile) VALUES ($1, $2, $3) RETURNING *"; // Note the "RETURNING *" part
    const addedColor = await db.one(insertColorQuery, [
      colorData.product_id,
      colorData.color,
      colorData.selectedFile,
    ]);
    console.log("Added Color:", addedColor);

    const colorId = addedColor.id;
    // Get the colorId from the inserted color
    // const getColorIdQuery =
    //   "SELECT id FROM colors WHERE product_id = $1 AND color = $2";
    // const colorId = await db.one(getColorIdQuery, [id, color]);

    // console.log(id);

    // Update the sizes table if quantities are available
    const sizes = [
      { name: "XS", quantity: xsq },
      { name: "Small", quantity: sq },
      { name: "Medium", quantity: mq },
      { name: "Large", quantity: lq },
      { name: "XL", quantity: xlq },
      { name: "2XL", quantity: xxlq },
      { name: "3XL", quantity: txlq },
      { name: "4XL", quantity: fxlq },
    ];

    for (const size of sizes) {
      if (size.quantity) {
        // Insert or update the size in the sizes table
        const insertSizeQuery =
          "INSERT INTO sizes (product_id, color_id, size_name) VALUES ($1, $2, $3)";
        await db.none(insertSizeQuery, [id, colorId, size.name]);

        const sizeId = await db.oneOrNone(
          "SELECT id FROM sizes WHERE product_id = $1 AND color_id = $2 AND size_name = $3",
          [id, colorId, size.name]
        );

        console.log("sizeId: ", sizeId.id);

        // const getSizeIdQuery =
        //   "SELECT id FROM sizes WHERE product_id = $1 AND color = $2 AND size_name = $3";
        // const sizeId = await db.one(getSizeIdQuery, [id, color, size.name]);

        const insertQuantityQuery =
          "INSERT INTO quantity (product_id, size_id, color_id, quantity) VALUES ($1, $2, $3, $4)";
        await db.none(insertQuantityQuery, [
          id,
          sizeId.id,
          colorId,
          size.quantity,
        ]);

      }
    }

    // Return success response
    res.status(200).json({
      success: "Color and sizes inserted/updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

// router.get("/", (req, res, next) => {
//   connection.query(
//     "SELECT " +
//       "p.id AS product_id, " + // Rename p.id to product_id
//       "p.product_name, " +
//       "p.description, " +
//       "p.category, " +
//       "p.gender, " +
//       "p.price, " +
//       "p.supplier, " +
//       "p.added_date, " +
//       "p.likes, " +
//       "c.productId AS color_productId, " + // Rename c.productId to color_productId
//       "c.selectedFile AS color_selectedFile, " + // Rename c.selectedFile to color_selectedFile
//       "c.color, " +
//       "s.productId AS size_productId, " + // Rename s.productId to size_productId
//       "s.size_name, " +
//       "q.productId AS quantity_productId, " + // Rename q.productId to quantity_productId
//       "q.sizeId AS quantity_sizeId, " + // Rename q.sizeId to quantity_sizeId
//       "q.colorId AS quantity_colorId, " + // Rename q.colorId to quantity_colorId
//       "q.quantity " +
//       "FROM products p " +
//       "LEFT JOIN colors c ON p.id = c.productId " +
//       "LEFT JOIN sizes s ON p.id = s.productId " +
//       "LEFT JOIN quantity q ON p.id = q.productId " +
//       "ORDER BY p.id DESC",
//     (err, rows) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal Server Error" });
//       } else {
//         console.log("Products fetched successfully!");
//         res.json(rows);
//       }
//     }
//   );
// });

// router.post("/add-order", async (req, res) => {
//   const { productId, quantity } = req.query;

//   connection.query(
//     "SELECT * FROM products WHERE id = ?",
//     [productId],
//     (selectErr, rows) => {
//       if (selectErr) {
//         console.error(selectErr);
//         return res.status(500).json({ error: "Internal Server Error" });
//       } else if (rows.length === 0) {
//         return res.status(404).json({ error: "Product not found" });
//       } else {
//         const existingData = rows[0];
//         const newQuantity = existingData.quantity - quantity;

//         if (newQuantity < 0) {
//           return res
//             .status(400)
//             .send({ error: "Insufficient quantity available" });
//         }

//         const form_data = {
//           product_name: existingData.product_name,
//           quantity: newQuantity,
//           price: existingData.price,
//           supplier: existingData.supplier,
//           added_date: existingData.added_date,
//         };

//         // Update the product in the database
//         connection.query(
//           "UPDATE products SET ? WHERE id = ?",
//           [form_data, productId],
//           (updateErr, result) => {
//             if (updateErr) {
//               console.error(updateErr);
//               return res.status(500).json({ error: "Internal Server Error" });
//             } else {
//               // Calculate the amount
//               res.json({ existingData: existingData });
//             }
//           }
//         );
//       }
//     }
//   );
// });

// router.post("/update-order", async (req, res) => {
//   const { productId, data, exData } = req.query;
//   const newData = JSON.parse(data);
//   const existingData = JSON.parse(exData);

//   connection.query(
//     "SELECT * FROM products WHERE id = ?",
//     [productId],
//     async (selectErr, rows) => {
//       if (selectErr) {
//         console.error(selectErr);
//         return res.status(500).json({ error: "Internal Server Error" });
//       } else if (rows.length === 0) {
//         return res.status(404).json({ error: "Product not found" });
//       } else {
//         const existingProductData = rows[0];
//         const existingProductQuantity = existingProductData.quantity;

//         // Calculate the difference between the new quantity and the old quantity
//         const checkQuantity =
//           existingProductQuantity + existingData.quantity - newData.quantity;

//         // Check if the new quantity is valid based on product availability
//         if (checkQuantity < 0) {
//           return res
//             .status(400)
//             .json({ error: "Insufficient quantity available" });
//         }

//         // Update the product quantity in the database
//         const updatedProductQuantity =
//           existingProductQuantity + existingData.quantity - newData.quantity;

//         // Calculate the fullAmount based on the new quantity and unit price
//         newData.fullAmount = existingData.unitPrice * newData.quantity;

//         connection.query(
//           "UPDATE products SET quantity = ? WHERE id = ?",
//           [updatedProductQuantity, productId],
//           (updateErr, result) => {
//             if (updateErr) {
//               console.error(updateErr);
//               return res.status(500).json({ error: "Internal Server Error" });
//             } else {
//               // Merge the existing data with the new data
//               const updatedData = { ...existingData, ...newData };
//               res.json({ updatedData: updatedData });
//             }
//           }
//         );
//       }
//     }
//   );
// });

// router.post("/delete-order", async (req, res) => {
//   const { productId, quantityToAdd } = req.query;
//   connection.query(
//     "UPDATE products SET quantity = quantity + ? WHERE id = ?",
//     [quantityToAdd, productId],
//     (updateErr, result) => {
//       if (updateErr) {
//         console.error(updateErr);
//         return res.status(500).json({ error: "Internal Server Error" });
//       } else {
//         res.json({ status: "true" });
//       }
//     }
//   );
// });
