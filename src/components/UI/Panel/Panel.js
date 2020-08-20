import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.light1};
  padding: ${({ theme }) => theme.spacings.level3};
  width: 100%;
`;

const Panel = (props) => {
  const { children } = props;
  return <SC.Wrapper>{children}</SC.Wrapper>;
};

Panel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Panel;
