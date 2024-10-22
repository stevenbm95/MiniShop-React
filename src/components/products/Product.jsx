import PropType from "prop-types";
import { useState } from "react";
import useSotreCart from "../../stores/cart/StoreCart";

import Button from "../common/Button";
import { notify } from "../common/Toast";


const Product = ({ product }) => {
  const [cuantity, setCuantity] = useState(0);
  const [availableProducts, setAvailableProducts] = useState(product.stock);
  const { cart, addProductToCart, updateProductQuantityCart } = useSotreCart();

  const handleAddCuantity = () => {

    if(availableProducts > cuantity) {
      setCuantity(cuantity + 1);
    } else {
      notify("error", "No puedes agregar mas de este producto", 3000);
      return;
    }
    
  };

  const handleRestCuantity = () => {
    if (cuantity <= 0) {
      setCuantity(0);
      return;
    }
    setCuantity(cuantity - 1);
  };

  const validate = (actualProduct) => {
    const validar = cart.filter((item) => item.product.id === actualProduct.id);
    if (validar.length > 0) {
      notify("info", "Carrito actualizado", 1000);
      return updateProductQuantityCart(product, cuantity);
    } else {
      notify("success", "Producto agregado al carrito", 1000);
      return addProductToCart(product, cuantity);
    }
  };

  const handdleAddToCart = () => {
    console.log("Cantidad:", cuantity);
    if (cuantity <= 0)
      return notify("error", "Debes agregar una cantidad mayor a 0", 3000);
    validate(product);

    if(availableProducts - cuantity < 0){
      notify("error", "No hay stock disponible", 3000);
      return;
    } else {
      // updateProducts(product.id, {stock: product.stock-cuantity});
      setAvailableProducts( availableProducts - cuantity )
    }

    setCuantity(0);
  };

  const { nameProduct, price, description } = product;

  return (
    <div className="card bg-base-100  shadow-xl max-h-[28rem] ">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{nameProduct}</h2>
        <p>{description}</p>
        <p>${price}</p>
        <p>Disponibles: {availableProducts}</p>
        <div className="card-actions  justify-end">
          <div className="flex flex-col items-center">
            <div className="flex gap-2 border-2 border-base-content/20 rounded-md mb-2 p-2">
              <button className="" onClick={handleRestCuantity}>
                -
              </button>
              {cuantity}
              <button onClick={handleAddCuantity}>+</button>
            </div>

            <Button
              style={"primary"}
              message="Agregar al carrito"
              onClick={handdleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropType.shape({
    nameProduct: PropType.string.isRequired,
    price: PropType.number.isRequired,
    stock: PropType.number.isRequired,
    description: PropType.string.isRequired,
  }).isRequired,
};

export default Product;
