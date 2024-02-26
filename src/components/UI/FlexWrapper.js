import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.div`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  flex-wrap: ${({ $wrap }) => $wrap};
  justify-content: ${({ $justify }) => $justify};
  margin-top: ${({ theme, $mgTop }) => ($mgTop ? theme.spacings[`level${$mgTop}`] : '0')};
  margin-right: ${({ theme, $mgRight }) => ($mgRight ? theme.spacings[`level${$mgRight}`] : '0')};
  margin-bottom: ${({ theme, $mgBottom }) =>
    $mgBottom ? theme.spacings[`level${$mgBottom}`] : '0'};
  margin-left: ${({ theme, $mgLeft }) => ($mgLeft ? theme.spacings[`level${$mgLeft}`] : '0')};
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
    const level = `level${$spacing}`;
    if ($direction === 'row') {
      return `
        & > *:not(:last-child) {
          margin-right: ${$spacing ? theme.spacings[level] : '0'};
        }
      `;
    }
    return `
      & > *:not(:last-child) {
        margin-bottom: ${$spacing ? theme.spacings[level] : '0'};
      }
    `;
  }}
`;

export default function FlexWrapper({ children, ...props }) {
  return <SC.Wrapper {...props}>{children}</SC.Wrapper>;
}

FlexWrapper.defaultProps = {
  $direction: 'row',
  $justify: '',
  $align: '',
  $flex: '',
  $wrap: 'nowrap',
  $spacing: '',
  $mgBottom: '',
  $mgTop: '',
  $mgRight: '',
  $mgLeft: '',
  $width: '100%',
};

FlexWrapper.propTypes = {
  $direction: PropTypes.string,
  $justify: PropTypes.string,
  $align: PropTypes.string,
  $flex: PropTypes.string,
  $wrap: PropTypes.string,
  $spacing: PropTypes.string,
  $mgBottom: PropTypes.string,
  $mgTop: PropTypes.string,
  $mgRight: PropTypes.string,
  $mgLeft: PropTypes.string,
  $width: PropTypes.string,
  children: PropTypes.node.isRequired,
};
