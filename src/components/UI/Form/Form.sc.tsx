import styled from 'styled-components';
import { FormProps } from './Form';

export const Wrapper = styled.div<{ $height: FormProps['height'] }>`
  align-self: flex-start;
  justify-self: center;
  max-width: 100%;
  text-align: left;
  width: 65rem;

  ${({ $height }) => {
    if ($height) {
      return `
        & .formik-form {
          position: relative;
          height: ${$height}rem;
        }
      `;
    }
    return ``;
  }}
`;
