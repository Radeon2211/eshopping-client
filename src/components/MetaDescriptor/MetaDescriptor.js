import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

export default function MetaDescriptor({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}

MetaDescriptor.defaultProps = {
  description: '',
};

MetaDescriptor.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};
