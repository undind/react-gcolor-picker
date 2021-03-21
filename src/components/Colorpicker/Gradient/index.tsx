import React, { FC, useEffect, useState } from 'react';
import tinyColor from 'tinycolor2';

import ColorPanel from '../ColorPanel';
import InputRgba from '../../InputRgba';
import GradientPanel from '../GradientPanel';
import DefaultColorsPanel from '../DefaultColorPanel';

import {
  parseGradient,
  useDebounce,
  hexAlphaToRgba,
  getGradient,
  rgbaToArray,
  rgbaToHex
} from '../../../utils';

import { IPropsComp, TPropsChange, IActiveColor } from '../types';

const Gradient: FC<IPropsComp> = ({
  value = '#ffffff',
  onChange = () => ({}),
  format = 'rgb',
  debounceMS = 300,
  debounce = true,
  showAlpha = true,
  colorBoardHeight = 120,
  defaultColors
}) => {
  const { stops } = parseGradient(value);

  const lastStop = rgbaToArray(stops[stops.length - 1][0]);
  const lastStopLoc = stops[stops.length - 1][1];
  const activeStop = rgbaToHex([lastStop[0], lastStop[1], lastStop[2]]);
  const activeIdx = stops[stops.length - 1][2];

  const [init, setInit] = useState(true);
  const [activeColor, setActiveColor] = useState<IActiveColor>({
    hex: activeStop,
    alpha: Number(Math.round(lastStop[3] * 100)),
    loc: lastStopLoc,
    index: activeIdx
  });

  const [color, setColor] = useState(parseGradient(value));
  const debounceColor = useDebounce(color, debounceMS);

  useEffect(() => {
    if (debounce && debounceColor && init === false) {
      if (debounceColor.gradient === parseGradient(value).gradient) {
        return;
      }

      onChange && onChange(debounceColor.gradient);
    } else if (init === false) {
      if (debounceColor.gradient === parseGradient(value).gradient) {
        return;
      }

      onChange && onChange(debounceColor.gradient);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceColor]);

  // Issue https://github.com/undind/react-gcolor-picker/issues/6
  useEffect(() => {
    const parseValue = parseGradient(value);
    setColor(parseValue);

    const findActive = parseValue.stops.find(
      (stop) => stop[2] === activeColor.index
    );

    // Update active color
    if (findActive) {
      const tinycolor = tinyColor(String(findActive[0]));
      if ('#' + tinycolor.toHex() !== activeColor.hex) {
        setActiveColor({
          ...activeColor,
          hex: '#' + tinycolor.toHex(),
          alpha: tinycolor.getAlpha() * 100
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onChangeActiveColor = (value: TPropsChange) => {
    setInit(false);
    setActiveColor({
      ...activeColor,
      hex: value.hex,
      alpha: Number(Math.round(value.alpha))
    });

    const { stops, type, modifier } = color;
    const rgba = hexAlphaToRgba(value);
    const newStops = stops.map((item: any) => {
      if (item[1] === activeColor.loc) {
        return [rgba, item[1], item[2]];
      }
      return item;
    });
    setColor({
      ...color,
      gradient: `${getGradient(type, newStops, modifier, format, showAlpha)}`,
      stops: newStops
    });
  };

  const onSubmitChange = (rgba: string) => {
    const rgbaArr = rgbaToArray(rgba);
    const hex = rgbaToHex([rgbaArr[0], rgbaArr[1], rgbaArr[2]]);
    onChangeActiveColor({ hex, alpha: rgbaArr[3] * 100 });
  };

  return (
    <div className='colorpicker'>
      <ColorPanel
        hex={activeColor.hex}
        alpha={activeColor.alpha}
        showAlpha={showAlpha}
        onChange={onChangeActiveColor}
        colorBoardHeight={colorBoardHeight}
      />
      <InputRgba
        hex={activeColor.hex}
        alpha={activeColor.alpha}
        showAlpha={showAlpha}
        onChange={(value) =>
          setActiveColor((prev) => ({
            ...prev,
            hex: value.hex,
            alpha: value.alpha
          }))
        }
        onSubmitChange={onSubmitChange}
      />
      <GradientPanel
        color={color}
        setColor={setColor}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        setInit={setInit}
        format={format}
        showAlpha={showAlpha}
      />
      <DefaultColorsPanel
        defaultColors={defaultColors}
        setColor={setColor}
        setActiveColor={setActiveColor}
        setInit={setInit}
        value={value}
        showAlpha={showAlpha}
        format={format}
        colorType='gradient'
      />
    </div>
  );
};

export default Gradient;
