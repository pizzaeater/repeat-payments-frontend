import React from 'react';
import './CalendarDay.scss';

interface Props {
  date: Date
  color: string
  inactive: boolean
}

const CalendarDay: React.FC<Props> = ({ date, color, inactive }) => {
  const dayClassSet = inactive
    ? 'CalendarDay__day CalendarDay__day_inactive'
    : 'CalendarDay__day';

  return (
    <div className="CalendarDay">
      <div className="CalendarDay__month" style={{ background: color }}>NOV</div>
      <div className={dayClassSet}>3</div>
    </div>
  )
};

export default CalendarDay;
