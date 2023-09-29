import createError from "http-errors";
import express from "express";
import flash from "express-flash";
import session from "express-session";
import productsRouter from "./routes/products.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow the specified HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// view engine setup
app.set("view engine", "ejs");

// Increase payload size limit
app.use(express.json({ limit: "10mb" })); // Set a larger limit (e.g., 10 megabytes)
app.use(express.urlencoded({ limit: "10mb", extended: false })); // Set a larger limit (e.g., 10 megabytes)

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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting the server: ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
