import React from 'react';
import styled from 'styled-components';
import { validateURL } from '../../../shared/utility/utility';
import noPhoto from '../../../images/no-photo.png';

interface ProductThumbnailProps {
  isPhoto: boolean;
  alt: string;
  productId: string;
  width: string;
  height: string;
  orderId?: string;
}

const Wrapper = styled.div<{ $width: string; $height: string; 'data-testid': string }>`
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

const ProductThumbnail = React.memo(
  ({ isPhoto, alt, productId, width, height, orderId }: ProductThumbnailProps) => {
    const photoURL = orderId
      ? `${process.env.REACT_APP_API_URL}/orders/${orderId}/${productId}/photo`
      : `${process.env.REACT_APP_API_URL}/products/${productId}/photo`;
    const validPhotoURL = validateURL(photoURL) ? photoURL : noPhoto;

    return (
      <Wrapper $width={width} $height={height} data-testid="ProductThumbnail">
        <img src={isPhoto ? validPhotoURL : noPhoto} alt={alt} data-testid="ProductThumbnail-img" />
      </Wrapper>
    );
  },
);

export default ProductThumbnail;

ProductThumbnail.displayName = 'ProductThumbnail';
