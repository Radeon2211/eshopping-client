import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.span`
  display: ${({ display }) => display};
  font-style: ${({ fStyle }) => fStyle};
  font-weight: ${({ weight }) => weight};
  letter-spacing: ${({ spacing }) => spacing};
  line-height: ${({ lineHeight, theme }) => theme.lineHeights[`level${lineHeight}`]};
  margin-bottom: ${({ mgBottom, theme }) => (mgBottom ? theme.spacings[`level${mgBottom}`] : '0')};
  margin-left: ${({ mgLeft, theme }) => (mgLeft ? theme.spacings[`level${mgLeft}`] : '0')};
  margin-right: ${({ mgRight, theme }) => (mgRight ? theme.spacings[`level${mgRight}`] : '0')};
  overflow: ${({ overflow }) => overflow};
  text-overflow: ${({ textOverflow }) => textOverflow};
  white-space: ${({ whiteSpace }) => whiteSpace};

  ${({ textAlign }) => {
    if (textAlign) {
      return `
        text-align: ${textAlign};
      `;
    }
    return ``;
  }}

  ${({ alignSelf }) => {
    if (alignSelf) {
      return `
        align-self: ${alignSelf};
      `;
    }
    return ``;
  }}

  ${({ wordBreak }) => {
    if (wordBreak) {
      return `
        word-break: ${wordBreak};
      `;
    }
    return ``;
  }}

  ${({ color }) => {
    if (color) {
      return `
        color: ${color};
      `;
    }
    return ``;
  }}

  ${({ size, theme }) => {
    if (size) {
      const level = `level${size}`;
      return `
        font-size: ${theme.fontSizes[level]};
      `;
    }
    return ``;
  }}

  ${({ transform }) => {
    if (transform) {
      return `
        text-transform: ${transform};
      `;
    }
    return ``;
  }}

  ${({ maxWidth }) => {
    if (maxWidth) {
      return `
        max-width: ${maxWidth};
      `;
    }
    return ``;
  }}

  ${({ theme, mgTop, minusMgTop, extraMgTop }) => {
    const level = `level${mgTop}`;
    if (minusMgTop) {
      return `
        margin-top: calc(-${theme.spacings[level]} - ${extraMgTop});
      `;
    }
    if (mgTop) {
      return `
        margin-top: calc(${theme.spacings[level]} + ${extraMgTop});
      `;
    }
    return ``;
  }}
`;

const PlainText = (props) => {
  const { children } = props;
  return <SC.Wrapper {...props}>{children}</SC.Wrapper>;
};

PlainText.defaultProps = {
  display: 'inline-block',
  textAlign: '',
  alignSelf: '',
  color: '',
  size: '',
  transform: '',
  wordBreak: '',
  weight: 'normal',
  spacing: '0px',
  fStyle: 'normal',
  mgTop: '',
  mgRight: '',
  mgBottom: '',
  mgLeft: '',
  whiteSpace: 'normal',
  overflow: 'visible',
  textOverflow: 'clip',
  lineHeight: 'level3',
  minusMgTop: false,
  extraMgTop: '0rem',
  maxWidth: '',
};

PlainText.propTypes = {
  display: PropTypes.string,
  textAlign: PropTypes.string,
  alignSelf: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  transform: PropTypes.string,
  wordBreak: PropTypes.string,
  weight: PropTypes.string,
  spacing: PropTypes.string,
  fStyle: PropTypes.string,
  mgTop: PropTypes.string,
  mgRight: PropTypes.string,
  mgBottom: PropTypes.string,
  mgLeft: PropTypes.string,
  whiteSpace: PropTypes.string,
  overflow: PropTypes.string,
  textOverflow: PropTypes.string,
  lineHeight: PropTypes.string,
  minusMgTop: PropTypes.bool,
  extraMgTop: PropTypes.string,
  maxWidth: PropTypes.string,
};

export default PlainText;
