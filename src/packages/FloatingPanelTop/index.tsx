import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { supportsPassive } from './supports-passive';
import { nearest } from './nearest';
import { mergeProps } from './with-default-props';
import { useLockScroll } from './use-lock-scroll';
import { useMemoizedFn } from 'ahooks';
import './index.less';

const classPrefix = 'next-floating-panel';

export type FloatingPanelRef = {
  setHeight: (
    height: number,
    options?: {
      immediate?: boolean;
    }
  ) => void;
};

export type FloatingPanelProps = {
  anchors: number[];
  children: ReactNode;
  onHeightChange?: (height: number, animating: boolean) => void;
  handleDraggingOfContent?: boolean;
};

const defaultProps = {
  handleDraggingOfContent: true,
};

const FloatingPanelTop = forwardRef<FloatingPanelRef, FloatingPanelProps>((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const { anchors } = props;

  const possibles = anchors.map((x) => x);

  const elementRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [pulling, setPulling] = useState(false);
  const pullingRef = useRef(false);

  const onHeightChange = useMemoizedFn(props.onHeightChange ?? (() => {}));

  const [{ y }, api] = useSpring(
    () => ({
      y: possibles[0],
      config: { tension: 300 },
      onChange: (result) => {
        onHeightChange(result.value.y, y.isAnimating);
      },
    }),
    [anchors]
  );

  useDrag(
    (state) => {
      const [, offsetY] = state.offset;
      if (state.first) {
        const target = state.event.target as Element;
        const header = headerRef.current;
        if (header === target || header?.contains(target)) {
          pullingRef.current = true;
        } else {
          if (!props.handleDraggingOfContent) return;
          const reachedTop = y.goal <= anchors[0];
          const content = contentRef.current;
          if (!content) return;
          if (reachedTop) {
            if (content.scrollTop <= 0 && state.direction[1] > 0) {
              pullingRef.current = true;
            }
          } else {
            pullingRef.current = true;
          }
        }
      }
      setPulling(pullingRef.current);
      if (!pullingRef.current) return;
      const { event } = state;
      if (event.cancelable && supportsPassive) {
        event.preventDefault();
      }
      event.stopPropagation();
      let nextY = offsetY;
      if (state.last) {
        pullingRef.current = false;
        setPulling(false);
        nextY = nearest(possibles, offsetY);
      }
      api.start({
        y: nextY,
      });
    },
    {
      axis: 'y',
      bounds: {
        top: anchors[0],
        bottom: anchors[1],
      },
      // rubberband: true,
      from: () => [0, y.get()],
      pointer: { touch: true },
      target: elementRef,
      eventOptions: supportsPassive ? { passive: false } : undefined,
    }
  );

  useImperativeHandle(
    ref,
    () => ({
      setHeight: (
        height: number,
        options?: {
          immediate?: boolean;
        }
      ) => {
        api.start({
          y: height,
          immediate: options?.immediate,
        });
      },
    }),
    [api]
  );

  useLockScroll(elementRef, true);

  if (!anchors.length) {
    return (
      <animated.div ref={elementRef} className={classPrefix}>
        <div className={`${classPrefix}-content`} ref={contentRef}>
          {props.children}
        </div>
        <div className={`${classPrefix}-header`} ref={headerRef}>
          <div className={`${classPrefix}-bar`} />
        </div>
      </animated.div>
    );
  }

  return (
    <animated.div
      ref={elementRef}
      className={classPrefix}
      style={{
        height: y.to((y) => `${Math.round(y)}px`),
      }}
    >
      <div
        className={`${classPrefix}-mask`}
        style={{
          display: pulling ? 'block' : 'none',
        }}
      />
      <div className={`${classPrefix}-content`} ref={contentRef}>
        {props.children}
      </div>
      <div className={`${classPrefix}-header`} ref={headerRef}>
        <div className={`${classPrefix}-bar`} />
      </div>
    </animated.div>
  );
});

export default FloatingPanelTop;
