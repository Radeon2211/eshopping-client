import styled from 'styled-components';
import { InputProps } from './Input';

export const Wrapper = styled.div<{
  $type: InputProps['config']['type'];
  $checked: InputProps['config']['checked'];
  className: string;
}>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacings.level3};

  ${({ $type, theme }) => {
    if ($type === 'checkbox') {
      return `
        align-items: center;
        flex-direction: row;

        & > label {
          cursor: pointer;
          display: inline-block;
          font-size: ${theme.fontSizes.level2};
          line-height: ${theme.lineHeights.level6};
          order: 1;
          padding: 0 0 0 calc(${theme.spacings.level3} + ${theme.spacings.level1});
          position: relative;

          &::before {
            border: 2px solid ${theme.colors.blue};
            border-radius: 1px;
            content: '';
            height: ${theme.spacings.level3};
            left: 0;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: ${theme.spacings.level3};
          }

          &::after {
            color: ${theme.colors.blue};
            content: '✗';
            font-size: ${theme.fontSizes.level4};
            font-weight: 700;
            opacity: 0;
            left: ${theme.spacings.level2};
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: opacity ${theme.durations.level1}s;
          }
        }

        & > input {
          height: 0;
          opacity: 0;
          margin: 0;
          width: 0;
        }
      `;
    }
    return ``;
  }}

  ${({ $checked }) => {
    if ($checked) {
      return `
        & > label::after {
          opacity: 1;
        }
      `;
    }
    return ``;
  }}

  & .select {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }

  & .textarea {
    border: none;
    border-bottom: 3px solid rgba(0, 0, 0, 0.1);
    outline: none;
    font-size: ${({ theme }) => theme.fontSizes.level2};
    font-family: inherit;
    padding: 0 0 ${({ theme }) => theme.spacings.level1} 0;
    transition: border-bottom ${({ theme }) => theme.durations.level1}s;
    resize: none;

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
`;

export const Input = styled.input`
  border: none;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  color: #000;
  font-size: ${({ theme }) => theme.fontSizes.level1};
  font-family: inherit;
  outline: none;
  padding: 0 0 ${({ theme }) => theme.spacings.level1} 0;
  transition: border-bottom ${({ theme }) => theme.durations.level1}s;
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

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.level3};
  padding-bottom: ${({ theme }) => theme.spacings.level1};
  transition: color ${({ theme }) => theme.durations.level1}s;

  ${Wrapper}.valid & {
    color: ${({ theme }) => theme.colors.greenDark};
  }

  ${Wrapper}.invalid & {
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const RadioWrapper = styled.div<{
  $checked: InputProps['config']['checked'];
}>`
  align-items: center;
  display: flex;

  &:first-of-type {
    margin-top: calc(${({ theme }) => theme.spacings.level1} / 2);
  }

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacings.level2};
  }

  & > label {
    cursor: pointer;
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSizes.level3};
    line-height: ${({ theme }) => theme.lineHeights.level6};
    order: 1;
    padding: 0 0 0
      calc(${({ theme }) => theme.spacings.level3} + ${({ theme }) => theme.spacings.level1});
    position: relative;

    &::before {
      align-items: center;
      border: 2px solid ${({ theme }) => theme.colors.blue};
      border-radius: 50%;
      color: ${({ theme }) => theme.colors.blue};
      content: '';
      display: flex;
      height: ${({ theme }) => theme.spacings.level3};
      font-size: ${({ theme }) => theme.fontSizes.level6};
      font-weight: 700;
      justify-content: center;
      left: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: ${({ theme }) => theme.spacings.level3};
    }

    &::after {
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.blue};
      content: '';
      display: flex;
      height: ${({ theme }) => theme.spacings.level2};
      left: ${({ theme }) => theme.spacings.level2};
      opacity: 0;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: ${({ theme }) => theme.spacings.level2};

      ${({ $checked }) => {
        return $checked ? `opacity: 1;` : ``;
      }}
    }
  }

  & > input {
    height: 0;
    opacity: 0;
    margin: 0;
    width: 0;
  }
`;
