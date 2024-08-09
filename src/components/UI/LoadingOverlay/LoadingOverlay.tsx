import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import PlainText from '../PlainText';
import * as SC from './LoadingOverlay.sc';

export interface LoadingOverlayProps {
  alignLoader?: string;
  loaderSize?: 'big' | 'medium' | 'small';
  disableText?: boolean;
}

export default function LoadingOverlay({
  alignLoader = 'center',
  loaderSize = 'medium',
  disableText = false,
}: LoadingOverlayProps) {
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsInfoVisible(true);
    }, 8000);
    return () => clearTimeout(timeout);
  }, [setIsInfoVisible]);

  return (
    <SC.Wrapper $alignLoader={alignLoader} data-testid="LoadingOverlay">
      <Loader size={loaderSize} />
      {isInfoVisible && !disableText && (
        <PlainText $size="level2" $mgTop="level2" data-testid="LoadingOverlay-info">
          Just a second
        </PlainText>
      )}
    </SC.Wrapper>
  );
}
