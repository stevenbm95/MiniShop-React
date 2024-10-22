import useSotreCart from "../../stores/cart/StoreCart";
import Button from "../common/Button";
import Table from "../common/Table";
import useStoreProducts from "../../stores/products/StoreProducts";
import { useForm } from "react-hook-form";
import validate from "../../hooks/Validate";
import { useState } from "react";
import FormatNumber from "../common/formatNumber";

const CartDetails = () => {
  const { updateProducts } = useStoreProducts();
  const { resetCart, cart } = useSotreCart();
  const [userData, setUserData] = useState({name: '' , email: ''})
  const [billData, setBillData] = useState({product: '' , cuantity: '', total: ''})
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const [showBill, setShowBill] = useState(false);

  console.log(cart);
  
 
  const handleBuy = (data) => {
    validate(errors);    
    cart.map((item) =>
      updateProducts(item.product.id, {
        stock: item.product.stock - item.cuantity,
      })
    );
    setUserData({name: data.nameUser , email:data.email});
    
    setShowBill(true);
    setTimeout(() => {
      resetCart();
      
    }, 1500);
    
    // updateProducts(product.id, {stock: product.stock-cuantity});
  };
  return (
    <div className="container mx-auto max-w-[65rem]">
      <Table
        headTable={["Imagen", "Producto", "Cantidad", "Precio", "Acciones"]}
        content={cart}
      />

      <h1 className="font-bold">
        Debes ingresar tus datos personales para finalizar la compra
      </h1>

      <div className="flex flex-col gap-4 items-center">
        <form onSubmit={handleSubmit(handleBuy)}>
          <label className="input input-bordered flex items-center gap-2">
            Nombre:
            <input
              type="text"
              className="grow"
              {...register("nameUser", { required: true })}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Correo:
            <input
              type="email"
              className="grow"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </label>

          <Button
            style={"primary"}
            onClick={() => handleBuy()}
            message="Comprar"
            isDisabled={!isValid}
            type="submit"
          />
        </form>
      </div>

      {showBill ? (
        <div>
          <h1 className="font-bold">Factura</h1>
          <p>Sr: <strong>{userData.name}</strong></p>
          <p>Contacto: {userData.email}</p>
          <p>Productos comprados</p>
          {/* { cart.map((item) => {return <p key={item.id}>{item.product.nameProduct}</p>})} */}
          { cart.map((item) => {return <p key={item.id}>{item.product.nameProduct}</p>})}
          {cart.map((item) => {return <p key={item.id}>{item.product.nameProduct}</p>})}
          {cart.map((item) => {return <p key={item.id}>{item.product.nameProduct}</p>})}
         
        </div>
      ) : null}
    </div>
  );
};

export default CartDetails;
