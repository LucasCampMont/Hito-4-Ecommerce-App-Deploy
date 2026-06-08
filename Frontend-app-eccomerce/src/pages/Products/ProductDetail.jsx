import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAppContext } from "../../context/AppContext";
import { api } from "../../services/api";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    addToCart,
    isLoggedIn,
    toggleFavorite,
    isFavorite,
  } = useAppContext();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await api.get(`/products/${id}`);

        if (data.message === "Producto no encontrado") {
          setProduct(null);
        } else {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error cargando producto:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <section className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-slate-500">
            Cargando producto...
          </p>
        </section>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <section className="max-w-5xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-slate-900">
            Producto no encontrado
          </h1>
        </section>

        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    addToCart(product);
  };

  const handleFavorite = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    toggleFavorite(product);
  };

  const favorite = isFavorite(product.id);

  return (
    <>
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div className="bg-slate-100 rounded-xl overflow-hidden h-96">
          <img
            src={product.image || "https://placehold.co/600x400"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm mb-4">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {product.name}
          </h1>

          <p className="text-slate-500 mb-6">
            {product.description}
          </p>

          <p className="text-3xl font-bold text-slate-900 mb-8">
            ${Number(product.price).toLocaleString("es-CL")}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-slate-900 text-white px-8 py-4 rounded-lg hover:bg-slate-800 transition"
            >
              Agregar al carrito
            </button>

            <button
              onClick={handleFavorite}
              className="border border-slate-300 px-6 py-4 rounded-lg hover:bg-slate-100 transition text-2xl"
            >
              {favorite ? "❤️" : "🤍"}
            </button>
          </div>

          {!isLoggedIn && (
            <p className="text-sm text-slate-500 mt-4">
              Debes iniciar sesión para comprar o guardar favoritos.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductDetail;