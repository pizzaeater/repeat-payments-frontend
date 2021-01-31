import React from 'react';
import { createCn } from 'bem-react-classname';
import './CalendarDay.scss';

const cn = createCn('CalendarDay');

interface Props {
  date: Date
  type: 'today' | 'income' | 'expense'
  inactive: boolean
}

const CalendarDay: React.FC<Props> = ({ date, type, inactive }) => (
  <div className={cn()}>
    <div className={cn('month', { type: inactive ? 'inactive' : type })}>
      {date.toLocaleString('default', { month: 'short' }).toLocaleUpperCase()}
    </div>
    <div className={cn('day', { inactive })}>
      {date.getDate()}
    </div>
  </div>
);

export default CalendarDay;
