import styled from 'styled-components';
import PropTypes from 'prop-types';

const SC = {};
SC.Wrapper = styled.div`
  align-items: start;
  display: flex;
  width: 100%;

  ${({ $proportion, theme }) => {
    const [first, second] = $proportion.split('/');
    return `
      & > *:first-child {
        flex: ${first};
        margin-right: ${theme.spacings.level3};
      }
      & > *:last-child {
        flex: ${second};
      }
    `;
  }}

  ${({ $makeVerticalWhen, theme }) => {
    if ($makeVerticalWhen) {
      return `
        @media only screen and (max-width: ${$makeVerticalWhen / 16}em) {
          flex-direction: column;

          & > *:not(:last-child) {
            margin-right: 0;
            margin-bottom: ${theme.spacings.level3};
          }
        }
      `;
    }
    return ``;
  }}
`;

export default function SideBySide(props) {
  const { children } = props;
  return <SC.Wrapper {...props}>{children}</SC.Wrapper>;
}

SideBySide.defaultProps = {
  $makeVerticalWhen: undefined,
};

SideBySide.propTypes = {
  $proportion: PropTypes.string.isRequired,
  $makeVerticalWhen: PropTypes.number,
  children: PropTypes.node.isRequired,
};
