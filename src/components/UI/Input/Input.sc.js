import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacings.level3};

  ${({ type, theme }) => {
    if (type === 'checkbox') {
      return `
        align-items: center;
        flex-direction: row;

        & > label {
          order: 1;
          padding: 0 0 0 ${theme.spacings.level1};
        }

        & > input {
          height: 1.6rem;
          margin: 0;
          padding: 0;
          width: 1.6rem;
        }
      `;
    }
  }}

  & .select {
    font-size: 1.4rem;
  }

  & .textarea {
    font-size: 1.4rem;
    resize: none;
    font-family: inherit;
    outline: none;
    border: none;
    border-bottom: 3px solid rgba(0, 0, 0, 0.1);
    transition: border-bottom 0.12s;
    padding: 0 0 ${({ theme }) => theme.spacings.level1} 0;

    &::-webkit-input-placeholder {
      color: ${({ theme }) => theme.colors.light3};
    }

    &:focus {
      border-bottom: 3px solid rgba(0, 0, 0, 0.35);
    }
  }

  &.valid .textarea {
    border-bottom: 3px solid ${({ theme }) => theme.colors.greenDark};
  }

  &.invalid .textarea {
    border-bottom: 3px solid ${({ theme }) => theme.colors.red};
  }

  & .caption {
    display: block;
    font-size: 1.3rem;
    margin-top: ${({ theme }) => theme.spacings.level1};
  }
`;

export const Input = styled.input`
  border: none;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  color: #000;
  font-size: 1.4rem;
  font-family: inherit;
  outline: none;
  padding: 0 0 ${({ theme }) => theme.spacings.level1} 0;
  transition: border-bottom 0.12s;
  width: 100%;

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.light3};
  }

  &:focus {
    border-bottom: 3px solid rgba(0, 0, 0, 0.35);
  }

  ${Wrapper}.valid & {
    border-bottom: 3px solid ${({ theme }) => theme.colors.greenDark};
  }

  ${Wrapper}.invalid & {
    border-bottom: 3px solid ${({ theme }) => theme.colors.red};
  }
`;

export const Textarea = styled.textarea`
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  box-sizing: initial;
  color: #fff;
  display: block;
  font-size: 1.5rem;
  font-family: inherit;
  outline: none;
  overflow: hidden;
  padding: 0.9rem 1rem;
  transition: border-bottom 0.12s;
  resize: none;
  width: calc(100% - 2rem);

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }

  &:focus {
    border-bottom: 3px solid rgba(0, 0, 0, 0.35);
  }

  ${Wrapper}.valid & {
    border-bottom: 3px solid ${({ theme }) => theme.colors.greenDark};
  }

  ${Wrapper}.invalid & {
    border-bottom: 3px solid ${({ theme }) => theme.colors.red};
  }
`;

export const Label = styled.label`
  font-size: 1.5rem;
  padding-bottom: ${({ theme }) => theme.spacings.level1};
  transition: color 0.12s;

  ${Wrapper}.valid & {
    color: ${({ theme }) => theme.colors.greenDark};
  }

  ${Wrapper}.invalid & {
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const RadioWrapper = styled.div`
  align-items: center;
  display: flex;

  & > label {
    font-size: 1.4rem;
    order: 1;
    padding: 0 0 0 ${({ theme }) => theme.spacings.level1};
  }

  & > input {
    height: 1.6rem;
    margin: 0;
    padding: 0;
    width: 1.6rem;
  }

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacings.level1};
  }
`;