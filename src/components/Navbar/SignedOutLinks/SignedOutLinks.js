import React from 'react';
import styled from 'styled-components';
import Button from '../../UI/Button/Button';

const SC = {};
SC.Wrapper = styled.nav`
  display: flex;

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacings.level3};
  }
`;

const SignedOutLinks = () => {
  return (
    <SC.Wrapper>
      <Button>login</Button>
      <Button filled>signup</Button>
    </SC.Wrapper>
  );
};

export default SignedOutLinks;
