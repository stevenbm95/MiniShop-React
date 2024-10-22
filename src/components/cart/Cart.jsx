import { Link } from "react-router-dom";
import useSotreCart from "../../stores/cart/StoreCart";
import Button from "../common/Button";
import IconCart from "./IconCart";
import FormatNumber from "../common/formatNumber";

const Cart = () => {
  const { cart, addTotalToCart } = useSotreCart();

  const subTotal = cart.reduce( (acc, currentItem) => (acc + currentItem.product.price * currentItem.cuantity), 0);
  const total = subTotal * 0.19;
  const products = cart.length;

  
  const handleClickBuyCart = () => {
    // addTotalToCart(total);
    
    
    
    console.log("Buy cart");
  };
  console.log(cart);
  
  return (
    <div className="dropdown dropdown-end">
      <IconCart />
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
      >
        <div className="card-body">
          <span className="text-lg font-bold"> {products} Productos</span>
          {cart.map(({ cuantity, product }) => {
            return (
              <div key={product.id + Math.random()} className="py-2">
                <strong>{cuantity}</strong>
                <span> - {product.nameProduct}</span>
              </div>
            );
          })}
          <span className="text-info">Subtotal: ${<FormatNumber price={subTotal} />}</span>
          <div className="card-actions">
            <Link to="/cart">
              <Button
                style={"primary"}
                message="Ir al carrito"
                onClick={handleClickBuyCart}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
