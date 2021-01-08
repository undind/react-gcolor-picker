import { Dispatch, SetStateAction, ReactText } from 'react';

import { IActiveColor } from '../types';

interface IColor {
  gradient: string;
  type: string;
  modifier: string | number | undefined;
  stops: any;
}

export type TCoords = {
  x: number;
  y: number;
  shiftKey?: number;
  ctrlKey?: number;
};

export interface IPropsPanel {
  color: IColor;
  setColor: (color: IColor) => void;
  activeColor: IActiveColor;
  setActiveColor: Dispatch<SetStateAction<IActiveColor>>;
  setInit: Dispatch<SetStateAction<boolean>>;
}

export interface IPropsMarkers extends IPropsPanel {
  setActiveIndex: Dispatch<SetStateAction<ReactText>>;
  setActiveLoc: Dispatch<SetStateAction<ReactText>>;
}
