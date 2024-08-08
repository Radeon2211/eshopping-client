import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import PlainPanel from './PlainPanel';
import { PropsWithChildren } from '../../../shared/types/types';

const Wrapper = styled.section`
  position: sticky;
  top: calc(6.4rem + ${({ theme }) => theme.spacings.level3});
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

export default function StickyPanel({ children }: PropsWithChildren) {
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    <Wrapper ref={wrapperRef}>
      <PlainPanel>{children}</PlainPanel>
    </Wrapper>
  );
}
