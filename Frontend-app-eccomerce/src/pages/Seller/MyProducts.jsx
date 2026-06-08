import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Store,
  Plus,
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { api } from "../../services/api";

function MyProducts() {
  const navigate = useNavigate();

  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyProducts = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const data = await api.get("/products/my-products", token);

      if (Array.isArray(data)) {
        setMyProducts(data);
      } else {
        alert(data.message || "Error al cargar tus productos");
      }
    } catch (error) {
      console.error("Error cargando mis productos:", error);
      alert("Error al cargar tus productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar este producto?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const data = await api.delete(`/products/${id}`, token);

    if (data.product) {
      setMyProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
      alert("Producto eliminado correctamente");
    } else {
      alert(data.message || "Error al eliminar producto");
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 mb-10 text-center md:text-left">
          <div>
            <div className="flex justify-center md:justify-start items-center gap-3 mb-2">
              <Store size={32} />

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Mis productos
              </h1>
            </div>

            <p className="text-slate-500">
              Administra tus publicaciones activas.
            </p>
          </div>

          <Link
            to="/seller/create"
            className="w-full md:w-auto justify-center inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-lg hover:bg-slate-800 hover:scale-105 active:scale-95 transition"
          >
            <Plus size={18} />
            Publicar producto
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-slate-500">
            Cargando tus productos...
          </p>
        ) : myProducts.length === 0 ? (
          <div className="bg-slate-50 border rounded-2xl p-10 text-center max-w-xl mx-auto">
            <Package
              size={48}
              className="mx-auto mb-4 text-slate-400"
            />

            <h2 className="text-2xl font-bold mb-2">
              No tienes productos publicados
            </h2>

            <p className="text-slate-500 mb-6">
              Publica tu primer producto para comenzar a vender.
            </p>

            <Link
              to="/seller/create"
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 hover:scale-105 active:scale-95 transition"
            >
              <Plus size={18} />
              Publicar mi primer producto
            </Link>
          </div>
        ) : (
          <>
            <p className="text-slate-500 mb-6 text-center md:text-left">
              {myProducts.length} producto(s) publicado(s)
            </p>

            <div className="space-y-4">
              {myProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-xl p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                    <img
                      src={
                        product.image ||
                        "https://placehold.co/600x400"
                      }
                      alt={product.name}
                      className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-lg bg-slate-100"
                    />

                    <div>
                      <h2 className="font-bold text-lg">
                        {product.name}
                      </h2>

                      <p className="text-slate-500">
                        $
                        {Number(product.price).toLocaleString(
                          "es-CL"
                        )}{" "}
                        · {product.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Link
                      to={`/seller/edit/${product.id}`}
                      className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-100 active:scale-95 transition"
                    >
                      <Pencil size={16} />
                      Editar
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:scale-95 transition"
                    >
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}

export default MyProducts;