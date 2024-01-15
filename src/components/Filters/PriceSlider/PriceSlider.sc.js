import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const LabelAndInputs = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacings.level1};
  padding-bottom: ${({ theme }) => theme.spacings.level1};

  & .inputs-gap {
    margin: 0 ${({ theme }) => theme.spacings.level1};
  }
`;

export const Slider = styled.div.attrs(({ $positions: { left, right } }) => ({
  $left: left,
  $right: right,
}))`
  height: 1rem;
  margin-top: ${({ theme }) => theme.spacings.level1};
  position: relative;
  z-index: ${({ theme }) => theme.zIndexes.level1};

  & .input {
    appearance: none;
    display: inline;
    height: 1rem;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    width: 100%;
    z-index: ${({ theme }) => theme.zIndexes.level4};

    &::-webkit-slider-thumb {
      appearance: none;
      border: 0 none;
      border-radius: 0;
      cursor: pointer;
      height: 2.6rem;
      pointer-events: all;
      width: 2.6rem;
    }
  }

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
    left: ${({ $left }) => $left}%;
    position: absolute;
    top: 0;
    right: ${({ $right }) => $right}%;
    z-index: ${({ theme }) => theme.zIndexes.level2};
  }

  & .thumb {
    background-color: ${({ theme }) => theme.colors.light1};
    border: 2px solid ${({ theme }) => theme.colors.blue};
    border-radius: 50%;
    height: 2.6rem;
    position: absolute;
    width: 2.6rem;
    z-index: ${({ theme }) => theme.zIndexes.level3};

    &.left {
      left: ${({ $left }) => $left}%;
      transform: translate(-${({ $left }) => $left}%, -0.8rem);
    }

    &.right {
      transform: translate(${({ $right }) => $right}%, -0.8rem);
      right: ${({ $right }) => $right}%;
    }
  }
`;
