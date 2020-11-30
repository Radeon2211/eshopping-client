import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Main = styled.main`
  margin: 0 auto;
  max-width: 120rem;
  min-height: 100vh;
  padding: 8.7rem ${({ theme }) => theme.spacings.level2} 0;

  @media only screen and (max-width: 37.5em) {
    padding-top: 14.5rem;
  }
`;

const Main = (props) => {
  const { children } = props;
  return <SC.Main>{children}</SC.Main>;
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
