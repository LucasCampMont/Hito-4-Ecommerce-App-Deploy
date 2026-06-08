import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAppContext } from "../../context/AppContext";
import { api } from "../../services/api";

function CreateProduct() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "Tecnología",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Tu sesión expiró. Inicia sesión nuevamente.");
      navigate("/login");
      return;
    }

    const productData = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      category: form.category,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    };

    const data = await api.post("/products", productData, token);

    if (data.product) {
      alert("Producto publicado correctamente");
      navigate("/seller/products");
    } else {
      alert(data.message || "Error al publicar producto");
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />

        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="bg-slate-50 border rounded-xl p-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Inicia sesión para vender
            </h1>

            <p className="text-slate-500 mb-8">
              Debes iniciar sesión para publicar productos en Andesora.
            </p>

            <Link
              to="/login"
              className="inline-block bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition"
            >
              Iniciar sesión
            </Link>
          </div>
        </section>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-3">
          Publicar producto
        </h1>

        <p className="text-center text-slate-500 mb-10">
          Crea una nueva publicación para vender en Andesora.
        </p>

        <form
          onSubmit={handleCreateProduct}
          className="bg-white border rounded-2xl shadow-sm p-8"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            placeholder="Nombre del producto"
            required
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            placeholder="Precio"
            type="number"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded h-32"
            placeholder="Descripción"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          >
            <option>Tecnología</option>
            <option>Hogar</option>
            <option>Moda</option>
            <option>Deportes</option>
            <option>Outdoor</option>
            <option>Vehículos</option>
            <option>Juguetes</option>
            <option>Salud y Belleza</option>
            <option>Alimentos y Bebidas</option>
            <option>Entretenimiento</option>
            <option>Música</option>
            <option>Libros</option>
            <option>Películas</option>
            <option>Videojuegos</option>
            <option>Ropa</option>
            <option>Calzado</option>
            <option>Accesorios</option>
          </select>

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-3 mb-6 rounded"
            placeholder="URL de imagen"
          />

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded hover:bg-slate-800 transition"
          >
            Publicar producto
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
}

export default CreateProduct;