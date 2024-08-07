import PropTypes from 'prop-types';
import styled from 'styled-components';
import React from 'react';
import FlexWrapper from '../FlexWrapper';
import Heading from '../Heading/Heading';

const Wrapper = styled.div`
  padding: 0 ${({ theme }) => theme.spacings.level2};

  & svg {
    max-width: 100%;
    width: 60rem;
  }
`;

export interface ErrorPageProps {
  icon: React.ReactNode;
  info?: string;
}

export default function ErrorPage({ info, icon }: ErrorPageProps) {
  return (
    <Wrapper>
      <FlexWrapper $align="center" $direction="column" $spacing="3" $mgTop="3">
        {info && (
          <Heading $variant="h3" $align="center" $lineHeight="4">
            {info}
          </Heading>
        )}
        {icon}
      </FlexWrapper>
    </Wrapper>
  );
}

ErrorPage.defaultProps = {
  info: '',
};

ErrorPage.propTypes = {
  info: PropTypes.string,
  icon: PropTypes.node.isRequired,
};
