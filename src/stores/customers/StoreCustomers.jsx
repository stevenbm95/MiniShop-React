import { create } from "zustand";
import { getCustomersApi } from "../../api/customersApi";

const useStoreCustomers = create((set) => ({
  customers: [],
  loadCustomers: async () => {
    const apiCustomers = await getCustomersApi();       
    console.log(apiCustomers);
     
    set(() => ({ customers: apiCustomers}));
  },
}));

export default useStoreCustomers;