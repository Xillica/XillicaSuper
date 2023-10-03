import createError from "http-errors";
import express from "express";
import flash from "express-flash";
import session from "express-session";
import productsRouter from "./routes/products.js";
import cors from "cors";
import db from "./models/inventory.js"; // Import the database connection

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.set("view engine", "ejs");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));

app.use(
  session({
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: true,
    secret: "secret",
  })
);

app.use(flash());
app.use("/products", productsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT || 8080;

// Use the database connection
db.connect()
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
