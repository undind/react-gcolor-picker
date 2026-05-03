import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ReactGPicker from './ReactGPicker';
import { IPropsMain } from '../src/components/Colorpicker/types';

export default {
  title: 'Example/Locales',
  component: ReactGPicker
} as Meta;

const Template: Story<IPropsMain> = (args) => <ReactGPicker {...args} />;

export const French = Template.bind({});
French.args = {
  labels: {
    solid: 'Uni',
    gradient: 'Dégradé',
    hex: 'Hex',
    alpha: 'Opacité'
  },
  gradient: true
};

export const Spanish = Template.bind({});
Spanish.args = {
  labels: {
    solid: 'Sólido',
    gradient: 'Degradado',
    hex: 'Hex',
    alpha: 'Opacidad'
  },
  gradient: true
};

export const Partial = Template.bind({});
Partial.args = {
  labels: {
    solid: 'Uni',
    gradient: 'Dégradé'
  },
  gradient: true
};
