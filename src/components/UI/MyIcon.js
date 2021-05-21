import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  & > svg {
    transform: rotate(0deg);
    transition: transform ${({ theme }) => theme.durations.level2}s;

    ${({ color, theme }) => {
      if (color) {
        return `
          fill: ${color};
        `;
      }
      return `
        fill: ${theme.colors.light4};
      `;
    }}

    ${({ size }) => {
      if (size === 'small') {
        return `
          width: 1.7rem;
          height: 1.7rem;
        `;
      }
      if (size === 'medium') {
        return `
          width: 2.5rem;
          height: 2.5rem;
        `;
      }
      return `
        width: 3.4rem;
        height: 3.4rem;
      `;
    }}

    ${({ disabled, theme }) => {
      if (disabled) {
        return `
          fill: ${theme.colors.light3};
        `;
      }
      return ``;
    }}

    ${({ rotation }) => {
      if (rotation) {
        return `
          transform: rotate(${rotation}deg);
        `;
      }
      return ``;
    }}
  }
`;

export default function MyIcon(props) {
  const { children } = props;
  return <SC.Wrapper {...props}>{children}</SC.Wrapper>;
}

MyIcon.defaultProps = {
  disabled: false,
  rotation: 0,
  color: '',
};

MyIcon.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  rotation: PropTypes.number,
  children: PropTypes.node.isRequired,
};
