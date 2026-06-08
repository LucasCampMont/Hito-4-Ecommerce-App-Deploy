import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

import {
  ArrowRight,
  Heart,
  Store,
  Package,
} from "lucide-react";

export default function Hero() {
  const { isLoggedIn, user } = useAppContext();

  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              {isLoggedIn
                ? `Bienvenido de vuelta, ${user?.name}`
                : "Compra con confianza en Andesora"}
            </h1>

            <p className="mt-6 text-lg text-slate-600">
              {isLoggedIn
                ? "Publica productos, administra tus ventas y revisa tus favoritos desde un solo lugar."
                : "Descubre productos verificados en una plataforma diseñada para ofrecer una experiencia de compra segura, rápida y transparente."}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/products"
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-[#1E3A5F] text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                  >
                    Explorar productos
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    to="/login"
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-[#DCE3EA] text-slate-900 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                  >
                    <Store size={18} />
                    Comenzar a vender
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/seller/create"
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-[#1E3A5F] text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                  >
                    <Store size={18} />
                    Publicar producto
                  </Link>

                  <Link
                    to="/seller/products"
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-[#DCE3EA] text-slate-900 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                  >
                    <Package size={18} />
                    Mis productos
                  </Link>

                  <Link
                    to="/favorites"
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-900 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                  >
                    <Heart size={18} />
                    Favoritos
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="
                w-64 h-64 md:w-96 md:h-96
                rounded-3xl
                bg-gradient-to-br
                from-slate-200
                to-slate-100
                flex
                items-center
                justify-center
                text-8xl
                shadow-xl
                hover:scale-105
                transition-all
                duration-500
              "
            >
              🏔️
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}