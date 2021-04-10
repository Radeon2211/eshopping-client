import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const MetaDescriptor = (props) => {
  const { title, description } = props;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

MetaDescriptor.defaultProps = {
  description: '',
};

MetaDescriptor.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default MetaDescriptor;
