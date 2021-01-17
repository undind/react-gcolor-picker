import React, { FC, useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';

import { getHexAlpha } from '../../../utils';

const getValue = (value: string) => {
  const defaultObject = {
    hex: '#ffffff',
    alpha: 100
  };
  const tinyColor = tinycolor(value);

  if (value) {
    if (
      tinyColor.isValid() &&
      !value.trim().startsWith('radial-gradient') &&
      !value.trim().startsWith('linear-gradient')
    ) {
      defaultObject.hex = tinyColor.toHexString();
      defaultObject.alpha = Math.round(tinyColor.getAlpha() * 100);
    } else {
      console.log(11)
      defaultObject.hex = value;
    }
  }

  return defaultObject;
};

interface IProps {
  defaultColors: string[];
  setColor: any;
  setInit: any;
  value: string;
}

const DefaultColorPanel: FC<IProps> = ({
  defaultColors,
  setColor,
  setInit,
  value
}) => {
  const [active, setActive] = useState('');

  const onChooseColor = (item: string) => {
    console.log(getValue(item), item);
    setInit(false);
    setColor(getValue(item));
    setActive(item);
  };

  useEffect(() => {
    if (
      value.toLocaleLowerCase().trim() !== active.toLocaleLowerCase().trim()
    ) {
      setActive('');
    }
  }, [value]);

  return (
    <div className='default-color-panel'>
      {defaultColors.map((item, index) => {
        return (
          <div
            onClick={() => onChooseColor(item)}
            key={item + index}
            className={`default-color-panel_item${
              active === item ? ' default-color-panel_item-active' : ''
            }`}
            style={{
              background: item,
              boxShadow: active === item ? `${item} 0px 0px 4px` : 'none'
            }}
          >
            <div className='item_qub'></div>
          </div>
        );
      })}
    </div>
  );
};

export default DefaultColorPanel;
