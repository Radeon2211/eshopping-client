import theme from '../styled/theme';

export const stepFormVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: theme.durations.level1, delay: theme.durations.level1 },
  },
};

export const backdropVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    pointerEvents: 'initial',
    transition: { duration: theme.durations.level3 },
  },
};

export const modalVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    transition: { delay: theme.durations.level2 },
    pointerEvents: 'initial',
  },
};

export const messageBoxVariants = {
  hidden: {
    pointerEvents: 'none',
    y: '-150%',
  },
  visible: {
    transition: { type: 'spring', duration: theme.durations.level2, stiffness: 100 },
    pointerEvents: 'initial',
    y: 0,
  },
};

export const dropdownVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
    y: '-10%',
  },
  visible: {
    opacity: 1,
    pointerEvents: 'initial',
    y: '0',
  },
};
