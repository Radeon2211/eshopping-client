import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacings.level3};
  max-width: 100%;
  width: 45rem;

  .step-box {
    background-color: ${({ theme }) => theme.colors.light1};
    border: 3px solid ${({ theme }) => theme.colors.light2};
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.light3};
    height: 3.2rem;
    position: relative;
    transition: all ${({ theme }) => theme.durations.level3}s;
    width: 3.2rem;
  }

  .step-box.active {
    background-color: ${({ theme }) => theme.colors.light1};
    border: 3px solid ${({ theme }) => theme.colors.blue};
    color: #000;
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
    transition: width ${({ theme }) => theme.durations.level3}s;
    width: 0;
  }

  .step-line-fill.active {
    width: 100%;
  }
`;

export const StepBoxContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  transition: opacity ${({ theme }) => theme.durations.level3}s;
  height: 100%;
  width: 100%;

  ${({ visible }) => {
    return `
      opacity: ${visible ? '1' : '0'};
    `;
  }}
`;
