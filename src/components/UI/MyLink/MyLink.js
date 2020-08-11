import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SC = {};
SC.MyLink = styled.span`
  font-size: 1.6rem;
  text-transform: ${({ size }) => (size === 'big' ? 'uppercase' : 'lowercase')};

  & .router-link:link,
  & .router-link:visited,
  & .router-link:active,
  & .router-link:focus {
    color: ${({ theme }) => theme.colors.green};
    text-decoration: none;
  }
`;

const Link = (props) => {
  const { to, size, children } = props;
  return (
    <SC.MyLink size={size}>
      <RouterLink className="router-link" to={to}>
        {children}
      </RouterLink>
    </SC.MyLink>
  );
};

Link.defaultProps = {
  size: 'small',
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Link;
