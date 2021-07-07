/* eslint no-case-declarations: off */
import React, { FC, useEffect, useState } from 'react';

import {
  parseGradient,
  getHexAlpha,
  rgbaToArray,
  rgbaToHex
} from '../../../utils';
import { checkValidColorsArray } from '../../Colorpicker/helper';

import { IColor } from '../GradientPanel/types';
import { IActiveColor } from '../types';

interface IProps {
  defaultColors?: Array<string>;
  setColor: (color: any) => void;
  setInit: (init: boolean) => void;
  setActiveColor?: (color: IActiveColor) => void;
  colorType: 'solid' | 'gradient';
}

const DefaultColorPanel: FC<IProps> = ({
  defaultColors = [],
  setColor,
  setActiveColor,
  setInit,
  colorType
}) => {
  const [active, setActive] = useState<number>(-1);
  const [formatedDefColors, setFormatedDefColors] = useState<
    Array<string | IColor>
  >([]);

  useEffect(() => {
    if (colorType === 'gradient') {
      setFormatedDefColors(
        checkValidColorsArray(defaultColors, 'grad').map((item: string) => {
          return parseGradient(item);
        })
      );
    } else {
      setFormatedDefColors(checkValidColorsArray(defaultColors, 'solid'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChooseColor = (item: string | IColor, index: number) => {
    if (index === active) {
      return;
    }

    if (colorType === 'gradient' && typeof item !== 'string') {
      const { stops } = item;
      const lastStop = rgbaToArray(stops[stops.length - 1][0]);
      const lastStopLoc = stops[stops.length - 1][1];
      const activeStop = rgbaToHex([lastStop[0], lastStop[1], lastStop[2]]);
      const activeIdx = stops[stops.length - 1][2];

      setInit(false);

      setColor(item);
      setActiveColor &&
        setActiveColor({
          hex: activeStop,
          alpha: Number(Math.round(lastStop[3] * 100)),
          loc: lastStopLoc,
          index: activeIdx
        });
      setActive(index);
    } else if (colorType !== 'gradient' && typeof item === 'string') {
      setInit(false);
      setColor(getHexAlpha(item));
      setActive(index);
    }
  };

  if (!Array.isArray(defaultColors) || !defaultColors.length) {
    return null;
  }

  return (
    <div className='default-color-panel'>
      {formatedDefColors.map((item: string | IColor, index: number) => {
        switch (colorType) {
          case 'gradient':
            if (typeof item !== 'string') {
              const { gradient } = item;

              return (
                <div
                  onClick={() => onChooseColor(item, index)}
                  key={item.gradient + index}
                  className={`default-color-panel_item${
                    active === index ? ' default-color-panel_item-active' : ''
                  }`}
                  style={{
                    background: gradient
                  }}
                >
                  <div className='item_qub'></div>
                </div>
              );
            } else {
              return null;
            }

          case 'solid':
            if (typeof item === 'string') {
              return (
                <div
                  onClick={() => onChooseColor(item, index)}
                  key={item + index}
                  className={`default-color-panel_item${
                    active === index ? ' default-color-panel_item-active' : ''
                  }`}
                  style={{
                    background: item,
                    boxShadow: active === index ? `${item} 0px 0px 4px` : 'none'
                  }}
                >
                  <div className='item_qub'></div>
                </div>
              );
            } else {
              return null;
            }

          default:
            return null;
        }
      })}
    </div>
  );
};

export default DefaultColorPanel;
