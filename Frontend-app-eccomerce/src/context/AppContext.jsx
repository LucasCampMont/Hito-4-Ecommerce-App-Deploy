import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [myProducts, setMyProducts] = useState(() => {
    const savedMyProducts = localStorage.getItem("myProducts");
    return savedMyProducts ? JSON.parse(savedMyProducts) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("myProducts", JSON.stringify(myProducts));
  }, [myProducts]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ==========================
  // AUTH
  // ==========================

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ==========================
  // CART
  // ==========================

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // ==========================
  // FAVORITES
  // ==========================

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return prev.filter(
          (item) => item.id !== product.id
        );
      }

      return [...prev, product];
    });
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  // ==========================
  // SELLER PRODUCTS
  // ==========================

  const addProduct = (product) => {
    setMyProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...product,
      },
    ]);
  };

  const updateProduct = (id, updatedProduct) => {
    setMyProducts((prev) =>
      prev.map((product) =>
        product.id === Number(id)
          ? {
              ...product,
              ...updatedProduct,
            }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setMyProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  // ==========================
  // ORDERS
  // ==========================

  const createOrder = (order) => {
    setOrders((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...order,
      },
    ]);
  };

  // ==========================
  // CONTADORES
  // ==========================

  const cartCount = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const favoritesCount = favorites.length;

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn: !!user,

        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,

        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount,

        myProducts,
        addProduct,
        updateProduct,
        deleteProduct,

        orders,
        createOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}