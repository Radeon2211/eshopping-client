import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from '../Loader/Loader';

const SC = {};
SC.Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light1Transparent};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  padding-top: ${({ theme }) => theme.spacings.level5};
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level1};

  & .info {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    margin-top: ${({ theme }) => theme.spacings.level2};
  }

  ${({ alignLoader }) => {
    if (alignLoader === 'top') {
      return `
        justify-items: start;
      `;
    }
    if (alignLoader === 'center') {
      return `
        justify-items: center;
      `;
    }
    return ``;
  }}

  ${({ zeroPadding }) => {
    if (zeroPadding) {
      return `
        padding: 0;
      `;
    }
    return ``;
  }}
`;

const LoadingOverlay = (props) => {
  const { alignLoader, loaderSize, zeroPadding } = props;

  const [isInfoVisible, setIsInfoVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsInfoVisible(true);
    }, 8000);
    return () => clearTimeout(timeout);
  }, [setIsInfoVisible]);

  let info = false;
  if (isInfoVisible) {
    info = <span className="info">Just a second</span>;
  }

  return (
    <SC.Wrapper alignLoader={alignLoader} zeroPadding={zeroPadding}>
      <Loader size={loaderSize} />
      {info}
    </SC.Wrapper>
  );
};

LoadingOverlay.defaultProps = {
  zeroPadding: false,
};

LoadingOverlay.propTypes = {
  zeroPadding: PropTypes.bool,
  alignLoader: PropTypes.string.isRequired,
  loaderSize: PropTypes.string.isRequired,
};

export default LoadingOverlay;
