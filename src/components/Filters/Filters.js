import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Heading from '../UI/Heading/Heading';
import Panel from '../UI/Panel/Panel';

const Filters = (props) => {
  const { products, isListLoading } = props;
  const {
    location: { search },
  } = useHistory();

  let filters = 'Filters';
  if (products) {
    if (products.length <= 0) {
      const queryStringKeys = Object.keys(queryString.parse(search));
      if (queryStringKeys.length > 0) {
        filters = 'Filters';
      } else {
        filters = <Heading variant="h4">Filters are unavailable</Heading>;
      }
      if (queryStringKeys.length === 1 && queryStringKeys.includes('name')) {
        filters = <Heading variant="h4">Filters are unavailable</Heading>;
      }
    }
  }

  return <Panel show={!isListLoading}>{filters}</Panel>;
};

Filters.defaultProps = {
  products: null,
};

Filters.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  isListLoading: PropTypes.bool.isRequired,
};

export default Filters;
