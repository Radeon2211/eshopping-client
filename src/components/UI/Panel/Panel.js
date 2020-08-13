import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.light1};
  padding: ${({ theme }) => theme.spacings.level3};
  width: 100%;

  ${({ show }) => {
    if (!show) {
      return `
        opacity: 0;
        pointer-events: none;
      `;
    }
    return ``;
  }}
`;

const Panel = (props) => {
  const { children, show } = props;
  return <SC.Wrapper show={show}>{children}</SC.Wrapper>;
};

Panel.defaultProps = {
  show: true,
};

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
};

export default Panel;
