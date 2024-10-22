import FormatNumber from "./formatNumber";
import Button from "./Button";
import useSotreCart from "../../stores/cart/StoreCart";
import { useEffect } from "react";

const Table = ({ headTable, content }) => {

  // const { addTotalToCart } = useSotreCart();
  const subTotal = content.reduce((acc, currentItem) =>  acc + currentItem.product.price * currentItem.cuantity, 0 );
  const total = subTotal + subTotal * 0.19; 

  return (
    <div className="container mx-auto max-w-[65rem]">
      <div className="overflow-x-auto">
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
            {content.map((item) => (
              <tr key={item.product.id + Math.random()}>
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
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
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
                <td><FormatNumber price={item.product.price} /></td>
                <th className="flex gap-3">
                  <Button
                    style={"primary"}
                    // onClick={() => handleEdit(product)}
                    message="Editar"
                  />
                  <Button style={"error"} message="Eliminar" />
                </th>
              </tr>
            ))}
            <tr>
              <th colSpan={4} className="text-right">
                Subtotal:
              </th>
              <td>
                <FormatNumber price={subTotal} />
              </td>
            </tr>
            <tr>
              <th colSpan={4} className="text-right">
                Total:{" "}
              </th>
              <td>
                <FormatNumber price={total} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
