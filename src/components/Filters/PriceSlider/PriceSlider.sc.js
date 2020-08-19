import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;

  & .input {
    appearance: none;
    display: inline;
    height: 1rem;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    width: 100%;
    z-index: ${({ theme }) => theme.zIndexes.level2};

    &::-webkit-slider-thumb {
      appearance: none;
      border: 0 none;
      border-radius: 0;
      cursor: pointer;
      height: 2.4rem;
      pointer-events: all;
      width: 2.4rem;
    }
  }
`;

export const Slider = styled.div`
  height: 1rem;
  position: relative;
  z-index: ${({ theme }) => theme.zIndexes.level1};

  & .track {
    background-color: ${({ theme }) => theme.colors.light2};
    border-radius: 5px;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: ${({ theme }) => theme.zIndexes.level1};
  }

  & .range {
    background-color: ${({ theme }) => theme.colors.blue};
    bottom: 0;
    border-radius: 5px;
    left: ${({ positions: { left } }) => left}%;
    position: absolute;
    top: 0;
    right: ${({ positions: { right } }) => right}%;
    z-index: ${({ theme }) => theme.zIndexes.level2};
  }

  & .thumb {
    background-color: ${({ theme }) => theme.colors.light1};
    border: 2px solid ${({ theme }) => theme.colors.blue};
    border-radius: 50%;
    height: 2.4rem;
    position: absolute;
    width: 2.4rem;
    z-index: ${({ theme }) => theme.zIndexes.level3};

    &.left {
      left: ${({ positions: { left } }) => left}%;
      transform: translate(-${({ positions: { left } }) => left}%, -0.7rem);
    }

    &.right {
      right: ${({ positions: { right } }) => right}%;
      transform: translate(${({ positions: { right } }) => right}%, -0.7rem);
    }
  }
`;
