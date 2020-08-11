import React from 'react';
import PropTypes from 'prop-types';

const Filters = (props) => {
  const { fetchProducts } = props;

  return (
    <div>
      Filters
    </div>
  );
};

Filters.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
};

export default Filters;
