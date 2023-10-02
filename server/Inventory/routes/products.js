import express from "express";
const router = express.Router();
import connection from "../models/inventory.js";
import e from "method-override";

// Display all products
router.get("/", (req, res, next) => {
  connection.query(
    "SELECT * FROM products ORDER BY likes DESC, price DESC",
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Products fetched successfully!");
        res.json(rows);
      }
    }
  );
});

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
router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  connection.query(
    "SELECT " +
      "p.id AS product_id, " + // Rename p.id to product_id
      "p.product_name, " +
      "p.coverImage, " +
      "p.description, " +
      "p.category, " +
      "p.gender, " +
      "p.price, " +
      "p.supplier, " +
      "p.added_date, " +
      "p.likes, " +
      "c.selectedFile AS color_selectedFile, " + // Rename c.selectedFile to color_selectedFile
      "c.color, " +
      "s.size_name, " +
      "q.quantity " +
      "FROM products p " +
      "JOIN colors c ON p.id = c.productId " +
      "JOIN sizes s ON p.id = s.productId AND c.id = s.colorID " +
      "JOIN quantity q ON p.id = q.productId AND c.id = q.colorId AND s.id = q.sizeId " +
      "WHERE p.id = ? " +
      "ORDER BY p.id DESC",
    [id],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Products fetched successfully!");
        res.json(rows);
      }
    }
  );
});

// Add a new product or update quantity if name and price match
router.post("/add", (req, res, next) => {
  const product = req.body;
  const product_name = product.product_name;
  const description = product.description;
  const category = product.category;
  const supplier = product.supplier;

  //console.log(product);

  // Validate the request data
  if (!product_name || !description || !category || !supplier) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  // Construct the form data, including the added_date
  const form_data = {
    ...product,
    added_date: new Date(), // Set the current date and time
    likes: 0,
  };

  // Check if a product with the same name and price already exists
  connection.query(
    "INSERT INTO products SET ?",
    form_data, // Pass the form_data directly
    (insertErr, result) => {
      if (insertErr) {
        console.error(insertErr);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Product Added successfully!");
        res.status(201).json({
          message: "Product added successfully",
          product: form_data,
        });
      }
    }
  );
});

// Update product data, keeping existing data if not sent
router.put("/update/:id", (req, res, next) => {
  const id = req.params.id;
  const product_name = req.body.product_name;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const supplier = req.body.supplier;

  // Fetch the existing data from the database
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (selectErr, rows) => {
      if (selectErr) {
        console.error(selectErr);
        res.status(500).json({ error: "Internal Server Error" });
      } else if (rows.length === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        const existingData = rows[0];

        // Construct the form data with existing data as defaults
        const form_data = {
          product_name: product_name || existingData.product_name,
          quantity: quantity || existingData.quantity,
          price: price || existingData.price,
          supplier: supplier || existingData.supplier,
          added_date: existingData.added_date, // Keep the existing added_date
        };

        // Update query
        connection.query(
          "UPDATE products SET ? WHERE id = ?",
          [form_data, id],
          (updateErr, result) => {
            if (updateErr) {
              console.error(updateErr);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              // Send a JSON response indicating success
              res.status(200).json({
                message: "Product updated successfully",
                updatedData: form_data,
              });
            }
          }
        );
      }
    }
  );
});

// Delete product if it exists
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  // Check if the product with the specified ID exists
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (selectErr, rows) => {
      if (selectErr) {
        console.error(selectErr);
        res.status(500).json({ error: "Internal Server Error" });
      } else if (rows.length === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        // Product with the specified ID exists, proceed with deletion
        connection.query(
          "DELETE FROM products WHERE id = ?",
          [id],
          (deleteErr, result) => {
            if (deleteErr) {
              console.error(deleteErr);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              console.log("Product deleted successfully");
              res.status(200).json({ message: "Product deleted successfully" });
            }
          }
        );
      }
    }
  );
});

