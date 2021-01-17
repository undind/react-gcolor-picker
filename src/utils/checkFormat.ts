import tinycolor from 'tinycolor2';

export default (
  color: string,
  format: string,
  showAlpha: boolean,
  stateColorAlpha?: number
) => {
  const tinyColor = tinycolor(color);
  let value: string;
  let alphaValue = stateColorAlpha
    ? stateColorAlpha
    : tinyColor.getAlpha() * 100;

  switch (format) {
    case 'rgb':
      value = color;
      break;
    case 'hsl':
      value = tinyColor.toHslString();
      break;
    case 'hex':
      if (showAlpha && alphaValue !== 100) {
        value = tinyColor.toHex8String();
      } else {
        value = tinyColor.toHexString();
      }
      break;

    default:
      value = '';
      break;
  }

  return value;
};