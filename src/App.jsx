import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./layout/Footer";
import Main from "./layout/Main";
import Navbar from "./layout/Navbar";
import ProductsPage from "./pages/products/ProductsPage";
import Admin from "./components/admin/Admin";
import { ToastContainer } from "react-toastify";
import CartPage from "./pages/cart/CartPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex min-h-[45rem]">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <ToastContainer className="mt-10"/>
      </div>
      <Footer />
    </Router>
  );
}

export default App;