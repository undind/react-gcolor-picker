import './_picker.scss';
import React, { useState, useEffect, FC } from 'react';

import ReactGPickerComp from '../src/components/Colorpicker';
import { IPropsMain } from '../src/components/Colorpicker/types';

const ReactGPicker: FC<IPropsMain> = ({
  value,
  format,
  gradient,
  solid,
  debounceMS,
  debounce,
  showAlpha,
  popupWidth,
  colorBoardHeight,
  defaultColors,
  onChange
}) => {
  const [color, setColor] = useState(value);
  const onChangeColor = (value: string) => setColor(value);

  useEffect(() => {
    setColor(value);
  }, [value]);

  return (
    <div className='wrapper' style={{ background: color }}>
      <span
        role='textbox'
        aria-multiline='true'
        className='color-text'
      >
        {color}
      </span>
      <div className='centered'>
        <ReactGPickerComp
          value={color}
          gradient={gradient}
          format={format}
          solid={solid}
          debounceMS={debounceMS}
          debounce={debounce}
          showAlpha={showAlpha}
          popupWidth={popupWidth}
          colorBoardHeight={colorBoardHeight}
          defaultColors={defaultColors}
          onChange={(value) => {
            onChangeColor(value);
            onChange(value);
          }}
        />
      </div>
    </div>
  );
};

export default ReactGPicker;
