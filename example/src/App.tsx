import React, { useState } from 'react';

import ReactGPicker from 'react-gcolor-picker';

function App() {
  const [color, setColor] = useState('linear-gradient(90deg, rgb(255,255,255) 0%, rgb(55,22,55) 100%)');
  const onChange = (value: string) => setColor(value);

  return (
    <>
      <div
        style={{
          background: color,
          height: '250px',
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.22)'
        }}
      >
        {color}
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}
      >
        <ReactGPicker
          value={color}
          format='rgb'
          gradient={true}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default App;
