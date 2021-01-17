import { isValidHex } from '../utils';
import hexToRgba from './hexToRgba';

interface IPicker {
  hex: string;
  alpha: number;
}

export default (picker: IPicker) => {
  if (picker) {
    if (isValidHex(`${picker.hex}`)) {
      console.log(picker.hex)
      const rgba = hexToRgba(picker.hex, picker.alpha);

      if (rgba) {
        return rgba;
      }
    } else if (
      picker.hex.trim().startsWith('radial-gradient') ||
      picker.hex.trim().startsWith('linear-gradient')
    ) {
      return picker.hex;
    }
  }

  return '';
};
