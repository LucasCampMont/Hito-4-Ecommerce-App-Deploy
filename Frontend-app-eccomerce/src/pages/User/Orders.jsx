import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAppContext } from "../../context/AppContext";

import {
  Package,
  CheckCircle,
  ShoppingBag,
} from "lucide-react";

function Orders() {
  const { orders } = useAppContext();

  return (
    <>
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag
              size={32}
              className="text-blue-600"
            />
          </div>

          <h1 className="text-4xl font-bold">
            Mis compras
          </h1>

          <p className="text-slate-500 mt-2">
            Revisa el historial de tus pedidos.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-slate-50 border rounded-2xl p-10 text-center max-w-xl mx-auto">
            <Package
              size={48}
              className="mx-auto mb-4 text-slate-400"
            />

            <h2 className="text-2xl font-bold mb-2">
              No tienes compras registradas
            </h2>

            <p className="text-slate-500">
              Cuando completes una compra aparecerá aquí.
            </p>
          </div>
        ) : (
          <>
            <p className="text-slate-500 mb-6">
              {orders.length} pedido(s) realizado(s)
            </p>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-2xl p-5 bg-white hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="font-bold text-lg">
                        Pedido #{order.id}
                      </h2>

                      <p className="text-slate-500 text-sm">
                        {order.date}
                      </p>
                    </div>

                    <p className="font-bold text-lg">
                      ${order.total.toLocaleString("es-CL")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {order.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {product.name} x{product.quantity}
                        </span>

                        <span>
                          $
                          {(
                            product.price *
                            product.quantity
                          ).toLocaleString("es-CL")}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircle size={18} />
                    {order.status}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Orders;