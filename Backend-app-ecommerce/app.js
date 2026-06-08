const express = require("express");
const cors = require("cors");

const favoritesRoutes = require("./routes/favoritesRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoritesRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API Andesora funcionando correctamente",
  });
});

module.exports = app;