router.post("/add-order", async (req, res) => {
  const { productId, quantity } = req.query;

  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (selectErr, rows) => {
      if (selectErr) {
        console.error(selectErr);
        return res.status(500).json({ error: "Internal Server Error" });
      } else if (rows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      } else {
        const existingData = rows[0];
        const newQuantity = existingData.quantity - quantity;

        if (newQuantity < 0) {
          return res
            .status(400)
            .send({ error: "Insufficient quantity available" });
        }

        const form_data = {
          product_name: existingData.product_name,
          quantity: newQuantity,
          price: existingData.price,
          supplier: existingData.supplier,
          added_date: existingData.added_date,
        };

        // Update the product in the database
        connection.query(
          "UPDATE products SET ? WHERE id = ?",
          [form_data, productId],
          (updateErr, result) => {
            if (updateErr) {
              console.error(updateErr);
              return res.status(500).json({ error: "Internal Server Error" });
            } else {
              // Calculate the amount
              res.json({ existingData: existingData });
            }
          }
        );
      }
    }
  );
});

router.post("/update-order", async (req, res) => {
  const { productId, data, exData } = req.query;
  const newData = JSON.parse(data);
  const existingData = JSON.parse(exData);

  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    async (selectErr, rows) => {
      if (selectErr) {
        console.error(selectErr);
        return res.status(500).json({ error: "Internal Server Error" });
      } else if (rows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      } else {
        const existingProductData = rows[0];
        const existingProductQuantity = existingProductData.quantity;

        // Calculate the difference between the new quantity and the old quantity
        const checkQuantity =
          existingProductQuantity + existingData.quantity - newData.quantity;

        // Check if the new quantity is valid based on product availability
        if (checkQuantity < 0) {
          return res
            .status(400)
            .json({ error: "Insufficient quantity available" });
        }

        // Update the product quantity in the database
        const updatedProductQuantity =
          existingProductQuantity + existingData.quantity - newData.quantity;

        // Calculate the fullAmount based on the new quantity and unit price
        newData.fullAmount = existingData.unitPrice * newData.quantity;

        connection.query(
          "UPDATE products SET quantity = ? WHERE id = ?",
          [updatedProductQuantity, productId],
          (updateErr, result) => {
            if (updateErr) {
              console.error(updateErr);
              return res.status(500).json({ error: "Internal Server Error" });
            } else {
              // Merge the existing data with the new data
              const updatedData = { ...existingData, ...newData };
              res.json({ updatedData: updatedData });
            }
          }
        );
      }
    }
  );
});

router.post("/delete-order", async (req, res) => {
  const { productId, quantityToAdd } = req.query;
  connection.query(
    "UPDATE products SET quantity = quantity + ? WHERE id = ?",
    [quantityToAdd, productId],
    (updateErr, result) => {
      if (updateErr) {
        console.error(updateErr);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ status: "true" });
      }
    }
  );
});

export default router;

router.put("/updateDetails/:id", async (req, res) => {
  const id = req.params.id;
  const { color, selectedFile, xsq, sq, mq, lq, xlq, xxlq, txlq, fxlq } =
    req.body;

  const colorData = {
    productId: id,
    color: color,
    selectedFile: selectedFile,
  };

  connection.query(
    "SELECT * FROM products p JOIN colors c ON p.id = c.productId WHERE p.id = ? AND c.color = ?",
    [id, color],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (rows.length > 0) {
          return res.status(400).json({ error: "Color is already in use." });
        } else {
          // Insert color data into the colors table
          connection.query(
            "INSERT INTO colors SET ?",
            [colorData],
            (insertErr, result) => {
              if (insertErr) {
                console.error(insertErr);
                return res
                  .status(500)
                  .json({ error: "Failed to insert color." });
              }
              // Get the colorId from the inserted color
              const colorId = result.insertId;

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

              sizes.forEach((size) => {
                if (size.quantity) {
                  // Insert or update the size in the sizes table
                  connection.query(
                    "INSERT INTO sizes (productId, colorId, size_name) VALUES (?, ?, ?)",
                    [id, colorId, size.name],
                    (sizeErr, sizeResult) => {
                      if (sizeErr) {
                        console.error(sizeErr);
                        return res
                          .status(500)
                          .json({ error: "Failed to insert/update size." });
                      }
                      const quantityData = {
                        productId: id,
                        sizeId: sizeResult.insertId,
                        colorId: colorId,
                        quantity: size.quantity,
                      };
                      connection.query(
                        "INSERT INTO quantity SET ?",
                        [quantityData],
                        (quantityErr) => {
                          if (quantityErr) {
                            console.error(quantityErr);
                            return res
                              .status(500)
                              .json({ error: "Failed to insert quantity." });
                          }
                        }
                      );
                    }
                  );
                }
              });

              // Return success response
              return res.status(200).json({
                success: "Color and sizes inserted/updated successfully.",
              });
            }
          );
        }
      }
    }
  );
});
