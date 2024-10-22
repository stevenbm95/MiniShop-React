
import { toast } from "react-toastify";

const notify = (typeToast, message, timeOf) => {
  switch (typeToast) {
    case "success":
      toast.success(message, { autoClose: timeOf });
      break;
    case "error":
      toast.error(message, { autoClose: timeOf });
      break;
    default:
      toast.info(message, { autoClose: timeOf });
      break;
  }
}

export { notify };
