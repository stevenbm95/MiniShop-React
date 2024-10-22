import PropTypes from 'prop-types';

const FormatNumber = ({ price }) => {
  const formattedPrice = price.toLocaleString('es-CO', {   
    minimumFractionDigits: 0, // Sin decimales
    maximumFractionDigits: 0, // Sin decimales
  });

  return <span>{formattedPrice}</span>;
};

FormatNumber.propTypes = {
  price: PropTypes.number.isRequired, // Asegúrate de que el precio sea un número
}

export default FormatNumber;