import tinycolor from 'tinycolor2';

import { rgbaToArray, isValidRgba, validGradient } from '../../utils';

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

export const checkValidColorsArray = (
  arr: string[],
  type: 'solid' | 'grad'
) => {
  const uniqueArr = [...new Set(arr)];

  switch (type) {
    case 'solid':
      return uniqueArr.filter((color: string, index: number) => {
        const tinyColor = tinycolor(color);
        if (
          tinyColor.isValid() &&
          !color.trim().startsWith('radial-gradient') &&
          !color.trim().startsWith('linear-gradient')
        ) {
          return true;
        }

        if (index > 100) {
          return false;
        }

        return false;
      });
    case 'grad':
      return uniqueArr.filter((color: string, index: number) => {
        const validColor = validGradient(color);

        if (validColor === 'Failed to find gradient') {
          return false;
        }

        if (validColor === 'Not correct position') {
          console.warn(
            'Incorrect gradient default value. You need to indicate the location for the colors. We ignore this gradient value'
          );
          return false;
        }

        if (index > 100) {
          return false;
        }

        return true;
      });

    default:
      return [];
  }
};
