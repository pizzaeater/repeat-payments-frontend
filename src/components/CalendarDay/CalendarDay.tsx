import React from 'react';
import './CalendarDay.scss';

interface Props {
  date: Date
  type: 'today' | 'income' | 'expense' | 'inactive'
}

const CalendarDay: React.FC<Props> = ({ date, type }) => {
  const dayClassSet = type === 'inactive'
    ? 'CalendarDay__day CalendarDay__day_inactive'
    : 'CalendarDay__day';

  const monthMod = `CalendarDay__month_type_${type}`;

  return (
    <div className="CalendarDay">
      <div className={`CalendarDay__month ${monthMod}`}>{date.toLocaleString('default', { month: 'short'}).toLocaleUpperCase()}</div>
      <div className={dayClassSet}>{date.getDate()}</div>
    </div>
  )
};

export default CalendarDay;
