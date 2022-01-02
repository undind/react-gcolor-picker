import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import ReactGPicker from './components/Colorpicker';

const onChangeFn = jest.fn();
const onChangeTabsFn = jest.fn();
const props = {
  value: '#ffffff',
  gradient: false,
  solid: true,
  debounceMS: 300,
  debounce: true,
  showAlpha: true,
  showInputs: true,
  showGradientResult: true,
  showGradientStops: true,
  showGradientMode: true,
  showGradientAngle: true,
  showGradientPosition: true,
  popupWidth: 300,
  colorBoardHeight: 150,
  defaultActiveTab: undefined,
  onChangeTabs: onChangeTabsFn,
  onChange: onChangeFn
};

describe('Test Suites Color Picker', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ReactGPicker {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render my component', () => {
    expect(wrapper).toBeTruthy();
  });

  it('Props must be equal', () => {
    expect(wrapper.props()).toEqual(props);
  });

  it('Check inputs deafult values', () => {
    const hexInput = wrapper.find('.input_rgba-hex input');
    const alphaInput = wrapper.find('.input_rgba-alpha input');

    expect(hexInput.getDOMNode().getAttribute('value')).toBe(
      props.value.substring(1)
    );
    expect(alphaInput.getDOMNode().getAttribute('value')).toBe('100');
  });

  it('Check popup width and board height', () => {
    const popup = wrapper.find('.popup_tabs');
    const board = wrapper.find('.color-picker-panel-board-hsv');

    expect(popup.get(0).props.style.width).toEqual(props.popupWidth + 'px');
    expect(board.get(0).props.style.height).toEqual(
      props.colorBoardHeight + 'px'
    );
  });

  it('Change inputs value', () => {
    const hexInput = wrapper.find('.input_rgba-hex input');
    const alphaInput = wrapper.find('.input_rgba-alpha input');

    hexInput.simulate('change', {
      target: { value: 'zxcxz' } // pass wrong value
    });
    hexInput.simulate('blur');
    alphaInput.simulate('change', {
      target: { value: '90' }
    });

    expect(onChangeFn).toBeCalledWith('rgb(0, 0, 0)');
    expect(hexInput.getDOMNode().getAttribute('value')).toEqual('zxcxz');
    expect(alphaInput.getDOMNode().getAttribute('value')).toEqual('90');
  });

  it('Check hsla, rgba and name value', () => {
    const pickerRgba = mount(
      <ReactGPicker {...props} value='rgba(0, 0, 0, 0.5)' />
    );
    const pickerNamed = mount(<ReactGPicker {...props} value='black' />);
    const pickerHsl = mount(<ReactGPicker {...props} value='hsl(0,0%,0%)' />);

    expect(
      pickerRgba
        .find('input')
        .map((el) => el.getDOMNode().getAttribute('value'))
    ).toEqual(['000000', '50']);
    expect(
      pickerNamed
        .find('input')
        .map((el) => el.getDOMNode().getAttribute('value'))
    ).toEqual(['000000', '100']);
    expect(
      pickerHsl.find('input').map((el) => el.getDOMNode().getAttribute('value'))
    ).toEqual(['000000', '100']);
  });

  it('Check Gradient picker tab', () => {
    const withGradient: ReactWrapper = mount(
      <ReactGPicker {...props} gradient={true} defaultActiveTab='solid' />
    );
    const headers = withGradient.find('.popup_tabs-header-label');
    headers.at(1).simulate('click');
    expect(onChangeTabsFn).toBeCalledWith('gradient');

    expect(headers.length).toEqual(2);
    expect(headers.at(1).getDOMNode().getAttribute('class')).toEqual(
      'popup_tabs-header-label popup_tabs-header-label-active'
    );

    headers.at(0).simulate('click');
    expect(onChangeTabsFn).toBeCalledWith('solid');
  });

  it('Check default colors panel length', () => {
    const defaulPanel = wrapper.find('.default-color-panel_item');

    expect(defaulPanel.length).toBe(12);
  });
});
