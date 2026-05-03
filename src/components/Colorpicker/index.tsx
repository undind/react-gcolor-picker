import './_colorpicker.scss';
import React, { useState, FC, useMemo, Fragment } from 'react';

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
  onChange = () => ({}),
  onDefaultColorSelect = () => ({}),
  labels = {}
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab ?? getIndexActiveTag(value, solid, gradient)
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

  const tabs: { name: string; label: string }[] = useMemo(() => {
    return [
      solid && {
        name: 'solid',
        label: labels.solid ?? 'Solid'
      },
      gradient && {
        name: 'gradient',
        label: labels.gradient ?? 'Gradient'
      }
    ].filter(Boolean) as { name: string; label: string }[];
  }, [solid, gradient, labels]);

  return (
    <PopupTabs activeTab={activeTab} popupWidth={popupWidth}>
      {tabs?.length > 1 ? (
        <PopupTabsHeader>
          {tabs?.map((tab) => (
            <PopupTabsHeaderLabel
              key={tab.name}
              tabName={tab.name}
              onClick={() => onChangeTab(tab.name)}
            >
              {tab.label}
            </PopupTabsHeaderLabel>
          ))}
        </PopupTabsHeader>
      ) : (
        <Fragment />
      )}
      <PopupTabsBody>
        {tabs?.map((tab) => {
          switch (tab.name) {
            case 'solid':
              return (
                <PopupTabsBodyItem key={tab.name} tabName='solid'>
                  <Solid
                    onChange={onChangeSolid}
                    onDefaultColorSelect={onDefaultColorSelect}
                    value={value}
                    format={format}
                    defaultColors={defaultColors}
                    debounceMS={debounceMS}
                    debounce={debounce}
                    showAlpha={showAlpha}
                    showInputs={showInputs}
                    colorBoardHeight={colorBoardHeight}
                    labels={labels}
                  />
                </PopupTabsBodyItem>
              );

            case 'gradient':
              return (
                <PopupTabsBodyItem key={tab.name} tabName='gradient'>
                  <Gradinet
                    onChange={onChangeGradient}
                    onDefaultColorSelect={onDefaultColorSelect}
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
                    labels={labels}
                  />
                </PopupTabsBodyItem>
              );

            default:
              return <Fragment />;
          }
        })}
      </PopupTabsBody>
    </PopupTabs>
  );
};

export default ColorPicker;
