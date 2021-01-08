import React, { FC, useEffect, useRef, useState } from 'react';

import ColorPickerPanel from '../ColorPanel';
import InputRgba from '../../InputRgba';

import { getHexAlpha, hexAlphaToRgba, useDebounce } from '../../../utils';

import { IPropsComp, TPropsChange } from '../types';

const ColorPickerSolid: FC<IPropsComp> = ({
  value = '#ffffff',
  onChange = () => ({}),
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
      onChange && onChange(rgba);
    } else if (init === false) {
      const rgba = hexAlphaToRgba(color);
      onChange && onChange(rgba);
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
        showAlpha={showAlpha}
        onChange={setColor}
        onSubmitChange={onChange}
      />
    </div>
  );
};

export default ColorPickerSolid;
