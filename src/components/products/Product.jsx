import PropType from "prop-types";
import { useState } from "react";
import useSotreCart from "../../stores/cart/StoreCart";

import Button from "../common/Button";
import { notify } from "../common/Toast";
import ControlQuantity from "../common/ControlQuantity";

const Product = ({ product }) => {
  const [availableProducts, setAvailableProducts] = useState(product.stock);
  const { cart, addProductToCart, updateProductQuantityCart, quantity } =  useSotreCart();

  const validate = (actualProduct) => {
    const validar = cart.filter((item) => item.product.id === actualProduct.id);

    if (validar.length > 0) {
      notify("info", "Carrito actualizado", 1000);
      return updateProductQuantityCart(product, quantity);
    }
    notify("success", "Producto agregado al carrito", 1000);
    return addProductToCart(product, quantity);
  };

  const handdleAddToCart = () => {
    if (quantity <= 0)
      return notify("error", "Debes agregar una cantidad mayor a 0", 3000);

    validate(product);

    if (availableProducts - quantity < 0) {
      return notify("error", "No hay stock disponible", 3000);
    } else {
      setAvailableProducts(availableProducts - quantity);
    }
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
            <ControlQuantity product={product}  />

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
