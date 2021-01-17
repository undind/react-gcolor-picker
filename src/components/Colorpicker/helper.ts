import tinycolor from 'tinycolor2';
import { rgbaToArray, isValidRgba } from '../../utils';

export const getIndexActiveTag = (value: string) => {
  let tab = 0;
  const validValue = tinycolor(value).isValid();

  if (value) {
    if (value === 'transparent') {
      tab = 0;
      return tab;
    }
    if (
      validValue &&
      !value.trim().startsWith('radial-gradient') &&
      !value.trim().startsWith('linear-gradient')
    ) {
      tab = 0;
      return tab;
    }
    const rgba = rgbaToArray(value);
    if (rgba) {
      if (isValidRgba([rgba[0], rgba[1], rgba[2]])) {
        tab = 0;
        return tab;
      }
    } else {
      tab = 1;
      return tab;
    }
  }

  return tab;
};
