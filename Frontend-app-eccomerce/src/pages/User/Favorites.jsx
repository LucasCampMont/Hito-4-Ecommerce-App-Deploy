import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard";
import { useAppContext } from "../../context/AppContext";

function Favorites() {
  const { favorites } = useAppContext();

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-red-500" size={32} />
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Favoritos
          </h1>

          <p className="text-slate-500">
            Productos que guardaste para ver después.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-slate-50 border rounded-2xl p-10 text-center max-w-xl mx-auto">
            <Heart
              className="mx-auto mb-4 text-slate-400"
              size={44}
            />

            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Aún no tienes favoritos
            </h2>

            <p className="text-slate-500 mb-6">
              Guarda productos que te interesen para encontrarlos fácilmente.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 hover:scale-105 transition"
            >
              <ShoppingBag size={18} />
              Explorar productos
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-slate-500 mb-8">
              {favorites.length} producto(s) guardado(s)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="block"
                >
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    price={product.price.toLocaleString("es-CL")}
                    rating={product.rating}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Favorites;
