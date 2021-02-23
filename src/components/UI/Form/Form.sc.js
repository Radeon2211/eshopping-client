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
    return ``;
  }}
`;
