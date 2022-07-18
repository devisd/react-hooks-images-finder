import PropTypes from 'prop-types';
import './Container.css';

const Container = ({ children }) => {
  return <div className="Container">{children}</div>;
};

export default Container;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
