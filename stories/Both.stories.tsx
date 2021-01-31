import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ReactGPicker from './ReactGPicker';
import { IPropsMain } from '../src/components/Colorpicker/types';

export default {
  title: 'Example/Both',
  component: ReactGPicker
} as Meta;

const Template: Story<IPropsMain> = (args) => <ReactGPicker {...args} />;

export const Both = Template.bind({});
Both.args = {
  value: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
  format: 'rgb',
  solid: true,
  gradient: true,
  debounceMS: 300,
  debounce: true,
  showAlpha: true,
  colorBoardHeight: 120,
  popupWidth: 267,
  onChange: (value: string) => value
};
