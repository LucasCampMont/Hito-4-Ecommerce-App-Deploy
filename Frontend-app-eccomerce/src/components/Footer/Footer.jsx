import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Globe,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Marca */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Andesora
          </h3>

          <p className="text-sm text-slate-500 leading-relaxed">
            Plataforma de ecommerce moderna enfocada en confianza,
            seguridad y una experiencia de compra simple.
          </p>

          <div className="flex gap-4 mt-5 text-slate-500">
            <span className="hover:text-slate-900 transition cursor-pointer">
              GitHub
            </span>

            <span className="hover:text-slate-900 transition cursor-pointer">
              LinkedIn
            </span>

            <span className="hover:text-slate-900 transition cursor-pointer">
              Instagram
            </span>
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-slate-900 font-semibold mb-4">
            Navegación
          </h4>

          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <Link
                to="/"
                className="hover:text-slate-900 transition"
              >
                Inicio
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="hover:text-slate-900 transition"
              >
                Productos
              </Link>
            </li>

            <li>
              <Link
                to="/favorites"
                className="hover:text-slate-900 transition"
              >
                Favoritos
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                className="hover:text-slate-900 transition"
              >
                Perfil
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-slate-900 font-semibold mb-4">
            Contacto
          </h4>

          <div className="space-y-3 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              contacto@andesora.cl
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              +56 9 1234 5678
            </div>

            <div className="flex items-center gap-2">
              <Globe size={16} />
              www.andesora.cl
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Andesora. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;