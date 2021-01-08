import { KeyboardEvent, ChangeEvent } from 'react';

interface IInput {
  alphaValue: number;
  hexValue: string;
  showAlpha?: boolean;
  onChangeAlpha: (value: string) => void;
  onChangeHex: (value: string) => void;
}

export const getAlphaValue = (value: string) => {
  value.replace(/%/i, '');
  if (value[0] === '0' && value.length > 1) {
    return value.substr(1);
  } else if (Number(value) >= 100) {
    return 100;
  } else if (!isNaN(Number(value))) {
    return value || 0;
  }
  return parseInt(value);
};

export const onlyDigits = (string: string) => {
  return string ? string.substr(0, 3).replace(/[^\d]/g, '') : '';
};

export const onlyLatins = (string: string) => {
  if (string && string.substring(0, 1) === '#') string = string.substring(1);
  return string ? string.substr(0, 6).replace(/[^a-zA-Z0-9\s-]/gi, '') : '';
};

export const handlePressEnter = (e: KeyboardEvent, fn: () => void) => {
  if (e.key === 'Enter') {
    fn();
  }
};

export const inputsData = (props: IInput) => {
  const inputHex = {
    wrapClass: 'input_rgba-hex',
    labelSymbol: true,
    idInput: `rgba-hex${Math.random() * 10000}`,
    valueInput: props.hexValue,
    labelText: 'Hex',
    labelArea: 'hex',
    labelClass: 'input_rgba-label',
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) =>
      props.onChangeHex(onlyLatins(e.target.value)),
    name: 'hex'
  };

  const inputAlpha = {
    wrapClass: 'input_rgba-alpha',
    labelSymbol: false,
    idInput: `rgba-alpha${Math.random() * 10000}`,
    valueInput: props.alphaValue,
    labelText: 'Alpha',
    labelArea: 'alpha',
    labelClass: 'input_rgba-label',
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) =>
      props.onChangeAlpha(onlyDigits(e.target.value)),
    name: 'alpha'
  };

  if (props.showAlpha === false) {
    return [inputHex];
  }

  return [inputHex, inputAlpha];
};
