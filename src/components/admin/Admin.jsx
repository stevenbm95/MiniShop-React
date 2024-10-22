import useStoreProducts from "../../stores/products/StoreProducts";
import Button from "../common/Button";
import Table from "../common/Table";
import ProductModal from "../products/ProductModal";

const Admin = () => {
  const { products, setIsEditing, setFormData, deleteProduct } = useStoreProducts();

  const handleEdit = (productToEdit) => {
    console.log("Editar");
    setIsEditing(true);
    document.getElementById("products_modal").showModal();
    setFormData(productToEdit);

    return;
  };

  const handleDelete = (productTodelete) => {
    deleteProduct(productTodelete.id);
    return;
  };
  
  return (
    // <Table headTable={["Nombre", "Precio", "Cantidad", "Acciones"]} content={products} />
    <div className="container mx-auto max-w-[65rem]">
      <div className="absolute bottom-40 right-10">
        <ProductModal />
      </div>
      

      <div className="overflow-x-auto">
        <div role="tablist" className="tabs tabs-lifted">
          <a role="tab" className="tab">
            Todos
          </a>
          <a role="tab" className="tab tab-active">
            Activos
          </a>
          <a role="tab" className="tab">
            Inactivos
          </a>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Disponibles</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
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
                      <div className="font-bold">{product.nameProduct}</div>
                    </div>
                  </div>
                </td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <th className="flex gap-3">
                  <Button
                    style={"primary"}
                    onClick={() => handleEdit(product)}
                    message="Editar"
                  />
                  <Button style={"error"} onClick={() => handleDelete(product)} message="Eliminar" />                    
                  
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
