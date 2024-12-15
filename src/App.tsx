import React, { useState, useRef, useEffect } from 'react';

interface ColorPickerProps {
  onColorChange?: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const hueRef = useRef<HTMLDivElement>(null);
  const saturationRef = useRef<HTMLDivElement>(null);

  const handleHueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHue(Number(event.target.value));
  };

  const handleSaturationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaturation(Number(event.target.value));
  };

  useEffect(() => {
    const color = `hsl(${hue}, ${saturation}%, 50%)`;
    if (onColorChange) {
      onColorChange(color);
    }

    if (saturationRef.current) {
      saturationRef.current.style.setProperty('--tw-gradient-to', `hsl(${hue}, 100%, 50%)`);
    }
  }, [hue, saturation, onColorChange]);

  return (
    <div className="flex flex-col gap-6 p-8 bg-white backdrop-blur-sm rounded-xl max-w-2xl w-full shadow-xl">
      {/* Hue Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-4 bg-transparent">
          <h3 className="text-sm font-medium text-gray-700">Hue</h3>
          <span className="text-sm text-gray-500">{Math.round(hue)}°</span>
        </div>
        <div className="relative w-full h-8">
          <div
            ref={hueRef}
            className="absolute inset-x-0 inset-y-0 rounded-full overflow-hidden shadow-inner bg-full-gradient"
          />
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={handleHueChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 max-w-full"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 border-4 border-white rounded-full shadow-lg z-10 pointer-events-none"
            style={{
              left: `calc(${(hue / 380) * 100}%)`,
              backgroundColor: `hsl(${hue}, 100%, 50%)`,
            }}
          />
        </div>
      </div>

      {/* Saturation Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-4 bg-transparent">
          <h3 className="text-sm font-medium text-gray-700">Saturation</h3>
          <span className="text-sm text-gray-500">{Math.round(saturation)}%</span>
        </div>
        <div className="relative w-full h-8">
          <div
            ref={saturationRef}
            className="absolute inset-x-0 inset-y-0 rounded-full overflow-hidden shadow-inner bg-gradient-to-r from-white"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={handleSaturationChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 max-w-full"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 border-4 border-white rounded-full shadow-lg z-10 pointer-events-none"
            style={{
              left: `calc(${(saturation / 105) * 100}%)`,
              backgroundColor: `hsl(${hue}, ${saturation}%, 50%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;