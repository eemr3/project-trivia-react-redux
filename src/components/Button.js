import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { children, handleClick, dataTestId, className } = this.props;
    return (
      <button
        data-testid={ dataTestId }
        type="button"
        onClick={ handleClick }
        className={ className }
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  dataTestId: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Button.defaultProps = {
  dataTestId: '',
  handleClick: () => {},
  className: '',
};
export default Button;
