import { useState } from "react";
import { notify } from "./Toast";
import { useEffect } from "react";
import useSotreCart from "../../stores/cart/StoreCart";
import PropType from "prop-types";

const ControlQuantity = ({ product }) => {
  const [quantityLocal, setQuantityLocal] = useState(0);
  const [availableProducts] = useState(product.stock);

  const { cart, setQuantity,quantity } = useSotreCart();


  useEffect(() => {
    setQuantity(0)
    setQuantityLocal(0)
  }, [cart]);



  const handleAddCuantity = () => {
    if (availableProducts > quantityLocal) {
      setQuantityLocal(quantityLocal + 1);
      setQuantity(quantityLocal + 1 );
    } else {
      notify("error", "No puedes agregar mas de este producto", 3000);
      return;
    }
  };

  const handleRestCuantity = () => {
    if (quantityLocal <= 0) {
      setQuantityLocal(0);
      setQuantity(0);
      return;
    }
    setQuantityLocal(quantityLocal - 1);
    setQuantity(quantityLocal - 1 );
  };

  return (
    <div className="flex gap-2 border-2 border-base-content/20 rounded-md mb-2 p-2">
      <button className="" onClick={handleRestCuantity}>
        -
      </button>
      {quantityLocal}
      <button onClick={() => handleAddCuantity()}>+</button>
    </div>
  );
};

ControlQuantity.propTypes = {
  product: PropType.object.isRequired,
};
export default ControlQuantity;
