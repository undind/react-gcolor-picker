import React, { useState } from 'react';

import ReactGPicker from 'react-gcolor-picker';

function App() {
  const [color, setColor] = useState('#fff');
  const onChange = (value: string) => {
    console.log(value)
    setColor(value)
  };

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
        <ReactGPicker value={color} format='hex' gradient={true} onChange={onChange} />
      </div>
    </>
  );
}

export default App;
