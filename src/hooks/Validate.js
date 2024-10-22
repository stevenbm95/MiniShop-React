import { notify } from "../components/common/Toast";


const validate = (errors) => {
  console.log(errors);
  
  if (Object.keys(errors).length > 0) {
    // Si hay errores, muestra los mensajes correspondientes
    Object.keys(errors).forEach((errorKey) => {
      notify("error",`El campo ${errorKey} es requerido` ,3000);
    });
    return false;
  }
  return true;
};

export default validate;

  // const validate2 = () => {
  //   if (Object.keys(errors).length > 0) {
  //     // Si hay errores, muestra los mensajes correspondientes
  //     Object.keys(errors).forEach((errorKey) => {
  //       notify("success",`El campo ${errorKey} es requerido` ,3000);
  //     });
  //     return;
  //   }
  // };
