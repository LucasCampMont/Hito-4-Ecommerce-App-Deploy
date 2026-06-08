import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { api } from "../../services/api";

function Register() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const data = await api.post("/auth/register", {
      name: `${name} ${lastname}`,
      email,
      password,
    });

    if (data.user) {
      alert("Usuario registrado correctamente");
      navigate("/login");
    } else {
      alert(data.message || "Error al registrar usuario");
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-lg mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-3">
          Crear tu cuenta
        </h1>

        <p className="text-center text-slate-500 mb-10">
          Accede a miles de productos y ofertas exclusivas.
        </p>

        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              className="border p-3 rounded"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="border p-3 rounded"
              placeholder="Apellido"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <input
            className="w-full border p-3 mb-4 rounded"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full border p-3 mb-4 rounded"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className="w-full border p-3 mb-6 rounded"
            placeholder="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <select className="w-full border p-3 mb-6 rounded">
            <option>Chile</option>
            <option>Argentina</option>
            <option>Perú</option>
          </select>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded hover:bg-slate-800 transition"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="font-semibold text-slate-900 hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </section>

      <Footer />
    </>
  );
}

export default Register;