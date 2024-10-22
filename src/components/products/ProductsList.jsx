import useStoreProducts from "../../stores/products/StoreProducts";
import Product from "./Product";
import ProductModal from "./ProductModal";

const ProductsList = () => {
  const { products } = useStoreProducts();

  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 relative">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
        <ProductModal />
    
    </div>
  );
};

export default ProductsList;
