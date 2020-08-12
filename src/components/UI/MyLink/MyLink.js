import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SC = {};
SC.MyLink = styled(Link)`
  text-decoration: none;
  font-size: 1.6rem;
  text-transform: ${({ size }) => (size === 'big' ? 'uppercase' : 'lowercase')};

  &:link,
  &:hover,
  &:visited,
  &:active,
  &:focus {
    color: ${({ theme }) => theme.colors.green};
  }
`;

const MyLink = (props) => {
  const { children } = props;
  return <SC.MyLink {...props}>{children}</SC.MyLink>;
};

MyLink.defaultProps = {
  size: 'small',
};

MyLink.propTypes = {
  to: PropTypes.string.isRequired,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Link;
