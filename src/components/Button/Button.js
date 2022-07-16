import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ text, onLoadClick }) => {
  return (
    <div className="Button-container">
      <button className="Button" type="button" onClick={onLoadClick}>
        {text}
      </button>
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onLoadClick: PropTypes.func,
};

export default Button;
