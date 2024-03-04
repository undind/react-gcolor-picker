import React, {
  FC,
  useRef,
  useEffect,
  MouseEvent,
  TouchEvent,
  MutableRefObject,
  useState
} from 'react';
import tinycolor from 'tinycolor2';

import { getGradient, rgbaToArray, rgbaToHex } from '../../../utils';

import { IPropsPanel, TCoords } from './types';

const Markers: FC<IPropsPanel> = ({
  color,
  setColor,
  activeColor,
  setActiveColor,
  setInit,
  format = 'rgb',
  showAlpha = true,
  allowAddGradientStops = true
}) => {
  const node = useRef() as MutableRefObject<HTMLDivElement>;

  const [needDeleteActive, setNeedDeleteActive] = useState<boolean>(false);
  const [hideStop, setHideStop] = useState<boolean>(false);

  const { stops, type, modifier } = color;

  const onAddColorStop = (e: MouseEvent) => {
    setInit(false);
    e.stopPropagation();
    if (!allowAddGradientStops) return;
    const target = e.target as HTMLElement;

    if (target.className !== 'gradient-marker') {
      const rect = target.getBoundingClientRect();
      const clickPos = e.clientX - rect.left;
      const loc = Number(((100 / rect.width) * clickPos).toFixed(0)) / 100;
      const rgba = tinycolor(activeColor.hex);
      rgba.setAlpha(activeColor.alpha / 100);

      const newStops = [
        ...color.stops,
        [rgba.toRgbString(), loc, color.stops.length]
      ]
        .sort((a: [string, number], b: [string, number]) => a[1] - b[1])
        .map((item, index) => {
          item[2] = index;
          return item;
        });

      setColor({
        ...color,
        gradient: `${getGradient(type, newStops, modifier, format, showAlpha)}`,
        stops: newStops
      });

      setActiveColor({
        ...activeColor,
        loc: loc,
        index: newStops.find((item) => item[1] === loc)[2]
      });
    }
  };

  const removeListeners = () => {
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
  };

  const removeTouchListeners = () => {
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
  };

  const onMouseDown = (e: MouseEvent, color: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (e.detail === 2) {
      return;
    }

    setInit(false);

    if (e.button !== 0) return;

    const newColor = tinycolor(color[0]);
    setActiveColor({
      hex: '#' + newColor.toHex(),
      alpha: newColor.getAlpha() * 100,
      loc: color[1],
      index: color[2]
    });

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

    const rect = node?.current?.getBoundingClientRect();
    const rootDistance = y - rect.y;
    if (rootDistance > 80 && stops.length > 2) {
      setHideStop(true);
      return;
    } else {
      setHideStop(false);
    }

    pointMoveTo({
      x,
      y
    });
  };

  const onDragEnd = (e: any) => {
    const x = e.clientX;
    const y = e.clientY;

    const rect = node?.current?.getBoundingClientRect();
    const rootDistance = y - rect.y;
    if (rootDistance > 80 && stops.length > 2) {
      setNeedDeleteActive(true);
    }

    pointMoveTo({
      x,
      y
    });

    removeListeners();
  };

  const onTouchStart = (e: TouchEvent, color: any) => {
    setInit(false);

    if (e.cancelable) {
      e.preventDefault();
    }

    if (e.touches.length !== 1) {
      return;
    }

    removeTouchListeners();

    const newColor = tinycolor(color[0]);
    setActiveColor({
      hex: '#' + newColor.toHex(),
      alpha: newColor.getAlpha() * 100,
      loc: color[1],
      index: color[2]
    });

    const x = e.targetTouches[0].clientX;
    const y = e.targetTouches[0].clientY;

    pointMoveTo({ x, y });

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: false });
  };

  const onTouchMove = (e: any) => {
    if (e.cancelable) {
      e.preventDefault();
    }

    const x = e.targetTouches[0].clientX;
    const y = e.targetTouches[0].clientY;

    const rect = node?.current?.getBoundingClientRect();
    const rootDistance = y - rect.y;
    if (rootDistance > 80 && stops.length > 2) {
      setHideStop(true);
      return;
    } else {
      setHideStop(false);
    }

    pointMoveTo({
      x,
      y
    });
  };

  const onTouchEnd = () => {
    removeTouchListeners();
  };

  const pointMoveTo = (coords: TCoords) => {
    const rect = node && node.current.getBoundingClientRect();
    const width = rect.width;
    let pos = coords.x - rect.left;
    pos = Math.max(0, pos);
    pos = Math.min(pos, width);

    const location = Number(((100 / rect.width) * pos).toFixed(0)) / 100;
    setActiveColor((prev) => ({
      ...prev,
      loc: location
    }));
  };

  const deleteColorStop = () => {
    if (stops.length <= 2) return;
    const newStops = stops
      .filter((stop: [string, number, number]) => stop[2] !== activeColor.index)
      .map((stop: [string, number, number], index: number) => {
        stop[2] = index;
        return stop;
      });
    const lastStop = rgbaToArray(newStops[newStops.length - 1][0]);
    const lastStopLoc = newStops[newStops.length - 1][1];
    const activeStop = rgbaToHex([lastStop[0], lastStop[1], lastStop[2]]);
    const activeIdx = newStops[newStops.length - 1][2];

    setNeedDeleteActive(false);
    setHideStop(false);

    setActiveColor({
      hex: activeStop,
      alpha: Number(Math.round(lastStop[3] * 100)),
      loc: lastStopLoc,
      index: activeIdx
    });
    return setColor({
      ...color,
      gradient: `${getGradient(type, newStops, modifier, format, showAlpha)}`,
      stops: newStops
    });
  };

  useEffect(() => {
    if (needDeleteActive) {
      return deleteColorStop();
    }

    const newStops = stops.map((item: [string, number, number]) => {
      if (activeColor.index === item[2]) {
        return [item[0], activeColor.loc, item[2]];
      }
      return item;
    });

    setColor({
      ...color,
      gradient: `${getGradient(type, newStops, modifier, format, showAlpha)}`,
      stops: newStops
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeColor.loc, needDeleteActive]);

  useEffect(() => {
    return () => {
      removeListeners();
      removeTouchListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              className={`gradient-marker${
                hideStop && activeColor.index === color[2] ? ' hide' : ''
              }${!hideStop && activeColor.index === color[2] ? ' active' : ''}`}
              style={{
                left: Math.abs(Math.min(position, 100)) + '%',
                color: rgba
              }}
              onTouchStart={(e) => onTouchStart(e, color)}
              onMouseDown={(e) => onMouseDown(e, color)}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={deleteColorStop}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Markers;
