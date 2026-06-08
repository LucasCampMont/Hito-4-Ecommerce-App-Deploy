import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function NotFound() {
  return (
    <>
      <Navbar />

      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-7xl font-bold text-slate-900 mb-4">404</h1>

        <h2 className="text-3xl font-bold mb-3">
          Página no encontrada
        </h2>

        <p className="text-slate-500 mb-8">
          La página que buscas no existe o fue movida.
        </p>

        <Link
          to="/"
          className="bg-slate-900 text-white px-6 py-3 rounded hover:bg-slate-800 transition"
        >
          Volver al inicio
        </Link>
      </section>

      <Footer />
    </>
  );
}

export default NotFound;