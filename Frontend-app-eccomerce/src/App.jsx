import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/Products/ProductDetail";

import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Cart/Checkout";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import CreateProduct from "./pages/Seller/CreateProduct";
import EditProduct from "./pages/Seller/EditProduct";
import MyProducts from "./pages/Seller/MyProducts";

import Profile from "./pages/User/Profile";
import Orders from "./pages/User/Orders";
import Favorites from "./pages/User/Favorites";

import NotFound from "./pages/Errors/NotFound";

import ProtectedPage from "./components/ProtectedPage";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Products */}
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />

      {/* Cart */}
      <Route path="/cart" element={<Cart />} />

      <Route
        path="/checkout"
        element={
          <ProtectedPage>
            <Checkout />
          </ProtectedPage>
        }
      />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User */}
      <Route
        path="/profile"
        element={
          <ProtectedPage>
            <Profile />
          </ProtectedPage>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedPage>
            <Orders />
          </ProtectedPage>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedPage>
            <Favorites />
          </ProtectedPage>
        }
      />

      {/* Seller */}
      <Route
        path="/seller/products"
        element={
          <ProtectedPage>
            <MyProducts />
          </ProtectedPage>
        }
      />

      <Route
        path="/seller/create"
        element={
          <ProtectedPage>
            <CreateProduct />
          </ProtectedPage>
        }
      />

      <Route
        path="/seller/edit/:id"
        element={
          <ProtectedPage>
            <EditProduct />
          </ProtectedPage>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;