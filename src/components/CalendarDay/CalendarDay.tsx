import React from 'react';
import { createCn } from 'bem-react-classname';
import './CalendarDay.scss';

const cn = createCn('CalendarDay');

interface Props {
  date: Date
  type: 'today' | 'income' | 'expense'
  inactive?: boolean
}

const CalendarDay: React.FC<Props> = ({ date, type, inactive }: Props) => (
  <div className={cn()}>
    <div className={cn('month', { type: inactive ? 'inactive' : type })}>
      <span>{date.toLocaleString('default', { month: 'short' }).toLocaleUpperCase()}</span>
    </div>
    <div className={cn('day', { inactive: inactive || false })}>
      <span>{date.getDate()}</span>
    </div>
  </div>
);

export default CalendarDay;
