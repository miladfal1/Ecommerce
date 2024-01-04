require("dotenv").config();
const express = require("express");
const { productRouter, taskRouter } = require("./routes");
const { PrismaClientKnownRequestError } = require("@prisma/client");
const { MyError } = require("./error");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

/// Routes
app.use("/api/products", productRouter);

/// Not Found
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

/// error handlers

app.listen(PORT, () => {
  console.log(`server is runnnig on port ${PORT}`);
});