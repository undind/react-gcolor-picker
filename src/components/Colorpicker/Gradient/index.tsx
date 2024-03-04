import React, { FC, useEffect, useState, useCallback } from 'react';
import tinyColor from 'tinycolor2';

import ColorPanel from '../ColorPanel';
import InputRgba from '../../InputRgba';
import GradientPanel from '../GradientPanel';
import DefaultColorsPanel from '../DefaultColorPanel';

import {
  parseGradient,
  useDebounce,
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
  showInputs = true,
  showGradientResult = true,
  showGradientStops = true,
  showGradientMode = true,
  showGradientAngle = true,
  showGradientPosition = true,
  allowAddGradientStops = true,
  colorBoardHeight = 120,
  defaultColors
}) => {
  const parsedColors = useCallback(() => {
    return parseGradient(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const initColor = parsedColors();
  const { stops } = initColor;

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

  const [color, setColor] = useState(initColor);
  const debounceColor = useDebounce(color, debounceMS);

  useEffect(() => {
    if (debounce && debounceColor && init === false) {
      if (debounceColor.gradient === initColor.gradient) {
        return;
      }

      onChange && onChange(debounceColor.gradient);
    } else if (init === false) {
      if (debounceColor.gradient === initColor.gradient) {
        return;
      }

      onChange && onChange(debounceColor.gradient);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceColor]);

  // Issue https://github.com/undind/react-gcolor-picker/issues/6
  useEffect(() => {
    setColor(initColor);

    const findActive = initColor.stops.find(
      (stop: any) => stop[2] === activeColor.index
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

  const onChangeActiveColor = useCallback(
    (value: TPropsChange) => {
      setInit(false);
      setActiveColor({
        ...activeColor,
        hex: value.hex,
        alpha: Number(Math.round(value.alpha))
      });

      const { stops, type, modifier } = color;
      const rgba = tinyColor(value.hex);
      rgba.setAlpha(value.alpha / 100);

      const newStops = stops.map((item: any) => {
        if (item[1] === activeColor.loc) {
          return [rgba.toRgbString(), item[1], item[2]];
        }
        return item;
      });
      setColor({
        ...color,
        gradient: `${getGradient(type, newStops, modifier, format, showAlpha)}`,
        stops: newStops
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeColor, color]
  );

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
      {showInputs && (
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
      )}
      <GradientPanel
        color={color}
        setColor={setColor}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        setInit={setInit}
        format={format}
        showAlpha={showAlpha}
        showGradientResult={showGradientResult}
        showGradientStops={showGradientStops}
        showGradientMode={showGradientMode}
        showGradientAngle={showGradientAngle}
        showGradientPosition={showGradientPosition}
        allowAddGradientStops={allowAddGradientStops}
      />
      <DefaultColorsPanel
        defaultColors={defaultColors}
        setColor={setColor}
        setActiveColor={setActiveColor}
        setInit={setInit}
        colorType='gradient'
      />
    </div>
  );
};

export default Gradient;
