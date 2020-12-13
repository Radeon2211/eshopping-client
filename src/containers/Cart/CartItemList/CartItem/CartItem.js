import React from 'react';
import PropTypes from 'prop-types';

const CartItem = (props) => {
  const { data } = props;
  return <div />;
};

CartItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CartItem;
