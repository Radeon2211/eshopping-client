import * as SC from './Loader.sc';

export interface LoaderProps {
  size?: 'big' | 'medium' | 'small';
  align?: string;
}

export default function Loader({ size = 'medium', align }: LoaderProps) {
  const loader = (
    <SC.Loader $size={size} data-testid="Loader">
      <div />
      <div />
      <div />
      <div />
    </SC.Loader>
  );

  let wrapper = null;
  if (align) {
    wrapper = (
      <SC.Wrapper $align={align} data-testid="LoaderWrapper">
        {loader}
      </SC.Wrapper>
    );
  } else {
    wrapper = loader;
  }

  return wrapper;
}
