import { ReactText } from 'react';

export interface IPropsComp {
  value: string;
  onChange: (value: string) => void;
  format?: 'rgb' | 'hsl' | 'hex';
  debounceMS?: number;
  debounce?: boolean;
  showAlpha?: boolean;
  colorBoardHeight?: number;
}

export interface IPropsMain extends IPropsComp {
  gradient?: boolean;
  solid?: boolean;
  popupWidth?: number;
}

export type TPropsChange = {
  alpha: number;
  hex: string;
};

export interface IActiveColor {
  hex: string;
  alpha: number;
  loc: ReactText;
  index: ReactText;
}
