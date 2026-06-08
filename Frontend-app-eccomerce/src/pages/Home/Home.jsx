import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero";
import CategoryCard from "../../components/CategoryCard";
import BenefitCard from "../../components/BenefitCard";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer/Footer";
import { products } from "../../data/products";

import {
  Laptop,
  House,
  Shirt,
  Trophy,
  Trees,
  Car,
  ShieldCheck,
  BadgeCheck,
  Package,
  CreditCard,
} from "lucide-react";

function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Navbar />

      <Hero />

      {/* CATEGORÍAS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">
          Categorías destacadas
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
          <Link to="/products?cat=tech">
            <CategoryCard
              icon={<Laptop size={40} />}
              title="Tecnología"
            />
          </Link>

          <Link to="/products?cat=home">
            <CategoryCard
              icon={<House size={40} />}
              title="Hogar"
            />
          </Link>

          <Link to="/products?cat=fashion">
            <CategoryCard
              icon={<Shirt size={40} />}
              title="Moda"
            />
          </Link>

          <Link to="/products?cat=sport">
            <CategoryCard
              icon={<Trophy size={40} />}
              title="Deportes"
            />
          </Link>

          <Link to="/products?cat=outdoor">
            <CategoryCard
              icon={<Trees size={40} />}
              title="Outdoor"
            />
          </Link>

          <Link to="/products?cat=auto">
            <CategoryCard
              icon={<Car size={40} />}
              title="Auto & Moto"
            />
          </Link>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">
          Productos destacados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
      </section>

      {/* BENEFICIOS */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-3 text-center">
            Andesora marca la diferencia.
          </h2>

          <p className="text-xl text-slate-500 mb-12 text-center">
            Compra y vende con mayor confianza.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon={<ShieldCheck size={40} />}
              title="Compra Protegida"
              description="El dinero permanece protegido hasta que confirmes la recepción de tu producto."
            />

            <BenefitCard
              icon={<BadgeCheck size={40} />}
              title="Usuarios Verificados"
              description="Identidad validada para generar mayor seguridad entre compradores y vendedores."
            />

            <BenefitCard
              icon={<Package size={40} />}
              title="Seguimiento Transparente"
              description="Monitorea cada etapa de tu compra desde el pago hasta la entrega."
            />

            <BenefitCard
              icon={<CreditCard size={40} />}
              title="Pago Seguro"
              description="Transacciones protegidas diseñadas para reducir riesgos y aumentar la confianza."
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;