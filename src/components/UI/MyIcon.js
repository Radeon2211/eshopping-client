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

    ${({ $color, theme }) => {
      return $color ? `fill: ${$color};` : `fill: ${theme.colors.light4};`;
    }}

    ${({ $size }) => {
      if ($size === 'small') {
        return `
          width: 1.7rem;
          height: 1.7rem;
        `;
      }
      if ($size === 'medium') {
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

    ${({ $disabled, theme }) => {
      return $disabled ? `fill: ${theme.colors.light3};` : ``;
    }}

    ${({ $rotation }) => {
      return $rotation ? `transform: rotate(${$rotation}deg);` : ``;
    }}
  }
`;

export default function MyIcon(props) {
  const { children, ...rest } = props;
  return <SC.Wrapper {...rest}>{children}</SC.Wrapper>;
}

MyIcon.defaultProps = {
  $disabled: false,
  $rotation: 0,
  $color: '',
};

MyIcon.propTypes = {
  $size: PropTypes.string.isRequired,
  $color: PropTypes.string,
  $rotation: PropTypes.number,
  $disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
