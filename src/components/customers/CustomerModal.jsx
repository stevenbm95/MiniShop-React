import { useEffect } from "react";
import useStoreProducts from "../../stores/products/StoreProducts";
import ProductAddIcon from "../products/ProductAddIcon";
import { useForm } from "react-hook-form";
// import { ToastContainer, toast } from "react-toastify";
import { notify } from "../common/Toast";
import Button from "../common/Button";

const CustomerModal = () => {
  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const { product, createProduct, isEditing, setIsEditing } =  useStoreProducts();


  useEffect(() => {
    const modal = document.getElementById("customer_modal");
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
      isActive: product.isActive ? true : false,
      image: product.image || "",
    };

    if(isEditing){
      notify("","Actualizdo Correctamente",3000);
      const productEdited = {...prepareData, id: product.id};
      
      createProduct(productEdited);
    } else {
      notify("success","Agregado Correctamente",3000);
      
      createProduct(prepareData);
    }
    
    reset();
    
    document.getElementById("customer_modal").close();
    setTimeout(() => {
      setIsEditing(false);
    }, 250);
  };


  return (
    <>
      <div
        className="absolute right-32 bottom-60"
        onClick={() => document.getElementById("customer_modal").showModal()}
      >
        <ProductAddIcon />
      </div>
      <dialog
        id="customer_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {isEditing ? "Editar Cliente" : "Agrega cliente"}
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
                  {...register("name", { required: true })}
                  type="text"
                  className="grow"
                />
              </label>
              {errors.name && <span className="text-error">El nombre es rquerido</span>}

              <label className="input input-bordered flex items-center gap-2">
                Email:
                <input
                  {...register("email", { required: true, type: "email" })}
                  type="email"
                  className="grow"
                />
              </label>
              {errors.email && <span className="text-error">El email es requerido</span>}

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

export default CustomerModal;
