import React, { FC, useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';
import './_input_rgba.scss';

import { checkFormat } from '../../utils';
import { getAlphaValue, inputsData, handlePressEnter } from './helpers';

interface IChange {
  hex: string;
  alpha: number;
}

type TProps = {
  hex: string;
  alpha: number;
  format?: 'rgb' | 'hsl' | 'hex';
  showAlpha?: boolean;
  onChange: ({ hex, alpha }: IChange) => void;
  onSubmitChange?: (rgba: string) => void;
};

const InputRgba: FC<TProps> = ({
  hex,
  alpha,
  format = 'rgb',
  showAlpha = true,
  onChange,
  onSubmitChange
}) => {
  const [color, setColor] = useState({
    alpha,
    hex
  });

  const onChangeAlpha = (alpha: string) => {
    const validAlpha = getAlphaValue(alpha);

    setColor({
      ...color,
      alpha: Number(validAlpha)
    });
  };

  const onChangeHex = (hex: string) => {
    setColor({
      ...color,
      hex
    });
  };

  const onHandleSubmit = () => {
    const rgba = tinycolor(color.hex[0] === '#' ? color.hex : '#' + color.hex);
    rgba.setAlpha(Number(color.alpha) / 100);

    if (rgba && (color.alpha !== alpha || color.hex !== hex)) {
      onChange({
        hex: color.hex[0] === '#' ? color.hex : '#' + color.hex,
        alpha: Number(color.alpha)
      });
      if (onSubmitChange) {
        onSubmitChange(
          checkFormat(rgba.toRgbString(), format, showAlpha, color.alpha)
        );
      }
    } else {
      setColor({
        hex,
        alpha
      });
      onChange({
        hex,
        alpha
      });
    }
  };

  useEffect(() => {
    setColor({
      hex,
      alpha
    });
  }, [hex, alpha]);

  const inputsProps = {
    alphaValue: color.alpha,
    hexValue: color.hex.replace(/#/i, ''),
    onChangeAlpha,
    onChangeHex,
    showAlpha
  };

  return (
    <div className='input_rgba'>
      <div className='input_rgba-wrap'>
        {inputsData(inputsProps).map((item, index) => {
          const {
            wrapClass,
            labelSymbol,
            idInput,
            valueInput,
            labelText,
            labelArea,
            labelClass,
            onChangeInput,
            name
          } = item;
          return (
            <div className={wrapClass} key={index}>
              {labelSymbol && (
                <label htmlFor='rgba-hex' className='input_rgba-hex-label'>
                  #
                </label>
              )}
              {name === 'alpha' && (
                <label htmlFor={idInput} className='input_rgba-alpha-label'>
                  %
                </label>
              )}
              <input
                type='text'
                id={idInput}
                value={valueInput}
                aria-label={labelArea}
                onChange={(e) => onChangeInput(e)}
                onBlur={onHandleSubmit}
                onKeyPress={(e) => handlePressEnter(e, onHandleSubmit)}
              />
              <div className={labelClass}>{labelText}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputRgba;
