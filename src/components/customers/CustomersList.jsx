import useStoreCustomers from "../../stores/customers/StoreCustomers";

const CustomersList = () => {
  const { customers } = useStoreCustomers();

  console.log(customers);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {customers.map((item, index) => (
          <tr key={item.id}>
            <th>{index +1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <button>1</button>
              <button>2</button>
            </tr>
      ))}
              
          </tbody>
        </table>
      </div>
   
    </>
  );
};

export default CustomersList;
