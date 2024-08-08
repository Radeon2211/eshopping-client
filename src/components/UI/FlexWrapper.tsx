import styled from 'styled-components';
import { PropsWithChildren } from '../../shared/types/types';
import { ThemeSpacing } from '../../styled/theme';

interface FlexWrapperProps {
  $direction?: string;
  $justify?: string;
  $align?: string;
  $flex?: string;
  $wrap?: string;
  $spacing?: ThemeSpacing;
  $mgBottom?: ThemeSpacing;
  $mgTop?: ThemeSpacing;
  $mgRight?: ThemeSpacing;
  $mgLeft?: ThemeSpacing;
  $width?: string;
}

const Wrapper = styled.div<FlexWrapperProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  flex-wrap: ${({ $wrap }) => $wrap};
  justify-content: ${({ $justify }) => $justify};
  margin-top: ${({ theme, $mgTop }) => ($mgTop ? theme.spacings[$mgTop] : '0')};
  margin-right: ${({ theme, $mgRight }) => ($mgRight ? theme.spacings[$mgRight] : '0')};
  margin-bottom: ${({ theme, $mgBottom }) => ($mgBottom ? theme.spacings[$mgBottom] : '0')};
  margin-left: ${({ theme, $mgLeft }) => ($mgLeft ? theme.spacings[$mgLeft] : '0')};
  width: ${({ $width }) => $width};

  ${({ $justify }) => {
    if ($justify) {
      return `
        justify-content: ${$justify};
      `;
    }
    return ``;
  }}

  ${({ $align }) => {
    if ($align) {
      return `
        align-items: ${$align};
      `;
    }
    return ``;
  }}

  ${({ $flex }) => {
    if ($flex) {
      return `
        flex: ${$flex};
      `;
    }
    return ``;
  }}

  ${({ theme, $direction, $spacing }) => {
    if ($direction === 'row') {
      return `
        & > *:not(:last-child) {
          margin-right: ${$spacing ? theme.spacings[$spacing] : '0'};
        }
      `;
    }
    return `
      & > *:not(:last-child) {
        margin-bottom: ${$spacing ? theme.spacings[$spacing] : '0'};
      }
    `;
  }}
`;

export default function FlexWrapper({ children, ...props }: PropsWithChildren<FlexWrapperProps>) {
  return <Wrapper {...props}>{children}</Wrapper>;
}

FlexWrapper.defaultProps = {
  $direction: 'row',
  $justify: '',
  $align: '',
  $flex: '',
  $wrap: 'nowrap',
  $width: '100%',
} satisfies FlexWrapperProps;
