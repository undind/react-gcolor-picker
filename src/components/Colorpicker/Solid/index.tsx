import React, { FC, useEffect, useRef, useState } from 'react';

import ColorPickerPanel from '../ColorPanel';
import InputRgba from '../../InputRgba';
import DefaultColorsPanel from '../DefaultColorPanel';

import {
  getHexAlpha,
  hexAlphaToRgba,
  useDebounce,
  checkFormat
} from '../../../utils';

import { IPropsComp, TPropsChange } from '../types';

const ColorPickerSolid: FC<IPropsComp> = ({
  value = '#ffffff',
  onChange = () => ({}),
  format = 'rgb',
  debounceMS = 300,
  debounce = true,
  showAlpha = true,
  colorBoardHeight = 120
}) => {
  const node = useRef<HTMLDivElement | null>(null);

  const [init, setInit] = useState(true);
  const [color, setColor] = useState(getHexAlpha(value));
  useEffect(() => {
    setColor(getHexAlpha(value));
  }, [value]);

  const debounceColor = useDebounce(color, debounceMS);
  useEffect(() => {
    if (debounce && debounceColor && init === false) {
      const rgba = hexAlphaToRgba(color);
      console.log(rgba, color, checkFormat(rgba, format, showAlpha, debounceColor.alpha))
      onChange(checkFormat(rgba, format, showAlpha, debounceColor.alpha));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceColor]);

  const onCompleteChange = (value: TPropsChange) => {
    setInit(false);
    setColor({
      hex: value.hex,
      alpha: Math.round(value.alpha)
    });
  };

  return (
    <div ref={node} className='colorpicker'>
      <ColorPickerPanel
        hex={color.hex}
        alpha={color.alpha}
        colorBoardHeight={colorBoardHeight}
        showAlpha={showAlpha}
        onChange={onCompleteChange}
      />
      <InputRgba
        hex={color.hex}
        alpha={color.alpha}
        format={format}
        showAlpha={showAlpha}
        onChange={setColor}
        onSubmitChange={onChange}
      />
      <DefaultColorsPanel
        defaultColors={[
          '#FF6900',
          '#FCB900',
          '#7BDCB5',
          '#00D084',
          '#8ED1FC',
          '#0693E3',
          '#ABB8C3',
          '#607d8b',
          '#EB144C',
          '#F78DA7',
          '#ba68c8',
          'linear-gradient(270deg, rgb(116, 235, 213) 0%, rgb(159, 172, 230) 100%)'
        ]}
        setColor={setColor}
        setInit={setInit}
        value={value}
      />
    </div>
  );
};

export default ColorPickerSolid;
