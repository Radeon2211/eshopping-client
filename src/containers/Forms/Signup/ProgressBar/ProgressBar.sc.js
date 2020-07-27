import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacings.level3};
  max-width: 100%;
  width: 45rem;

  .step-box {
    align-items: center;
    background-color: ${({ theme }) => theme.colors.light1};
    border: 3px solid ${({ theme }) => theme.colors.light2};
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.light3};
    display: flex;
    height: 3.2rem;
    justify-content: center;
    transition: all 0.3s;
    width: 3.2rem;
  }

  .step-box.active {
    background-color: ${({ theme }) => theme.colors.light1};
    border: 3px solid ${({ theme }) => theme.colors.blue};
    color: #000;
  }

  .step-number {
    font-size: 1.6rem;
    line-height: 1;
  }

  .step-line {
    align-self: center;
    background-color: ${({ theme }) => theme.colors.light2};
    flex: 1;
    height: 4px;
    position: relative;
  }

  .step-line-fill {
    background-color: ${({ theme }) => theme.colors.blue};
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: width 0.3s;
    width: 0;
  }

  .step-line-fill.active {
    width: 100%;
  }
`;