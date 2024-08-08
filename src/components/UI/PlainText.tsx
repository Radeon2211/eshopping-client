import styled from 'styled-components';
import { PropsWithChildren } from '../../shared/types/types';
import { ThemeFontSize, ThemeLineHeight, ThemeSpacing } from '../../styled/theme';

interface PlainTextProps {
  $display?: string;
  $textAlign?: string;
  $alignSelf?: string;
  $color?: string;
  $size?: ThemeFontSize;
  $transform?: string;
  $wordBreak?: string;
  $weight?: string;
  $spacing?: string;
  $fStyle?: string;
  $mgTop?: ThemeSpacing;
  $mgRight?: ThemeSpacing;
  $mgBottom?: ThemeSpacing;
  $mgLeft?: ThemeSpacing;
  $whiteSpace?: string;
  $overflow?: string;
  $textOverflow?: string;
  $lineHeight?: ThemeLineHeight;
  $minusMgTop?: boolean;
  $extraMgTop?: string;
  $maxWidth?: string;
}

const Wrapper = styled.span<PlainTextProps>`
  display: ${({ $display }) => $display};
  font-style: ${({ $fStyle }) => $fStyle};
  font-weight: ${({ $weight }) => $weight};
  letter-spacing: ${({ $spacing }) => $spacing};
  line-height: ${({ $lineHeight, theme }) => theme.lineHeights[$lineHeight!]};
  margin-bottom: ${({ $mgBottom, theme }) => ($mgBottom ? theme.spacings[$mgBottom] : '0')};
  margin-left: ${({ $mgLeft, theme }) => ($mgLeft ? theme.spacings[$mgLeft] : '0')};
  margin-right: ${({ $mgRight, theme }) => ($mgRight ? theme.spacings[$mgRight] : '0')};
  overflow: ${({ $overflow }) => $overflow};
  text-overflow: ${({ $textOverflow }) => $textOverflow};
  white-space: ${({ $whiteSpace }) => $whiteSpace};

  ${({ $textAlign }) => {
    return $textAlign ? `text-align: ${$textAlign};` : ``;
  }}

  ${({ $alignSelf }) => {
    return $alignSelf ? `align-self: ${$alignSelf};` : ``;
  }}

  ${({ $wordBreak }) => {
    return $wordBreak ? `word-break: ${$wordBreak};` : ``;
  }}

  ${({ $color }) => {
    return $color ? `color: ${$color};` : ``;
  }}

  ${({ $size, theme }) => {
    if ($size) {
      return `font-size: ${theme.fontSizes[$size]};`;
    }
    return ``;
  }}

  ${({ $transform }) => {
    return $transform ? `text-transform: ${$transform};` : ``;
  }}

  ${({ $maxWidth }) => {
    return $maxWidth ? `max-width: ${$maxWidth};` : ``;
  }}

  ${({ theme, $mgTop, $minusMgTop, $extraMgTop }) => {
    if ($minusMgTop && $mgTop) {
      return `
        margin-top: calc(-${theme.spacings[$mgTop]} - ${$extraMgTop});
      `;
    }
    if ($mgTop) {
      return `
        margin-top: calc(${theme.spacings[$mgTop]} + ${$extraMgTop});
      `;
    }
    return ``;
  }}
`;

export default function PlainText(props: PropsWithChildren<PlainTextProps>) {
  const { children } = props;
  return <Wrapper {...props}>{children}</Wrapper>;
}

PlainText.defaultProps = {
  $display: 'inline-block',
  $textAlign: '',
  $alignSelf: '',
  $color: '',
  $transform: '',
  $wordBreak: '',
  $weight: 'normal',
  $spacing: '0px',
  $fStyle: 'normal',
  $whiteSpace: 'normal',
  $overflow: 'visible',
  $textOverflow: 'clip',
  $lineHeight: 'level3',
  $minusMgTop: false,
  $extraMgTop: '0rem',
  $maxWidth: '',
} satisfies PlainTextProps;
