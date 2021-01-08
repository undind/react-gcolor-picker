import React, {
  FC,
  useEffect,
  useRef,
  MutableRefObject,
  MouseEvent
} from 'react';

import { TinyColor } from '../../../utils';

import { TPropsComp, TCoords } from './types';

const Ribbon: FC<TPropsComp> = ({
  rootPrefixCls,
  color,
  onChange,
  setChange
}) => {
  const node = useRef() as MutableRefObject<HTMLDivElement>;

  const removeListeners = () => {
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
  };

  useEffect(() => {
    return () => {
      removeListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
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

    setChange(false);

    removeListeners();
  };

  const getPrefixCls = () => {
    return `${rootPrefixCls}-ribbon`;
  };

  const pointMoveTo = (coords: TCoords) => {
    const rect = node && node.current.getBoundingClientRect();
    const width = rect.width;
    let left = coords.x - rect.left;
    left = Math.max(0, left);
    left = Math.min(left, width);

    const huePercent = left / width;
    const hue = huePercent * 360;

    color.hue = hue;
    onChange(color);
  };

  const hueHsv = {
    h: color.hue,
    s: 1,
    v: 1
  };

  const hueColor = new TinyColor(hueHsv).toHexString();

  const prefixCls = getPrefixCls();
  const hue = color.hue;
  const per = (hue / 360) * 100;

  return (
    <div className={prefixCls} ref={node} onMouseDown={onMouseDown}>
      <div className='color-picker-panel-ribbon-bg' />
      <span style={{ left: `${per}%`, backgroundColor: hueColor }} />
      <div className={`${prefixCls}-handler`} />
    </div>
  );
};

export default Ribbon;
