import * as SC from './Button.sc';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import { PropsWithChildren } from '../../../shared/types/types';

export interface ButtonProps {
  $size?: 'small' | 'big';
  type?: 'submit' | 'reset' | 'button';
  $color?: 'blue' | 'red';
  $filled?: boolean;
  $stretch?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  clicked?: () => void;
}

export default function Button(props: PropsWithChildren<ButtonProps>) {
  const {
    clicked = () => {},
    isLoading = false,
    disabled = false,
    type = 'button',
    $size = 'small',
    $color = 'blue',
    $stretch = false,
    $filled = false,
    children,
    ...rest
  } = props;

  const loadingOverlay = isLoading ? <LoadingOverlay loaderSize="small" disableText /> : null;

  return (
    <SC.Button
      onClick={clicked}
      disabled={disabled || isLoading}
      type={type}
      $size={$size}
      $color={$color}
      $stretch={$stretch}
      $filled={$filled}
      {...rest}
    >
      {children}
      {loadingOverlay}
    </SC.Button>
  );
}
