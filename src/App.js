import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";

function App() {
  const checkLoginStatus = () => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    const expiry =
      localStorage.getItem("loginExpiry");

    if (
      isLoggedIn === "true" &&
      expiry &&
      Date.now() < Number(expiry)
    ) {
      return true;
    }

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginExpiry");

    return false;
  };

  const [isLoggedIn, setIsLoggedIn] =
    useState(checkLoginStatus());

  const [toast, setToast] = useState("");

  const [products, setProducts] =
    useState([
      {
        id: 1,
        name: "Laptop",
        description: "Gaming Laptop",
        category: "Electronics",
        price: 50000,
        quantity: 5,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        status: "Available",
      },
      {
        id: 2,
        name: "Headphones",
        description: "Wireless Headphones",
        category: "Accessories",
        price: 2500,
        quantity: 10,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
        status: "Available",
      },
         {
        id: 3,
        name: "Shoes",
        description: "Nike Sneakers",
        category: "Fashion",
        price: 5500,
        quantity: 10,
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
        status: "Available",
      },
    ]);

  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart
    ? JSON.parse(savedCart)
    : [];
});

  useEffect(() => {
    const interval = setInterval(() => {
      const expiry =
        localStorage.getItem("loginExpiry");

      if (
        expiry &&
        Date.now() > Number(expiry)
      ) {
        localStorage.removeItem(
          "isLoggedIn"
        );

        localStorage.removeItem(
          "loginExpiry"
        );

        setIsLoggedIn(false);

        alert(
          "Session expired. Please login again."
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cartQuantity:
                  item.cartQuantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          cartQuantity: 1,
        },
      ]);
    }

    setToast(
      `${product.name} added to cart ✅`
    );

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const removeFromCart = (id) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              cartQuantity:
                item.cartQuantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cartQuantity:
                  item.cartQuantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.cartQuantity > 0
        )
    );
  };

  return (
    <BrowserRouter>
      <Navbar
        cart={cart}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

      <Routes>
       <Route
  path="/"
  element={
    <Home addToCart={addToCart} />
  }
/>

        <Route
          path="/products"
          element={
            <Products
              products={products}
              setProducts={setProducts}
              addToCart={addToCart}
            />
          }
        />

<Route
  path="/cart"
  element={
    <Cart
      cart={cart}
      setCart={setCart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
    />
  }
/>

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <AdminDashboard
                products={products}
                setProducts={setProducts}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

       <Route
  path="/products/:id"
  element={
    <ProductDetails
      products={products}
      addToCart={addToCart}
    />
  }
/>

        <Route
          path="/edit-product/:id"
          element={<EditProduct />}
        />

        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={
                setIsLoggedIn
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;