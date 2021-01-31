import React, {
  FC,
  useState,
  useRef,
  useEffect,
  MutableRefObject
} from 'react';

import Board from './Board';
import Ribbon from './Ribbon';
import Alpha from './Alpha';

import TinyColor, { ITinyColor } from '../../../utils/color';
import { TPropsMain } from './types';

const Panel: FC<TPropsMain> = ({
  alpha,
  className,
  hex,
  colorBoardHeight,
  showAlpha,
  onChange
}) => {
  const node = useRef() as MutableRefObject<HTMLDivElement>;

  const colorConvert = new TinyColor(hex) as ITinyColor;
  colorConvert.alpha = alpha;
  const [state, setState] = useState({
    color: colorConvert,
    alpha
  });
  const [change, setChange] = useState(false);

  useEffect(() => {
    if (!change) {
      setState({
        color: colorConvert,
        alpha
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hex, alpha]);

  const handleAlphaChange = (alpha: number) => {
    setChange(true);
    const { color } = state;
    color.alpha = alpha;

    setState({
      color,
      alpha
    });
    onChange({
      hex: color.toHexString(),
      alpha
    });
  };

  const handleChange = (color: ITinyColor) => {
    setChange(true);
    const { alpha } = state;
    color.alpha = alpha;

    setState({ ...state, color, alpha: color.alpha });
    onChange({
      hex: color.toHexString(),
      alpha: color.alpha
    });
  };

  return (
    <div
      ref={node}
      className={['color-picker-panel', className].join(' ')}
      tabIndex={0}
    >
      <div className='color-picker-panel-inner'>
        <Board
          rootPrefixCls='color-picker-panel'
          color={state.color}
          colorBoardHeight={colorBoardHeight}
          onChange={handleChange}
          setChange={setChange}
        />
        <div
          className={`color-picker-panel-wrap${
            showAlpha ? ' color-picker-panel-wrap-has-alpha' : ''
          }`}
        >
          <div className='color-picker-panel-wrap-ribbon'>
            <Ribbon
              rootPrefixCls='color-picker-panel'
              color={state.color}
              onChange={handleChange}
              setChange={setChange}
            />
          </div>
          {showAlpha && (
            <div className='color-picker-panel-wrap-alpha'>
              <Alpha
                rootPrefixCls='color-picker-panel'
                alpha={state.alpha}
                color={state.color}
                onChange={handleAlphaChange}
                setChange={setChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panel;
