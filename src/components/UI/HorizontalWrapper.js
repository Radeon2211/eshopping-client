import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify};
  margin-bottom: ${({ theme, mgBottom }) => (mgBottom ? theme.spacings[mgBottom] : mgBottom)};
  margin-top: ${({ theme, mgTop }) => (mgTop ? theme.spacings[mgTop] : mgTop)};

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacings.level3};
  }
`;

const HorizontalWrapper = (props) => {
  const { children } = props;
  return <SC.Wrapper {...props}>{children}</SC.Wrapper>;
};

HorizontalWrapper.defaultProps = {
  justify: 'center',
  mgBottom: '0',
  mgTop: '0',
};

HorizontalWrapper.propTypes = {
  justify: PropTypes.string,
  mgBottom: PropTypes.string,
  mgTop: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default HorizontalWrapper;
