import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';

interface NavigateProps {
  activeDate: Date;
  setActiveDate: (date: Date) => void;
  navigationPre?: React.ReactNode;
  navigationNext?: React.ReactNode;
  navigationCenter?: React.ReactNode;
  monthView: 'week' | 'month';
}

function Navigation({ activeDate, setActiveDate, navigationPre, navigationNext, navigationCenter, monthView }: NavigateProps) {
  const onPreClick = () => {
    setActiveDate(dayjs(activeDate).subtract(1, monthView).toDate());
  };
  const onNextClick = () => {
    setActiveDate(dayjs(activeDate).add(1, monthView).toDate());
  };

  const preRender = () => {
    if (navigationPre && React.isValidElement(navigationPre)) {
      return React.cloneElement(navigationPre, {
        onClick: onPreClick,
        ...navigationPre.props,
        className: clsx(navigationPre.props.className, 'react-calendar__navigation__arrow'),
      });
    }
    return (
      <span className="react-calendar__navigation__arrow" onClick={onPreClick}>
        {navigationPre === undefined ? '<' : navigationPre}
      </span>
    );
  };
  const nextRender = () => {
    if (navigationNext && React.isValidElement(navigationNext)) {
      return React.cloneElement(navigationNext, {
        onClick: onNextClick,
        ...navigationNext.props,
        className: clsx(navigationNext.props.className, 'react-calendar__navigation__arrow'),
      });
    }
    return (
      <span className="react-calendar__navigation__arrow" onClick={onNextClick}>
        {navigationNext === undefined ? '>' : navigationNext}
      </span>
    );
  };
  const centerRender = () => {
    if (navigationCenter && React.isValidElement(navigationCenter)) {
      return React.cloneElement(navigationCenter, {
        ...navigationCenter.props,
        className: clsx(navigationCenter.props.className, 'react-calendar__navigation__label'),
      });
    }
    return <span className="react-calendar__navigation__label">{navigationCenter === undefined ? dayjs(activeDate).format('YYYY-MM') : navigationCenter}</span>;
  };
  return (
    <div className="react-calendar__navigation">
      {preRender()}
      {centerRender()}
      {nextRender()}
    </div>
  );
}

export default Navigation;
