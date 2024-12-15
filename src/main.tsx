import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import ColorPicker from './App';
import './index.css';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('hsl(0, 100%, 50%)');

  return (
    <div 
      className="min-h-screen flex items-center justify-center transition-colors duration-200"
      style={{ backgroundColor }}
    >
      <ColorPicker onColorChange={setBackgroundColor} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
