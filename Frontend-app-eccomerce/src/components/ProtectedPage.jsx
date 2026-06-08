import { Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useAppContext } from "../context/AppContext";

function ProtectedPage({ children, title = "Inicia sesión para continuar" }) {
  const { isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />

        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="bg-slate-50 border rounded-xl p-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {title}
            </h1>

            <p className="text-slate-500 mb-8">
              Debes iniciar sesión para acceder a esta sección.
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

  return children;
}

export default ProtectedPage;