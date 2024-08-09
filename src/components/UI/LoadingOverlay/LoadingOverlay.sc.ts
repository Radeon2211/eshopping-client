import styled from 'styled-components';
import { LoadingOverlayProps } from './LoadingOverlay';

export const Wrapper = styled.div<{ $alignLoader: LoadingOverlayProps['alignLoader'] }>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light1Transparent};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  justify-items: ${({ $alignLoader }) => $alignLoader};
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level1};
`;
