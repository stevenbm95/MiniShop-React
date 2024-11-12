import useSotreCart from "../../stores/cart/StoreCart";
import Button from "../common/Button";
import useStoreProducts from "../../stores/products/StoreProducts";
import { useForm } from "react-hook-form";
import validate from "../../hooks/Validate";
import { useState } from "react";
import FormatNumber from "../common/formatNumber";
import { emailAPi } from "../../api/emailApi";
import { useEffect } from "react";

const CartDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const { updateProducts } = useStoreProducts();
  const { cart, setQuantity, removeProductCart } = useSotreCart();
  const [userData, setUserData] = useState(null);
  const [showBill, setShowBill] = useState(false);

  const subTotal = cart.reduce(
    (acc, currentItem) =>
      acc + currentItem.product.price * currentItem.cuantity,
    0
  );
  const total = subTotal + subTotal * 0.19;

  const handleBuy = (data) => {
    validate(errors);
    setUserData(data);
    emailAPi({
      recipients: data?.email,
      subject: "Factura de compra",
      text: "Factura de compra",
    });
    setShowBill(true);
  };

  console.log(userData);

  const headTable = ["Imagen", "Producto", "Cantidad", "Precio", "Acciones"];
  return (
    <div className="container mx-auto max-w-[65rem]">
      <div className="container mx-auto flex flex-col max-w-[65rem] items-end">
        <div className="overflow-x-auto w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                {headTable.map((info) => (
                  <th key={info}>{info}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id + Math.random()}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.nameProduct}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.product.nameProduct}</td>
                  <td>{item.cuantity}</td>
                  <td>
                    $ <FormatNumber price={item.product.price} />
                  </td>
                  <td>
                    <Button
                      style={"error"}
                      onClick={() => removeProductCart(item.id)}
                      message={"Eliminar"}
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <th colSpan={4} className="text-right">
                  Subtotal:
                </th>
                <td>
                  $ <FormatNumber price={subTotal} />
                </td>
              </tr>
              <tr>
                <th colSpan={4} className="text-right">
                  Total:
                </th>
                <td>
                  $ <FormatNumber price={total} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button
          className="flex"
          style={"primary"}
          message="Confirmar"
          onClick={() => addValuesToCart(subTotal, total)}
        />
      </div>

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
      {userData && (
        <div className="container mx-auto my-10">
          <h1 className="font-bold text-2xl text-center">Factura</h1>
          <p>
            Sr: <strong>{userData.nameUser}</strong>
          </p>
          <p>Contacto: {userData.email}</p>
          <p>A continuación presentamos los detalles de la compra</p>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item.id}>
                    <th>{index + 1}</th>
                    <td>{item.product.nameProduct}</td>
                    <td>{item.cuantity}</td>
                    <td>${item.product.price * item.cuantity}</td>
                  </tr>
                ))}

                <tr>
                  <th colSpan={3} className="text-right">
                    Total:
                  </th>
                  <td>
                    $ <FormatNumber price={total} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetails;
