import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  User,
  Store,
  LogOut,
} from "lucide-react";

import { useAppContext } from "../../context/AppContext";
import SearchBar from "../SearchBar";

export default function Navbar() {
  const navigate = useNavigate();

  const {
    isLoggedIn,
    logout,
    cartCount,
    favoritesCount,
  } = useAppContext();

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">

        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight"
        >
          Andesora
        </Link>

        <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
          <Link
            className="hover:text-black transition"
            to="/products"
          >
            Todos
          </Link>

          <Link
            className="hover:text-black transition"
            to="/products?cat=tech"
          >
            Tecnología
          </Link>

          <Link
            className="hover:text-black transition"
            to="/products?cat=home"
          >
            Hogar
          </Link>

          <Link
            className="hover:text-black transition"
            to="/products?cat=fashion"
          >
            Moda
          </Link>

          <Link
            className="hover:text-black transition"
            to="/products?cat=sport"
          >
            Deportes
          </Link>
        </div>

        <SearchBar />

        <div className="flex items-center gap-5">

          {isLoggedIn && (
            <Link
              to="/seller/products"
              className="hidden md:flex items-center gap-1 text-sm text-gray-700 hover:text-black transition"
              title="Mis productos"
            >
              <Store size={20} />
              <span className="hidden lg:inline">
                Mis productos
              </span>
            </Link>
          )}

          {isLoggedIn && (
            <Link
              to="/favorites"
              className="relative text-gray-700 hover:text-black transition"
              title="Favoritos"
            >
              <Heart size={22} />

              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {favoritesCount}
              </span>
            </Link>
          )}

          {isLoggedIn && (
            <Link
              to="/profile"
              className="text-gray-700 hover:text-black transition"
              title="Perfil"
            >
              <User size={22} />
            </Link>
          )}

          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-black transition"
            title="Carrito"
          >
            <ShoppingCart size={22} />

            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          </Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-black transition"
              title="Salir"
            >
              <LogOut size={20} />

              <span className="hidden lg:inline">
                Salir
              </span>
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm text-gray-700 hover:text-black transition"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}