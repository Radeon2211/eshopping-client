import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light1};
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level4};
  width: 100%;
`;