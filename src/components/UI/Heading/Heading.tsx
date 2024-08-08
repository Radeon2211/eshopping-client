import React from 'react';
import * as SC from './Heading.sc';
import { PropsWithChildren } from '../../../shared/types/types';
import { ThemeLineHeight, ThemeSpacing } from '../../../styled/theme';

export interface HeadingProps {
  $variant: string;
  $align?: string;
  $mgBottom?: ThemeSpacing;
  $mgTop?: ThemeSpacing;
  $lineHeight?: ThemeLineHeight;
  $fontSize?: string;
  className?: string;
}

const Heading = React.memo((props: PropsWithChildren<HeadingProps>) => {
  return (
    <SC.Heading {...props} $align={props.$align || 'left'}>
      {props.children}
    </SC.Heading>
  );
});

export default Heading;

Heading.displayName = 'Heading';
