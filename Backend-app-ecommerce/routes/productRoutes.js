const express = require("express");
const router = express.Router();

const pool = require("../data/database");
const authMiddleware = require("../middleware/authMiddleware");

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        products.id,
        products.name,
        products.price,
        products.description,
        products.image,
        products.rating,
        products.user_id AS "userId",
        categories.name AS category,
        products.created_at
      FROM products
      JOIN categories ON products.category_id = categories.id
      ORDER BY products.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo productos:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

// Obtener productos del usuario logueado
router.get("/my-products", authMiddleware, async (req, res) => {
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
        products.created_at
      FROM products
      JOIN categories ON products.category_id = categories.id
      WHERE products.user_id = $1
      ORDER BY products.id DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo mis productos:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

// Crear producto protegido
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    if (!name || !price || !category || !description) {
      return res.status(400).json({
        message: "Faltan datos obligatorios",
      });
    }

    const categoryResult = await pool.query(
      "SELECT id FROM categories WHERE name = $1",
      [category]
    );

    if (categoryResult.rows.length === 0) {
      return res.status(400).json({
        message: "Categoría no válida",
      });
    }

    const categoryId = categoryResult.rows[0].id;

    const result = await pool.query(
      `
      INSERT INTO products
      (name, price, description, image, rating, category_id, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        name,
        Number(price),
        description,
        image,
        0,
        categoryId,
        req.user.id,
      ]
    );

    const newProduct = result.rows[0];

    res.status(201).json({
      message: "Producto creado exitosamente",
      product: {
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        image: newProduct.image,
        rating: newProduct.rating,
        category,
        userId: newProduct.user_id,
      },
    });
  } catch (error) {
    console.error("Error creando producto:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

// Editar producto protegido
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const productResult = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    const product = productResult.rows[0];

    if (product.user_id !== req.user.id) {
      return res.status(403).json({
        message: "No autorizado para editar este producto",
      });
    }

    const { name, price, category, description, image } = req.body;

    let categoryId = product.category_id;

    if (category) {
      const categoryResult = await pool.query(
        "SELECT id FROM categories WHERE name = $1",
        [category]
      );

      if (categoryResult.rows.length === 0) {
        return res.status(400).json({
          message: "Categoría no válida",
        });
      }

      categoryId = categoryResult.rows[0].id;
    }

    const updatedResult = await pool.query(
      `
      UPDATE products
      SET 
        name = $1,
        price = $2,
        description = $3,
        image = $4,
        category_id = $5
      WHERE id = $6
      RETURNING *
      `,
      [
        name ?? product.name,
        price ? Number(price) : product.price,
        description ?? product.description,
        image ?? product.image,
        categoryId,
        id,
      ]
    );

    const updatedProduct = updatedResult.rows[0];

    res.json({
      message: "Producto actualizado exitosamente",
      product: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        description: updatedProduct.description,
        image: updatedProduct.image,
        rating: updatedProduct.rating,
        category: category || product.category,
        userId: updatedProduct.user_id,
      },
    });
  } catch (error) {
    console.error("Error editando producto:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

// Eliminar producto protegido
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const productResult = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    const product = productResult.rows[0];

    if (product.user_id !== req.user.id) {
      return res.status(403).json({
        message: "No autorizado para eliminar este producto",
      });
    }

    const deletedResult = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    res.json({
      message: "Producto eliminado exitosamente",
      product: deletedResult.rows[0],
    });
  } catch (error) {
    console.error("Error eliminando producto:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

// Obtener producto por ID
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

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
        products.created_at
      FROM products
      JOIN categories ON products.category_id = categories.id
      WHERE products.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error obteniendo producto:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

module.exports = router;