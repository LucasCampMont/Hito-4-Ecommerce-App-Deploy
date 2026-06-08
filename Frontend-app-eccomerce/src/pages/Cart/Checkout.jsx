import { useNavigate, Link } from "react-router-dom";
import {
  CreditCard,
  MapPin,
  Truck,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAppContext } from "../../context/AppContext";

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, createOrder } = useAppContext();

  const shipping = cart.length > 0 ? 4990 : 0;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + shipping;

  const handleConfirmPurchase = () => {
    if (cart.length === 0) return;

    createOrder({
      products: cart,
      subtotal,
      shipping,
      total,
      status: "Confirmado",
      date: new Date().toLocaleDateString("es-CL"),
    });

    clearCart();
    navigate("/orders");
  };

  return (
    <>
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} />
          </div>

          <h1 className="text-4xl font-bold text-slate-900">
            Checkout
          </h1>

          <p className="text-slate-500 mt-2">
            Finaliza tu compra de forma segura.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-slate-50 border rounded-2xl p-10 text-center max-w-xl mx-auto">
            <ShoppingBag
              size={48}
              className="mx-auto mb-4 text-slate-400"
            />

            <h2 className="text-2xl font-bold mb-2">
              Tu carrito está vacío
            </h2>

            <p className="text-slate-500 mb-6">
              Agrega productos antes de continuar con el pago.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 hover:scale-105 transition"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={24} />
                <h2 className="text-2xl font-bold">
                  Datos de envío
                </h2>
              </div>

              <input
                className="w-full border p-3 mb-4 rounded"
                placeholder="Nombre completo"
              />

              <input
                className="w-full border p-3 mb-4 rounded"
                placeholder="Dirección"
              />

              <input
                className="w-full border p-3 mb-4 rounded"
                placeholder="Comuna"
              />

              <input
                className="w-full border p-3 mb-4 rounded"
                placeholder="Teléfono"
              />

              <div className="flex items-center gap-2 mb-6 mt-8">
                <CreditCard size={24} />
                <h2 className="text-2xl font-bold">
                  Pago
                </h2>
              </div>

              <input
                className="w-full border p-3 mb-4 rounded"
                placeholder="Número de tarjeta"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  className="border p-3 rounded"
                  placeholder="MM/AA"
                />

                <input
                  className="border p-3 rounded"
                  placeholder="CVV"
                />
              </div>
            </div>

            <div className="bg-slate-50 border rounded-2xl p-6 h-fit">
              <div className="flex items-center gap-2 mb-6">
                <Truck size={24} />
                <h2 className="text-2xl font-bold">
                  Resumen
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>

                    <span>
                      ${(item.price * item.quantity).toLocaleString("es-CL")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString("es-CL")}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Envío</span>
                <span>${shipping.toLocaleString("es-CL")}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-bold text-xl mb-6">
                <span>Total</span>
                <span>${total.toLocaleString("es-CL")}</span>
              </div>

              <button
                onClick={handleConfirmPurchase}
                className="w-full inline-flex justify-center items-center gap-2 bg-slate-900 text-white py-3 rounded hover:bg-slate-800 hover:scale-105 transition"
              >
                <CheckCircle size={18} />
                Confirmar compra
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Checkout;