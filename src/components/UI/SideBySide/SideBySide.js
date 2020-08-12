import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SC = {};
SC.Wrapper = styled.div`
  align-items: start;
  display: flex;
  width: 100%;

  ${({ proportion, theme }) => {
    const [first, second] = proportion.split('/');
    return `
      & > *:first-child {
        flex: ${first};
        margin-right: ${theme.spacings.level3};
      }
      & > *:last-child {
        flex: ${second};
      }
    `;
  }}
`;

const SideBySide = (props) => {
  const { children, proportion } = props;
  return <SC.Wrapper proportion={proportion}>{children}</SC.Wrapper>;
};

SideBySide.propTypes = {
  proportion: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SideBySide;
