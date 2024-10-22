import useStoreProducts from "../../stores/products/StoreProducts";
import Product from "./Product";
import ProductModal from "./ProductModal";

const ProductsList = () => {
  const { products } = useStoreProducts();

  return (
    <div className="container mx-auto min-h-screen">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 relative">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <div className="absolute bottom-32 right-20">
        <ProductModal className=" " />
      </div>
    </div>
  );
};

export default ProductsList;
