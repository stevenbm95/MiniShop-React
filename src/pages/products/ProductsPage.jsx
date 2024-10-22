
import ProductModal from "../../components/products/ProductModal";
import ProductsList from "../../components/products/ProductsList";
import useStoreProducts from "../../stores/products/StoreProducts";

const ProductsPage = () => {
const {products} = useStoreProducts();

  return (
    

    <div className="container mx-auto mt-14">
    {products.length > 0 ? (
      <ProductsList />
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

export default ProductsPage;
