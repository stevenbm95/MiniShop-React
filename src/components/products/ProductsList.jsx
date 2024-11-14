import { useState } from "react";
import useStoreProducts from "../../stores/products/StoreProducts";
import Product from "./Product";
import ProductModal from "./ProductModal";
import { useEffect } from "react";

const ProductsList = () => {
  const { products } = useStoreProducts();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, [])
  

  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 relative">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex w-72 flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))
          : products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
      </div>
      <ProductModal />
    </div>
  );
};

export default ProductsList;
