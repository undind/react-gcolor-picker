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

import { DEFAULT_COLORS } from './constants';

const ColorPicker: FC<IPropsMain> = ({
  value = '#ffffff',
  format = 'rgb',
  gradient = false,
  solid = true,
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
  popupWidth = 267,
  colorBoardHeight = 120,
  defaultColors = DEFAULT_COLORS,
  defaultActiveTab,
  onChangeTabs,
  onChange = () => ({})
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab || getIndexActiveTag(value)
  );

  const onChangeSolid = (value: string) => {
    onChange(value);
  };

  const onChangeGradient = (value: string) => {
    onChange(value);
  };

  const onChangeTab = (tab: string) => {
    setActiveTab(tab);
    if (typeof onChangeTabs === 'function' && !!onChangeTabs) {
      onChangeTabs(tab);
    }
  };

  if (solid && gradient) {
    return (
      <PopupTabs activeTab={activeTab} popupWidth={popupWidth}>
        <PopupTabsHeader>
          <PopupTabsHeaderLabel
            tabName='solid'
            onClick={() => onChangeTab('solid')}
          >
            Solid
          </PopupTabsHeaderLabel>
          <PopupTabsHeaderLabel
            tabName='gradient'
            onClick={() => onChangeTab('gradient')}
          >
            Gradient
          </PopupTabsHeaderLabel>
        </PopupTabsHeader>
        <PopupTabsBody>
          <PopupTabsBodyItem tabName='solid'>
            <Solid
              onChange={onChangeSolid}
              value={value}
              format={format}
              defaultColors={defaultColors}
              debounceMS={debounceMS}
              debounce={debounce}
              showAlpha={showAlpha}
              showInputs={showInputs}
              colorBoardHeight={colorBoardHeight}
            />
          </PopupTabsBodyItem>
          <PopupTabsBodyItem tabName='gradient'>
            <Gradinet
              onChange={onChangeGradient}
              value={value}
              format={format}
              defaultColors={defaultColors}
              debounceMS={debounceMS}
              debounce={debounce}
              showAlpha={showAlpha}
              showInputs={showInputs}
              showGradientResult={showGradientResult}
              showGradientStops={showGradientStops}
              showGradientMode={showGradientMode}
              showGradientAngle={showGradientAngle}
              showGradientPosition={showGradientPosition}
              allowAddGradientStops={allowAddGradientStops}
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
                showInputs={showInputs}
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
                showInputs={showInputs}
                showGradientResult={showGradientResult}
                showGradientStops={showGradientStops}
                showGradientMode={showGradientMode}
                showGradientAngle={showGradientAngle}
                showGradientPosition={showGradientPosition}
                allowAddGradientStops={allowAddGradientStops}
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
