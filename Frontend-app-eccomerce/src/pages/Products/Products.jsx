import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard";
import { api } from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("cat") || "";

  const categoryMap = {
    tech: "Tecnología",
    home: "Hogar",
    fashion: "Moda",
    sport: "Deportes",
    outdoor: "Outdoor",
    auto: "Vehículos",
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await api.get("/products");

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error cargando productos:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);

    const matchesCategory =
      !category || product.category === categoryMap[category];

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-4 text-center">
          Todos los productos
        </h1>

        {(search || category) && (
          <p className="text-center text-slate-500 mb-10">
            Mostrando resultados para{" "}
            <span className="font-semibold text-slate-900">
              {search || categoryMap[category]}
            </span>
          </p>
        )}

        {loading ? (
          <p className="text-center text-slate-500">
            Cargando productos...
          </p>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-slate-50 border rounded-xl p-10 text-center">
            <p className="text-slate-500 mb-6">
              No encontramos productos para tu búsqueda.
            </p>

            <Link
              to="/products"
              className="inline-block bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition"
            >
              Ver todos los productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block"
              >
                <ProductCard
                  image={product.image}
                  name={product.name}
                  price={Number(product.price).toLocaleString("es-CL")}
                  rating={product.rating}
                />
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Products;