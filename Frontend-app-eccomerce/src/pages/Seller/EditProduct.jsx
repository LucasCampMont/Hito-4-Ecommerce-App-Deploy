import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { api } from "../../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productFound, setProductFound] = useState(true);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "Tecnología",
    image: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      const data = await api.get(`/products/${id}`);

      if (data.message === "Producto no encontrado") {
        setProductFound(false);
      } else {
        setForm({
          name: data.name || "",
          price: data.price || "",
          description: data.description || "",
          category: data.category || "Tecnología",
          image: data.image || "",
        });
      }

      setLoading(false);
    };

    getProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Tu sesión expiró. Inicia sesión nuevamente.");
      navigate("/login");
      return;
    }

    const data = await api.put(
      `/products/${id}`,
      {
        name: form.name,
        price: Number(form.price),
        description: form.description,
        category: form.category,
        image: form.image,
      },
      token
    );

    if (data.product) {
      alert("Producto actualizado correctamente");
      navigate("/seller/products");
    } else {
      alert(data.message || "Error al actualizar producto");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-slate-500">Cargando producto...</p>
        </section>

        <Footer />
      </>
    );
  }

  if (!productFound) {
    return (
      <>
        <Navbar />

        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="bg-slate-50 border rounded-xl p-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Producto no encontrado
            </h1>

            <p className="text-slate-500 mb-8">
              Este producto no existe o fue eliminado.
            </p>

            <Link
              to="/seller/products"
              className="inline-block bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition"
            >
              Volver a mis productos
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
          Editar producto
        </h1>

        <p className="text-center text-slate-500 mb-10">
          Actualiza la información de tu publicación.
        </p>

        <form
          onSubmit={handleUpdateProduct}
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
            <option>Auto & Moto</option>
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
            Guardar cambios
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
}

export default EditProduct;