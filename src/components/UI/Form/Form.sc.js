import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  align-self: flex-start;
  justify-self: center;
  max-width: 100%;
  width: 65rem;

  ${({ height }) => {
    if (height) {
      return `
        & .formik-form {
          position: relative;
          height: ${height}rem;
        }
      `;
    }
  }}

  & .buttons-box {
    display: flex;
    align-items: center;
  }

  & .cancel-button-box {
    margin-left: 2.4rem;
  }

  & .error {
    color: var(--red);
    display: inline-block;
    font-size: 1.5rem;
    margin-top: 2.4rem;
  }
`;
