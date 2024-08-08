import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from '../Loader/Loader';
import PlainText from '../PlainText';

const SC = {};
SC.Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light1Transparent};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  justify-items: ${({ $alignLoader }) => $alignLoader};
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level1};
`;

export default function LoadingOverlay({ alignLoader, loaderSize, disableText }) {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsInfoVisible(true);
    }, 8000);
    return () => clearTimeout(timeout);
  }, [setIsInfoVisible]);

  let info = false;
  if (isInfoVisible && !disableText) {
    info = (
      <PlainText $size="level2" $mgTop="level2" data-testid="LoadingOverlay-info">
        Just a second
      </PlainText>
    );
  }

  return (
    <SC.Wrapper $alignLoader={alignLoader} data-testid="LoadingOverlay">
      <Loader size={loaderSize} />
      {info}
    </SC.Wrapper>
  );
}

LoadingOverlay.defaultProps = {
  alignLoader: 'center',
  disableText: false,
  loaderSize: '',
};

LoadingOverlay.propTypes = {
  alignLoader: PropTypes.string,
  loaderSize: PropTypes.string,
  disableText: PropTypes.bool,
};
