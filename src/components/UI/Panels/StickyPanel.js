import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlainPanel from './PlainPanel';

const SC = {};
SC.Wrapper = styled.section`
  position: sticky;
  top: calc(6.5rem + ${({ theme }) => theme.spacings.level3});
  width: 100%;

  & > *:first-child {
    transition: padding ${({ theme }) => theme.durations.level2}s;
  }

  &.is-sticky {
    border-top: 1px solid ${({ theme }) => theme.colors.light3};
  }

  @media only screen and (max-width: 75em) {
    bottom: -1px;
    padding-bottom: 1px;

    & > *:first-child {
      padding: ${({ theme }) => theme.spacings.level2};
      transition: width ${({ theme }) => theme.durations.level2}s;
    }
  }
`;

const Panel = (props) => {
  const { children } = props;

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const observer = new IntersectionObserver(
        ([e]) => e.target.classList.toggle('is-sticky', e.intersectionRatio < 1),
        { threshold: [1] },
      );
      observer.observe(wrapperRef.current);
    }
  }, []);

  return (
    <SC.Wrapper ref={wrapperRef}>
      <PlainPanel>{children}</PlainPanel>
    </SC.Wrapper>
  );
};

Panel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Panel;
