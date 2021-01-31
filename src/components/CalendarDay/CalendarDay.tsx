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
      <div className="CalendarDay__month" style={{ background: color }}>{date.toLocaleString('default', { month: 'short'}).toLocaleUpperCase()}</div>
      <div className={dayClassSet}>{date.getDate()}</div>
    </div>
  )
};

export default CalendarDay;
