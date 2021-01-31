/* eslint no-case-declarations: off */
import React, { FC, useEffect, useState } from 'react';

import {
  checkFormat,
  getGradient,
  getHexAlpha,
  parseGradient,
  rgbaToArray,
  rgbaToHex
} from '../../../utils';

import { IActiveColor } from '../types';

interface IProps {
  defaultColors?: Array<string>;
  setColor: (color: any) => void;
  setInit: (init: boolean) => void;
  setActiveColor?: (color: IActiveColor) => void;
  value: string;
  colorType?: string;
  format: 'rgb' | 'hsl' | 'hex';
  showAlpha: boolean;
}

const DefaultColorPanel: FC<IProps> = ({
  defaultColors = [],
  setColor,
  setActiveColor,
  setInit,
  showAlpha,
  format,
  value,
  colorType
}) => {
  const [active, setActive] = useState<string>('');

  const onChooseColor = (item: string) => {
    if (item === active) {
      return;
    }

    const { stops, modifier, type } = parseGradient(item);
    const lastStop = rgbaToArray(stops[stops.length - 1][0]);
    const lastStopLoc = stops[stops.length - 1][1];
    const activeStop = rgbaToHex([lastStop[0], lastStop[1], lastStop[2]]);
    const activeIdx = stops[stops.length - 1][2];

    const gradientWithFormat = getGradient(
      type,
      stops,
      modifier,
      format,
      showAlpha
    );

    switch (colorType) {
      case 'gradient':
        setInit(false);

        setColor({
          ...parseGradient(item),
          gradient: `${gradientWithFormat}`
        });
        setActiveColor &&
          setActiveColor({
            hex: activeStop,
            alpha: Number(Math.round(lastStop[3] * 100)),
            loc: lastStopLoc,
            index: activeIdx
          });
        setActive(gradientWithFormat);
        break;

      default:
        setInit(false);
        setColor(getHexAlpha(item));
        setActive(checkFormat(item, format, showAlpha));
        break;
    }
  };

  useEffect(() => {
    if (value.toLowerCase().trim() === active.toLowerCase().trim()) {
      setActive(active);
    } else {
      setActive('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!defaultColors.length) {
    return null;
  }

  return (
    <div className='default-color-panel'>
      {defaultColors.map((item: string, index: number) => {
        switch (colorType) {
          case 'gradient':
            const { stops, modifier, type } = parseGradient(item);
            const gradientWithFormat = getGradient(
              type,
              stops,
              modifier,
              format,
              showAlpha
            );
            return (
              <div
                onClick={() => onChooseColor(item)}
                key={item + index}
                className={`default-color-panel_item${
                  active === gradientWithFormat
                    ? ' default-color-panel_item-active'
                    : ''
                }`}
                style={{
                  background: item
                }}
              >
                <div className='item_qub'></div>
              </div>
            );

          default:
            const colorWithFormat = checkFormat(item, format, showAlpha);
            return (
              <div
                onClick={() => onChooseColor(item)}
                key={item + index}
                className={`default-color-panel_item${
                  active === colorWithFormat
                    ? ' default-color-panel_item-active'
                    : ''
                }`}
                style={{
                  background: item,
                  boxShadow:
                    active === colorWithFormat ? `${item} 0px 0px 4px` : 'none'
                }}
              >
                <div className='item_qub'></div>
              </div>
            );
        }
      })}
    </div>
  );
};

export default DefaultColorPanel;
