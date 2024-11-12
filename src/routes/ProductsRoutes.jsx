import { Route } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import ProductsPage from "../pages/products/ProductsPage";

const ProductsRoutes = () => {
  return (
    <>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/products" element={<ProductsPage />} />
    </>
  );
};

export default ProductsRoutes;
