import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  align-self: flex-start;
  justify-self: center;
  max-width: 100%;
  text-align: left;
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
    align-items: center;
    display: flex;
    justify-content: flex-end;
  }

  & .cancel-button-box {
    margin-right: ${({ theme }) => theme.spacings.level3};
  }

  & .error {
    color: ${({ theme }) => theme.colors.red};
    display: inline-block;
    font-size: 1.5rem;
    margin-top: ${({ theme }) => theme.spacings.level3};
  }
`;
