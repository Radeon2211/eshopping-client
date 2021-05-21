import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.light1};
  box-shadow: ${({ theme }) => theme.level1};
  padding: ${({ theme }) => theme.spacings.level3};
  width: 100%;

  @media only screen and (max-width: 56.25em) {
    padding: ${({ theme }) => theme.spacings.level3} ${({ theme }) => theme.spacings.level2};
  }
`;

export default function PlainPanel(props) {
  const { children } = props;
  return <SC.Wrapper {...props}>{children}</SC.Wrapper>;
}

PlainPanel.propTypes = {
  children: PropTypes.node.isRequired,
};
