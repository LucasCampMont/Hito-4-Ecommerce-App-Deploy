const express = require("express");
const router = express.Router();

const pool = require("../data/database");
const authMiddleware = require("../middleware/authMiddleware");

// Obtener favoritos del usuario logueado
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        products.id,
        products.name,
        products.price,
        products.description,
        products.image,
        products.rating,
        products.user_id AS "userId",
        categories.name AS category,
        favorites.created_at
      FROM favorites
      JOIN products ON favorites.product_id = products.id
      JOIN categories ON products.category_id = categories.id
      WHERE favorites.user_id = $1
      ORDER BY favorites.created_at DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo favoritos:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

// Agregar favorito
router.post("/:productId", authMiddleware, async (req, res) => {
  try {
    const productId = Number(req.params.productId);

    const productResult = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [productId]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO favorites (user_id, product_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, product_id) DO NOTHING
      RETURNING *
      `,
      [req.user.id, productId]
    );

    res.status(201).json({
      message: "Producto agregado a favoritos",
      favorite: result.rows[0] || null,
    });
  } catch (error) {
    console.error("Error agregando favorito:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

// Eliminar favorito
router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    const productId = Number(req.params.productId);

    const result = await pool.query(
      `
      DELETE FROM favorites
      WHERE user_id = $1 AND product_id = $2
      RETURNING *
      `,
      [req.user.id, productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Favorito no encontrado",
      });
    }

    res.json({
      message: "Producto eliminado de favoritos",
      favorite: result.rows[0],
    });
  } catch (error) {
    console.error("Error eliminando favorito:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

module.exports = router;