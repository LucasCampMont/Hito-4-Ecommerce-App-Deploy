import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAppContext } from "../../context/AppContext";
import { api } from "../../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await api.post("/auth/login", {
      email,
      password,
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      login(data.user);

      navigate("/profile");
    } else {
      alert(data.message || "Error al iniciar sesión");
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-md mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center mb-3">
          Iniciar Sesión
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Accede a tu cuenta de Andesora.
        </p>

        <form onSubmit={handleLogin}>
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

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded hover:bg-slate-800 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="font-semibold text-slate-900 hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </section>

      <Footer />
    </>
  );
}

export default Login;