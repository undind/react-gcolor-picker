import { Dispatch, SetStateAction, ReactText } from 'react';

import { IActiveColor } from '../types';

export interface IColor {
  gradient: string;
  type: string;
  modifier: string | number;
  stops: any;
}

export type TCoords = {
  x: number;
  y: number;
  shiftKey?: number | boolean;
  ctrlKey?: number | boolean;
};

export interface IPropsPanel {
  color: IColor;
  setColor: (color: IColor) => void;
  activeColor: IActiveColor;
  setActiveColor: Dispatch<SetStateAction<IActiveColor>>;
  setInit: Dispatch<SetStateAction<boolean>>;
  showAlpha?: boolean;
  format?: 'rgb' | 'hsl' | 'hex';
}

export interface IPropsMarkers extends IPropsPanel {
  setActiveIndex: Dispatch<SetStateAction<ReactText>>;
  setActiveLoc: Dispatch<SetStateAction<ReactText>>;
}
