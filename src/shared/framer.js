export const stepFormVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.12, delay: 0.12 },
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
    transition: { duration: 0.25 },
  },
};

export const modalVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.2 },
    pointerEvents: 'initial',
  },
};

export const messageBoxVariants = {
  hidden: {
    pointerEvents: 'none',
    y: '-150%',
  },
  visible: {
    transition: { type: 'spring', duration: 0.2, stiffness: 100 },
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
    transition: 'all 0.2s',
  },
};
