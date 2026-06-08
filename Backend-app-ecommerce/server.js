require("dotenv").config();

const app = require("./app");
const pool = require("./data/database");

const PORT = process.env.PORT || 5000;

pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("✅ PostgreSQL conectado correctamente");
  })
  .catch((error) => {
    console.log("❌ Error conectando a PostgreSQL");
    console.log(error.message);
  });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});