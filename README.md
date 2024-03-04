# React gradient color picker

### Inspired by [gpickr](https://github.com/Simonwep/gpickr)

[![NPM](https://img.shields.io/npm/v/react-gcolor-picker.svg)](https://www.npmjs.com/package/react-gcolor-picker) [![License](https://img.shields.io/npm/l/react-gcolor-picker.svg)](https://github.com/undind/react-gcolor-picker/blob/main/LICENSE)

**[Demo](https://undind.github.io/react-gcolor-picker/)**

## Install

### **Important: this component uses React Hooks and works on React version 16.8.0 and higher**

---

```bash
npm install --save react-gcolor-picker
```

OR

```bash
yarn add react-gcolor-picker
```

## Usage

```tsx
import React from 'react';

import ReactGPicker from 'react-gcolor-picker';

function App() {
  const onChange = (value) => {
    console.log(value);
  };

  return <ReactGPicker value='red' onChange={onChange} />;
}

export default App;
```

## Props

| Attribute             |    Type    |           Default           | Description                                                                                           |
| :-------------------- | :--------: | :-------------------------: | :---------------------------------------------------------------------------------------------------- |
| value                 |  `string`  |          `#ffffff`          | Default color value. Accept: rgba/rgb, hsla/hsl, named colors                                         |
| format                |  `string`  |            `rgb`            | Return value format. Accept: 'rgb', 'hex', 'hsl'                                                      |
| gradient              |   `bool`   |           `false`           | Show gradient color panel                                                                             |
| solid                 |   `bool`   |           `true`            | Show solid color panel                                                                                |
| debounceMS            |  `number`  |            `300`            | Debounce ms value                                                                                     |
| debounce              |   `bool`   |           `true`            | Debouce off/on                                                                                        |
| showAlpha             |   `bool`   |           `true`            | Show/hide alpha input and range                                                                       |
| showInputs            |   `bool`   |           `true`            | Show/hide inputs alpha and color                                                                      |
| showGradientResult    |   `bool`   |           `true`            | Show/hide gradient result fields(angle, mode, position)                                               |
| showGradientStops     |   `bool`   |           `true`            | Show/hide gradient color stops                                                                        |
| showGradientMode      |   `bool`   |           `true`            | Show/hide gradient color mode switcher                                                                |
| showGradientAngle     |   `bool`   |           `true`            | Show/hide gradient angle for linear-gradient                                                          |
| showGradientPosition  |   `bool`   |           `true`            | Show/hide gradient position for radial-gradient                                                       |
| allowAddGradientStops |   `bool`   |           `true`            | Allow to add new gradient stops                                                                       |
| popupWidth            |  `number`  |            `267`            | Popup width                                                                                           |
| colorBoardHeight      |  `number`  |            `120`            | Board color height                                                                                    |
| defaultColors         |  `array`   | [List](#default-color-list) | Default colors array for panel picker                                                                 |
| defaultActiveTab      |  `string`  |         `undefined`         | Default value for active tab when initializing the component, takes two values: `solid` or `gradient` |
| onChangeTabs          | `function` |           `null`            | Default onChange function detect when tabs change and return one of the values: `solid` or `gradient` |
| onChange              | `function` |           `null`            | Default onChange function returns string value in the given format                                    |

When passing a value for a gradient, you must specify the position of all colors. Otherwise the component will throw an exception.
For example:

### Wrong

```
linear-gradient(180deg, #000000,#ff0000)
```

### Correct

```
linear-gradient(180deg, #000000 0%,#ff0000 100%)
```

If you are using a radial gradient a list of possible directions for it:

```
circle at left top
circle at center top
circle at right top
circle at left
circle at center
circle at right
circle at left bottom
circle at center bottom
circle at right bottom
```

## Default color list

```
'#FF6900',
'#FCB900',
'#7BDCB5',
'#00D084',
'#8ED1FC',
'#0693E3',
'#ABB8C3',
'#607d8b',
'#EB144C',
'#F78DA7',
'#ba68c8',
'#9900EF',
'linear-gradient(0deg, rgb(255, 177, 153) 0%, rgb(255, 8, 68) 100%)',
'linear-gradient(270deg, rgb(251, 171, 126) 8.00%, rgb(247, 206, 104) 92.00%)',
'linear-gradient(315deg, rgb(150, 230, 161) 8.00%, rgb(212, 252, 121) 92.00%)',
'linear-gradient(to left, rgb(249, 240, 71) 0%, rgb(15, 216, 80) 100%)',
'linear-gradient(315deg, rgb(194, 233, 251) 8.00%, rgb(161, 196, 253) 92.00%)',
'linear-gradient(0deg, rgb(0, 198, 251) 0%, rgb(0, 91, 234) 100%)',
'linear-gradient(0deg, rgb(167, 166, 203) 0%, rgb(137, 137, 186) 51.00%, rgb(137, 137, 186) 100%)',
'linear-gradient(0deg, rgb(80, 82, 133) 0%, rgb(88, 94, 146) 15.0%, rgb(101, 104, 159) 28.00%, rgb(116, 116, 176) 43.00%, rgb(126, 126, 187) 57.00%, rgb(131, 137, 199) 71.00%, rgb(151, 149, 212) 82.00%, rgb(162, 161, 220) 92.00%, rgb(181, 174, 228) 100%)',
'linear-gradient(270deg, rgb(255, 126, 179) 0%, rgb(255, 117, 140) 100%)',
'linear-gradient(90deg, rgb(120, 115, 245) 0%, rgb(236, 119, 171) 100%)',
'linear-gradient(45deg, #2e266f 0.00%, #9664dd38 100.00%)',
'radial-gradient(circle at center, yellow 0%, #009966 50%, purple 100%)'
```

## FAQ

**Q:** There's any possibility to remove extra gradient lines?

**A:** Yes, you only need to drag them outside(bottom) the Gradient component area or double click on the element you want to remove.

## License

MIT © [undind](https://github.com/undind)
