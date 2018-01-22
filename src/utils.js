// eslint-disable-next-line import/prefer-default-export
export const canUseDOM = !!(
  /* eslint-disable no-undef */
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
