import express from "express";
import orderRouter from "./routes/orders.js"

const app = express();
app.use(express.json());

app.use("/orders", orderRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting the server: ${err}`);
  } else {
    console.log(`Listening on port ${PORT}`);
  }
});
