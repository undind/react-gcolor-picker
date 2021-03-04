import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ReactGPicker from './ReactGPicker';
import { IPropsMain } from '../src/components/Colorpicker/types';

export default {
  title: 'Example/Gradient',
  component: ReactGPicker
} as Meta;

const Template: Story<IPropsMain> = (args) => <ReactGPicker {...args} />;

export const Gradient = Template.bind({});
Gradient.args = {
  value: 'linear-gradient(315deg, hsl(199, 88%, 87%) 8.00%,hsl(217, 96%, 81%) 92.00%)',
  format: 'hsl',
  solid: false,
  gradient: true,
  debounceMS: 300,
  debounce: true,
  showAlpha: true,
  colorBoardHeight: 120,
  popupWidth: 267,
  onChange: (value: string) => value
};
