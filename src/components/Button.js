import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { children, handleClick, dataTestId } = this.props;
    return (
      <button
        data-testid={ dataTestId }
        type="button"
        onClick={ handleClick }
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  dataTestId: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Button.defaultProps = {
  dataTestId: '',
  handleClick: () => {},
};
export default Button;
