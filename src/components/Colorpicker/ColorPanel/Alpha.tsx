import React, {
  FC,
  useEffect,
  useRef,
  MutableRefObject,
  MouseEvent,
  TouchEvent
} from 'react';

import { TPropsCompAlpha, TCoords } from './types';

const rgbaColor = (r: number, g: number, b: number, a: number) => {
  return `rgba(${[r, g, b, a / 100].join(',')})`;
};

const Alpha: FC<TPropsCompAlpha> = ({
  rootPrefixCls,
  color,
  alpha,
  onChange,
  setChange
}) => {
  const node = useRef() as MutableRefObject<HTMLDivElement>;

  const removeListeners = () => {
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
  };

  const removeTouchListeners = () => {
    setChange(false);

    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
  };

  useEffect(() => {
    return () => {
      removeListeners();
      removeTouchListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseDown = (e: MouseEvent) => {
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

  const onDragEnd = (event: any) => {
    const x = event.clientX;
    const y = event.clientY;

    pointMoveTo({
      x,
      y
    });

    setChange(false);

    removeListeners();
  };

  const onTouchStart = (e: TouchEvent) => {
    if (e.cancelable) {
      e.preventDefault();
    }

    if (e.touches.length !== 1) {
      return;
    }

    removeTouchListeners();

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

    pointMoveTo({
      x,
      y
    });
  };

  const onTouchEnd = () => {
    removeTouchListeners();
  };

  const getBackground = () => {
    const { red, green, blue } = color;
    const opacityGradient = `linear-gradient(to right, ${rgbaColor(
      red,
      green,
      blue,
      0
    )} , ${rgbaColor(red, green, blue, 100)})`;

    return opacityGradient;
  };

  const getPrefixCls = () => {
    return `${rootPrefixCls}-alpha`;
  };

  const pointMoveTo = (coords: TCoords) => {
    const rect = node && node.current.getBoundingClientRect();
    const width = rect.width;
    let left = coords.x - rect.left;

    left = Math.max(0, left);
    left = Math.min(left, width);

    const alpha = Math.round((left / width) * 100);

    onChange(alpha);
  };

  const getPointerBackground = () => {
    const { red, green, blue } = color;
    const alphaVal = (alpha || 1) / 100;

    return `rgba(${red}, ${green}, ${blue}, ${alphaVal})`;
  };

  const prefixCls = getPrefixCls();

  return (
    <div
      className={prefixCls}
      ref={node}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <div
        className={`${prefixCls}-bg`}
        style={{ background: getBackground() }}
      />
      <span
        style={{
          left: `${alpha}%`,
          backgroundColor: getPointerBackground()
        }}
      />
      <div className={`${prefixCls}-handler`} />
    </div>
  );
};

export default Alpha;
