import { useEffect } from "react";
import useStoreProducts from "../../stores/products/StoreProducts";
import ProductAddIcon from "./ProductAddIcon";
import { useForm } from "react-hook-form";
// import { ToastContainer, toast } from "react-toastify";
import { notify } from "../common/Toast";
import Button from "../common/Button";

{
  /* Open the modal using document.getElementById('ID').showModal() method */
}

const ProductModal = () => {
  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const { product, createProduct, isEditing, setIsEditing, updateProducts } =  useStoreProducts();


  useEffect(() => {
    const modal = document.getElementById("products_modal");
    // Cuando el modal se cierra, cambia isEditing a false
    const handleClose = () => {
      setIsEditing(false);
    };
    // Escuchar el evento close del modal
    modal.addEventListener("close", handleClose);
    // Limpia el listener cuando el componente se desmonta
    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, [setIsEditing]);

  useEffect(() => {
    if (isEditing) {
      reset({
        nameProduct: product.nameProduct || "",
        price: product.price ? product.price : "",
        stock: product.stock ? product.stock : "",
        description: product.description || "",
      });
    } else{
      reset({
        nameProduct: "",
        price: "",
        stock:"",
        description:""});
    }
  }, [isEditing, product, reset]);
 
  const onSubmit = (data) => {    
    const prepareData = {
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
    };   

    if(isEditing){
      notify("","Actualizdo Correctamente",3000);
      updateProducts(product.id, prepareData)
    } else {
      notify("success","Agregado Correctamente",3000);
      
      createProduct(prepareData);
    }
    
    reset();
    
    document.getElementById("products_modal").close();
    setTimeout(() => {
      setIsEditing(false);
    }, 250);
  };


  return (
    <>
      <div
        className=""
        onClick={() => document.getElementById("products_modal").showModal()}
      >
        <ProductAddIcon />
      </div>
      <dialog
        id="products_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {isEditing ? "Editar Producto" : "Agrega un Producto"}
          </h3>
          <div className="modal-action justify-center">
            <form
              method="dialog"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <label className="input input-bordered flex items-center gap-2">
                Nombre:
                <input
                  {...register("nameProduct", { required: true })}
                  type="text"
                  className="grow"
                />
              </label>
              {errors.nameProduct && <span className="text-error">El nombre es rquerido</span>}

              <label className="input input-bordered flex items-center gap-2">
                Precio:
                <input
                  {...register("price", { required: true, type: "number" })}
                  type="number"
                  className="grow"
                />
              </label>
              {errors.price && <span className="text-error">El precio es requerido y debe ser un numero</span>}
              <label className="input input-bordered flex items-center gap-2">
                Cantidad:
                <input
                  {...register("stock", { required: true, type: "number" })}
                  type="number"
                  className="grow"
                />
              </label>
              {errors.stock && <span className="text-error">La cantidad es requerida y debe ser un numero</span>}
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered"
                placeholder="Descripción del producto"
              ></textarea>
              {errors.description && <span className="text-error">La descripción es errequerida</span>}
              {/* if there is a button in form, it will close the modal */}
              <Button
                style={"primary"}
                // onClick={validate2}
                message={isEditing ? "Guardar" : "Agregar"}
              />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProductModal;
