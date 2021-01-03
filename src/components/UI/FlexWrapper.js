import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  flex-wrap: ${({ wrap }) => wrap};
  justify-content: ${({ justify }) => justify};
  margin-top: ${({ theme, mgTop }) => (mgTop ? theme.spacings[mgTop] : mgTop)};
  margin-right: ${({ theme, mgRight }) => (mgRight ? theme.spacings[mgRight] : mgRight)};
  margin-bottom: ${({ theme, mgBottom }) => (mgBottom ? theme.spacings[mgBottom] : mgBottom)};
  margin-left: ${({ theme, mgLeft }) => (mgLeft ? theme.spacings[mgLeft] : mgLeft)};
  width: 100%;

  ${({ justify }) => {
    if (justify) {
      return `
        justify-content: ${justify};
      `;
    }
    return ``;
  }}

  ${({ align }) => {
    if (align) {
      return `
        align-items: ${align};
      `;
    }
    return ``;
  }}

  ${({ theme, direction, spacing }) => {
    if (direction === 'row') {
      return `
        & > *:not(:last-child) {
          margin-right: ${spacing ? theme.spacings[spacing] : spacing};
        }
      `;
    }
    return `
      & > *:not(:last-child) {
        margin-bottom: ${spacing ? theme.spacings[spacing] : spacing};
      }
    `;
  }}
`;

const FlexWrapper = (props) => {
  const { children } = props;
  return <SC.Wrapper {...props}>{children}</SC.Wrapper>;
};

FlexWrapper.defaultProps = {
  direction: 'row',
  justify: '',
  align: '',
  wrap: 'nowrap',
  spacing: 'level3',
  mgBottom: '0',
  mgTop: '0',
  mgRight: '0',
  mgLeft: '0',
};

FlexWrapper.propTypes = {
  direction: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  wrap: PropTypes.string,
  spacing: PropTypes.string,
  mgBottom: PropTypes.string,
  mgTop: PropTypes.string,
  mgRight: PropTypes.string,
  mgLeft: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FlexWrapper;
