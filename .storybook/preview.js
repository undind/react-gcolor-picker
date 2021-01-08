import theme from './theme';

export const parameters = {
  options: {
    storySort: (a, b) => {
      const aName = a[0];
      const bName = b[0];

      return aName < bName ? 1 : -1;
    }
  },
  docs: {
    theme
  },
  controls: { expanded: true }
};
