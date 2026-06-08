import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAppContext } from "../../context/AppContext";

import {
  User,
  Heart,
  ShoppingBag,
  Store,
} from "lucide-react";

function Profile() {
  const {
    user,
    favorites,
    orders,
    myProducts,
  } = useAppContext();

  return (
    <>
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-3">
          Mi Perfil
        </h1>

        <p className="text-center text-slate-500 mb-10">
          Administra tu cuenta y revisa tu actividad.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Perfil */}
          <div className="bg-white border rounded-2xl shadow-sm p-6 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User size={40} />
            </div>

            <h2 className="text-xl font-bold">
              {user?.name || "Usuario"}
            </h2>

            <p className="text-slate-500">
              {user?.email || "Sin correo"}
            </p>
          </div>

          {/* Estadísticas */}
          <div className="md:col-span-2 grid md:grid-cols-3 gap-4">

            <div className="bg-white border rounded-2xl p-6 text-center">
              <Heart
                size={32}
                className="mx-auto mb-3 text-red-500"
              />

              <h3 className="text-2xl font-bold">
                {favorites.length}
              </h3>

              <p className="text-slate-500">
                Favoritos
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-6 text-center">
              <ShoppingBag
                size={32}
                className="mx-auto mb-3 text-blue-500"
              />

              <h3 className="text-2xl font-bold">
                {orders.length}
              </h3>

              <p className="text-slate-500">
                Compras
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-6 text-center">
              <Store
                size={32}
                className="mx-auto mb-3 text-green-600"
              />

              <h3 className="text-2xl font-bold">
                {myProducts.length}
              </h3>

              <p className="text-slate-500">
                Productos publicados
              </p>
            </div>

          </div>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Información de la cuenta
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-slate-500 text-sm">
                Nombre
              </p>

              <p className="font-semibold">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-sm">
                Correo electrónico
              </p>

              <p className="font-semibold">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;