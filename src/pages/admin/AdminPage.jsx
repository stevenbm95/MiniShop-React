import Admin from "../../components/admin/Admin";
import ProductModal from "../../components/products/ProductModal";
import useStoreProducts from "../../stores/products/StoreProducts";

const AdminPage = () => {
  const { products } = useStoreProducts();

  return (
    <div className="container mx-auto mt-14">
      {products.length > 0 ? (
        <Admin />
      ) : (
        <>
          <h1 className="font-bold text-2xl mt-5  text-center">
            No Hay productos agregados
          </h1>
          <ProductModal />
        </>
      )}
    </div>
  );
};

export default AdminPage;
