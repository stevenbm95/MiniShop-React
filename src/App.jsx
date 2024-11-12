import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./layout/Footer";
import Main from "./layout/Main";
import Navbar from "./layout/Navbar";
import { ToastContainer } from "react-toastify";
import CartPage from "./pages/cart/CartPage";
import AdminPage from "./pages/admin/AdminPage";
import ProductsPage from "./pages/products/ProductsPage";
import CustomersPage from "./pages/customers/CustomersPage";
import useSotreAuth from "./stores/auth/StoreAuth";
import { useEffect } from "react";
import AuthPage from "./pages/auth/AuthPage";

function App() {

  const { isAuthenticated } = useSotreAuth();
  const { isAuth } = isAuthenticated();

  useEffect(() => {
    console.log(isAuthenticated());
  }, [isAuthenticated])
  
  return (
    <Router>
      <Navbar />
      <div className="flex min-h-[45rem]">
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/auth" element={<AuthPage />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Routes>
        <ToastContainer className="mt-10"/>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
