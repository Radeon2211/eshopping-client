import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { validateURL } from '../../../shared/utility/utility';
import noPhoto from '../../../images/no-photo.png';

const SC = {};
SC.Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 100%;
  max-height: ${({ $height }) => $height}rem;
  min-width: ${({ $width }) => $width}rem;
  width: ${({ $width }) => $width}rem;

  & > img {
    max-height: ${({ $height }) => $height}rem;
    max-width: ${({ $width }) => $width}rem;
    object-fit: cover;
  }
`;

const ProductThumbnail = React.memo(({ photo, alt, productId, width, height, orderId }) => {
  const photoURL = orderId
    ? `${process.env.REACT_APP_API_URL}/orders/${orderId}/${productId}/photo`
    : `${process.env.REACT_APP_API_URL}/products/${productId}/photo`;
  const validPhotoURL = validateURL(photoURL) ? photoURL : noPhoto;

  return (
    <SC.Wrapper $width={width} $height={height} data-testid="ProductThumbnail">
      <img src={photo ? validPhotoURL : noPhoto} alt={alt} data-testid="ProductThumbnail-img" />
    </SC.Wrapper>
  );
});

ProductThumbnail.defaultProps = {
  orderId: '',
};

ProductThumbnail.propTypes = {
  photo: PropTypes.bool.isRequired,
  alt: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  orderId: PropTypes.string,
};

export default ProductThumbnail;

ProductThumbnail.displayName = 'ProductThumbnail';
