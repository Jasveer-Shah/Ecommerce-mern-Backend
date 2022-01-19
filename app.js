const express = require('express');
const app = express();
app.use(express.json());
const errorMiddleware = require("./middleware/error")

// Route Imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute")
app.use("/api/v1", productRoute)   // getAllProducts(); 
app.use("/api/v1", userRoute)

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;