import './_colorpicker.scss';
import React, { Fragment, useState, FC, useEffect } from 'react';

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
  onChange = () => ({})
}) => {
  const [activeTab, setActiveTab] = useState(getIndexActiveTag(value));

  const onChangeSolid = (value: string) => {
    onChange(value);
  };

  const onChangeGradient = (value: string) => {
    onChange(value);
  };

  useEffect(() => {
    console.log(value)
    setActiveTab(getIndexActiveTag(value))
  }, [value])

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
