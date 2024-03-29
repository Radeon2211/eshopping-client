import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Main = styled.main`
  margin: 0 auto;
  max-width: 120rem;
  min-height: 100vh;
  padding: 8.7rem ${({ theme }) => theme.spacings.level2} ${({ theme }) => theme.spacings.level3};

  @media only screen and (max-width: 37.5em) {
    padding-top: 13.6rem;
  }
`;

export default function Main(props) {
  const { children } = props;
  return <SC.Main {...props}>{children}</SC.Main>;
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
