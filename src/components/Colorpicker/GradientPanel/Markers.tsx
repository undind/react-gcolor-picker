import React, { useRef, FC, MouseEvent, MutableRefObject } from 'react';

import { hexAlphaToRgba, getGradient } from '../../../utils';

import { IPropsMarkers, TCoords } from './types';

const Markers: FC<IPropsMarkers> = ({
  color,
  setColor,
  activeColor,
  setActiveColor,
  setInit,
  setActiveIndex,
  setActiveLoc
}) => {
  const node = useRef() as MutableRefObject<HTMLDivElement>;

  const { stops, type, modifier } = color;

  const onAddColorStop = (e: MouseEvent) => {
    setInit(false);
    e.stopPropagation();
    const target = e.target as HTMLElement;

    if (target.className !== 'gradient-marker') {
      const rect = target.getBoundingClientRect();
      const clickPos = e.clientX - rect.left;
      const loc = Number(((100 / rect.width) * clickPos).toFixed(0)) / 100;
      const newStops = [
        ...color.stops,
        [hexAlphaToRgba(activeColor), loc, color.stops.length]
      ].sort((a: [string, number], b: [string, number]) => a[1] - b[1]);

      setColor({
        ...color,
        gradient: `${getGradient(type, newStops, modifier)}`,
        stops: newStops
      });

      setActiveColor({
        ...activeColor,
        loc: loc,
        index: color.stops.length
      });

      setActiveLoc(loc);
      setActiveIndex(color.stops.length);
    }
  };

  const removeListeners = () => {
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
  };

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();

    setInit(false);

    if (e.button !== 0) return;

    const x = e.clientX;
    const y = e.clientY;

    pointMoveTo({
      x,
      y
    });

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDragEnd);
  };

  const onDrag = (e: any) => {
    const x = e.clientX;
    const y = e.clientY;

    pointMoveTo({
      x,
      y
    });
  };

  const onDragEnd = (e: any) => {
    const x = e.clientX;
    const y = e.clientY;

    pointMoveTo({
      x,
      y
    });

    removeListeners();
  };

  const pointMoveTo = (coords: TCoords) => {
    const rect = node && node.current.getBoundingClientRect();
    const width = rect.width;
    let pos = coords.x - rect.left;
    pos = Math.max(0, pos);
    pos = Math.min(pos, width);

    const location = Number(((100 / rect.width) * pos).toFixed(0)) / 100;
    setActiveLoc(location);
  };

  return (
    <div
      className='gradient-stops'
      onClick={(e) => onAddColorStop(e)}
      ref={node}
    >
      <div
        className='gradient-stop-preview'
        style={{
          background: `linear-gradient(to right, ${stops
            .map(
              (color: [string, number, number]) =>
                `${color[0]} ${color[1] * 100}%`
            )
            .join(', ')})`
        }}
      />
      <div className='gradient-stop-marker'>
        {stops.map((color: [string, number, number]) => {
          const position = color[1] * 100;
          const rgba = color[0];

          return (
            <div
              key={rgba + position + Math.random() * 100}
              className='gradient-marker'
              style={{ left: position + '%', color: rgba }}
              onMouseDown={(e) => {
                setActiveIndex(color[2]);
                onMouseDown(e);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Markers;
