import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAppContext } from "../../context/AppContext";

function Cart() {
  const { cart, removeFromCart, isLoggedIn } = useAppContext();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />

        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="bg-slate-50 border rounded-xl p-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Inicia sesión para continuar
            </h1>

            <p className="text-slate-500 mb-8">
              Debes iniciar sesión para acceder a tu carrito de compras.
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

  return (
    <>
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-10 text-center">
          Carrito de compras
        </h1>

        {cart.length === 0 ? (
          <div className="bg-slate-50 border rounded-xl p-8 text-center">
            <p className="text-slate-500 mb-6">Tu carrito está vacío.</p>

            <Link
              to="/products"
              className="inline-block bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 p-4 bg-slate-100 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg bg-white"
                    />

                    <div>
                      <h2 className="font-bold text-slate-900">
                        {item.name}
                      </h2>

                      <p className="text-slate-500 text-sm">
                        Cantidad: {item.quantity}
                      </p>

                      <p className="text-slate-500 text-sm">
                        Precio unitario: ${item.price.toLocaleString("es-CL")}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-slate-900 mb-3">
                      ${(item.price * item.quantity).toLocaleString("es-CL")}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right mt-10">
              <p className="text-2xl font-bold">
                Total: ${total.toLocaleString("es-CL")}
              </p>

              <Link
                to="/checkout"
                className="inline-block mt-4 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition"
              >
                Ir al checkout
              </Link>
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Cart;