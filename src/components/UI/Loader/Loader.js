import React from 'react';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.div`
  display: inline-block;
  position: relative;
  ${({ size }) => {
    if (size === 'big') {
      return `
        width: 7rem;
        height: 7rem;
      `;
    }
    return `
        width: 4rem;
        height: 4rem;
      `;
  }}

  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    border-radius: 50%;
    animation: rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    ${({ size, theme }) => {
      if (size === 'big') {
        return `
          width: 7rem;
          height: 7rem;
          border: 0.8rem solid ${theme.colors.blue};
        `;
      }
      return `
          width: 4rem;
          height: 4rem;
          border: 0.5rem solid ${theme.colors.blue};
        `;
    }}
    border-color: ${({ theme }) => theme.colors.blue} transparent transparent transparent;
  }

  & > div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & > div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & > div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = (props) => {
  const { size } = props;
  return (
    <SC.Wrapper size={size}>
      <div />
      <div />
      <div />
      <div />
    </SC.Wrapper>
  );
};

export default Loader;
