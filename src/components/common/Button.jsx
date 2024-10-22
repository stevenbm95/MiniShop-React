import PropTypes from "prop-types";

const Button = ({ style, message, onClick,  isDisabled = false }) => {
  const styles = {
    primary: "btn btn-primary",
    error: "btn btn-error",
    info: "btn btn-info",
    success: "btn btn-success",
    warning: "btn btn-warning",
  };

  return (
    <button
      disabled={isDisabled}
      className={`${styles[style]} text-white`}
      onClick={!isDisabled ? onClick : null}
    >
      {message}
    </button>
  );
};

export default Button;

Button.propTypes = {
  style: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  idProduct: PropTypes.string,
  isDisabled: PropTypes.bool,
};
