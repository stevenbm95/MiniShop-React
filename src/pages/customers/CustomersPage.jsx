
import { useEffect } from 'react';
import CustomersList from '../../components/customers/CustomersList'
import useStoreCustomers from '../../stores/customers/StoreCustomers';
import CustomerModal from '../../components/customers/CustomerModal';

const CustomersPage = () => {

  const { customers, loadCustomers} = useStoreCustomers();
  useEffect(() => {
    loadCustomers();
    
  }, [loadCustomers]);
  
  console.log(customers);
  return (
    <div className="container mx-auto mt-14">
    {customers.length > 0 ? (
      <CustomersList />
    ) : (
      <>
        <h1 className="font-bold text-2xl mt-5  text-center">
          No Hay clientes agregados
        </h1>
        <CustomerModal />
      </>
    )}
  </div>
  )
}

export default CustomersPage