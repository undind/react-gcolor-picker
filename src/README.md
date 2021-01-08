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

| Attribute        |    Type    |  Default  | Description                                                   |
| :--------------- | :--------: | :-------: | :------------------------------------------------------------ |
| value            |  `string`  | `#ffffff` | Default color value. Accepted: rgba/rgb, hsla, named colors   |
| gradient         |   `bool`   |  `false`  | Show gradient color panel                                     |
| solid            |   `bool`   |  `true`   | Show solid color panel                                        |
| debounceMS       |  `number`  |   `300`   | Debounce ms value                                             |
| debounce         |   `bool`   |  `true`   | Debouce off/on                                                |
| showAlpha        |   `bool`   |  `true`   | Show/hide alpha input and range                               |
| popupWidth       |  `number`  |   `267`   | Popup width                                                   |
| colorBoardHeight |  `number`  |   `120`   | Board color height                                            |
| onChange         | `function` |  `null`   | Default onChange function returns string value on rgba format |

## License

MIT © [undind](https://github.com/undind)
