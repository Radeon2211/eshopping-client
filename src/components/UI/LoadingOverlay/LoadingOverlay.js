import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from '../Loader/Loader';

const SC = {};
SC.Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.light1Transparent};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  padding-top: ${({ theme }) => theme.spacings.level5};
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level1};

  ${({ alignLoader }) => {
    if (alignLoader === 'top') {
      return `
        align-items: start;
      `;
    }
    if (alignLoader === 'center') {
      return `
        align-items: center;
      `;
    }
    return ``;
  }}
`;

const LoadingOverlay = (props) => {
  const { alignLoader, loaderSize } = props;
  return (
    <SC.Wrapper alignLoader={alignLoader}>
      <Loader size={loaderSize} />
    </SC.Wrapper>
  );
};

LoadingOverlay.propTypes = {
  alignLoader: PropTypes.string.isRequired,
  loaderSize: PropTypes.string.isRequired,
};

export default LoadingOverlay;
