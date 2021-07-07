import './_colorpicker.scss';
import React, { Fragment, useState, FC } from 'react';

import Gradinet from './Gradient';
import Solid from './Solid';

import {
  PopupTabs,
  PopupTabsBody,
  PopupTabsHeader,
  PopupTabsHeaderLabel,
  PopupTabsBodyItem
} from '../PopupTab';
import { getIndexActiveTag } from './helper';

import { IPropsMain } from './types';

const defaultColorsConst = [
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
  '#9900EF',
  'linear-gradient(0deg, rgb(255, 177, 153) 0%, rgb(255, 8, 68) 100%)',
  'linear-gradient(270deg, rgb(251, 171, 126) 8.00%, rgb(247, 206, 104) 92.00%)',
  'linear-gradient(315deg, rgb(150, 230, 161) 8.00%, rgb(212, 252, 121) 92.00%)',
  'linear-gradient(to left, rgb(249, 240, 71) 0%, rgb(15, 216, 80) 100%)',
  'linear-gradient(315deg, rgb(194, 233, 251) 8.00%, rgb(161, 196, 253) 92.00%)',
  'linear-gradient(0deg, rgb(0, 198, 251) 0%, rgb(0, 91, 234) 100%)',
  'linear-gradient(0deg, rgb(167, 166, 203) 0%, rgb(137, 137, 186) 51.00%, rgb(137, 137, 186) 100%)',
  'linear-gradient(0deg, rgb(80, 82, 133) 0%, rgb(88, 94, 146) 15.0%, rgb(101, 104, 159) 28.00%, rgb(116, 116, 176) 43.00%, rgb(126, 126, 187) 57.00%, rgb(131, 137, 199) 71.00%, rgb(151, 149, 212) 82.00%, rgb(162, 161, 220) 92.00%, rgb(181, 174, 228) 100%)',
  'linear-gradient(270deg, rgb(255, 126, 179) 0%, rgb(255, 117, 140) 100%)',
  'linear-gradient(90deg, rgb(120, 115, 245) 0%, rgb(236, 119, 171) 100%)',
  'linear-gradient(45deg, #2e266f 0.00%, #9664dd38 100.00%)',
  'radial-gradient(circle at center, yellow 0%, #009966 50%, purple 100%)'
];

const ColorPicker: FC<IPropsMain> = ({
  value = '#ffffff',
  format = 'rgb',
  gradient = false,
  solid = true,
  debounceMS = 300,
  debounce = true,
  showAlpha = true,
  popupWidth = 267,
  colorBoardHeight = 120,
  defaultColors = defaultColorsConst,
  onChange = () => ({})
}) => {
  const [activeTab, setActiveTab] = useState(getIndexActiveTag(value));

  const onChangeSolid = (value: string) => {
    onChange(value);
  };

  const onChangeGradient = (value: string) => {
    onChange(value);
  };

  if (solid && gradient) {
    return (
      <PopupTabs activeTab={activeTab} popupWidth={popupWidth}>
        <PopupTabsHeader>
          <PopupTabsHeaderLabel tabID={0} onClick={() => setActiveTab(0)}>
            Solid
          </PopupTabsHeaderLabel>
          <PopupTabsHeaderLabel tabID={1} onClick={() => setActiveTab(1)}>
            Gradient
          </PopupTabsHeaderLabel>
        </PopupTabsHeader>
        <PopupTabsBody>
          <PopupTabsBodyItem tabID={0}>
            <Solid
              onChange={onChangeSolid}
              value={value}
              format={format}
              defaultColors={defaultColors}
              debounceMS={debounceMS}
              debounce={debounce}
              showAlpha={showAlpha}
              colorBoardHeight={colorBoardHeight}
            />
          </PopupTabsBodyItem>
          <PopupTabsBodyItem tabID={1}>
            <Gradinet
              onChange={onChangeGradient}
              value={value}
              format={format}
              defaultColors={defaultColors}
              debounceMS={debounceMS}
              debounce={debounce}
              showAlpha={showAlpha}
              colorBoardHeight={colorBoardHeight}
            />
          </PopupTabsBodyItem>
        </PopupTabsBody>
      </PopupTabs>
    );
  }

  return (
    <>
      {solid || gradient ? (
        <PopupTabs popupWidth={popupWidth}>
          <PopupTabsBody>
            {solid ? (
              <Solid
                onChange={onChangeSolid}
                value={value}
                format={format}
                defaultColors={defaultColors}
                debounceMS={debounceMS}
                debounce={debounce}
                showAlpha={showAlpha}
                colorBoardHeight={colorBoardHeight}
              />
            ) : (
              <Fragment />
            )}
            {gradient ? (
              <Gradinet
                onChange={onChangeGradient}
                value={value}
                format={format}
                defaultColors={defaultColors}
                debounceMS={debounceMS}
                debounce={debounce}
                showAlpha={showAlpha}
                colorBoardHeight={colorBoardHeight}
              />
            ) : (
              <Fragment />
            )}
          </PopupTabsBody>
        </PopupTabs>
      ) : null}
    </>
  );
};

export default ColorPicker;
